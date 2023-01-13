import React, { useEffect,useState } from 'react';

import ERC721ABI  from '../abi/NFTMarketplace.json';
import { addressNFTContract, addressMarketContract }  from '../projectsetting';
import  CardERC721  from "./CardERC721"
import { Contract } from "@ethersproject/contracts";
const base64 = require( "base-64")
import { ethers,BigNumber, } from 'ethers';
import { Button, Card, Col, Row,Divider } from 'antd';
const { Meta } = Card;

interface Props {
    option: number
}

interface ItemInfo{
    name:string,
    description:string,
    svg:string
}
declare let window: any;

export default function ReadNFTMarket(props:Props){
    //合约的abi
    const abiJSON = require("../abi/NFTMarketplace.json")
    const abi = abiJSON.abi
    //设置iterm 的state
    const [items,setItems] = useState<[]>()
    //这个就是调用合约接口
    const [account, setAccount] = useState<string>()
    const [title, setTitle] = useState<string>()
    //let  nftURI:string = ''; 
    useEffect( () => {
        if(!window.ethereum) return
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        provider.send("eth_requestAccounts", []).then((accounts)=>{
            if(accounts.length>0) setAccount(accounts[0])
          }).catch((e)=>console.log(e));
        
    },[])
  useEffect( () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const market = new ethers.Contract(addressMarketContract, abi, provider);
    console.log('合约的地址：',market.address);
    //检查是否是一个合约
    if(market.address === '0x') return ;  
    switch(props.option){
        case 0:
          market.fetchActiveItems({from:account}).then((items:any)=>{
            setItems(items)
            setTitle('NFT Market - 所有')
          })    
          break;
        case 1:
          market.fetchMyPurchasedItems({from:account}).then((items:any)=>{
            setItems(items)
            setTitle('NFT Market - 我买的')
          })    
          break;
        case 2:
          market.fetchMyCreatedItems({from:account}).then((items:any)=>{
            setItems(items)
            setTitle('NFT Market - 我所创')
          })    
          break;
        default:
      }    
  
  },[account])
  /**
   * 购买 nft
   * @param event 
   * @param itemId 
   * @returns 
   */
  async function buyInNFTMarket(event:React.FormEvent,itemId:BigNumber) {
    event.preventDefault()
  
    if(!(account)) return
  
    //TODO check whether item is available beforehand
  
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const market = new ethers.Contract(addressMarketContract, ERC721ABI.abi, provider.getSigner());
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    market.createMarketSale(
        addressNFTContract, 
        itemId, 
        { value: auctionPrice}
      ).catch('error', console.error)
  }
  const state = ["销售","卖","Inactive"]
  
  return (
    <>
    <Divider orientation="left">{title}</Divider>
    <Row gutter={16} justify={"center"}>
    {items
    ?(items.length ==0)
    ?<Col>没有商品</Col>
    :items.map((item:any)=>{
        return (
            <Col key={item.tokenId}>
                <CardERC721 addressContract={item.nftContract} tokenId={item.tokenId} ></CardERC721>
                <Button block>{state[item.state]}</Button>                
                {((item.seller == account && item.buyer == ethers.constants.AddressZero) || (item.buyer == account))
                ?
                <Button  disabled>它已经属于你！</Button>
                :
                <></>
                }
                {
            (item.seller != account && item.state == 0)
            ?
            <Button type="primary" block onClick={(e)=>buyInNFTMarket(e,item.id)} >买它!</Button>
            :
            <></>
            }
            </Col>
        )
    })
    :<Col></Col>}    
    </Row>
    </>
  )
  }