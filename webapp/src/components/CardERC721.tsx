import React, { useEffect,useState } from 'react';
// import {BadgeToken as abi} from '../abi/BadgeToken.json'
import ERC721ABI  from '../abi/BadgeToken.json';
const base64 = require( "base-64")
import { ethers,BigNumber } from 'ethers';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
interface Props {
    addressContract: string,
    tokenId:BigNumber
}

interface ItemInfo{
    name:string,
    description:string,
    svg:string
}
declare let window: any;

export default function CardERC721(props:Props){
    //合约地址
    const addressContract = props.addressContract    
    //设置iterm 的state
    const [itemInfo, setItemInfo] = useState<ItemInfo>()
    //这个就是调用合约接口
    const [nftURI, setNftURI] = useState<string>()
    //let  nftURI:string = ''; 
    useEffect( () => {
        if(!window.ethereum) return

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const erc721 = new ethers.Contract(addressContract, ERC721ABI.abi, provider);
        
        erc721.tokenURI(props.tokenId).then((result:string)=>{
            //设置值
            setNftURI(result);            
        }).catch('error', console.error)
        
        },[])
  useEffect( () => {
    if(!nftURI) return    
    const data = base64.decode(nftURI.slice(29))
    const itemInfo = JSON.parse(data)
    const svg = base64.decode(itemInfo.image.slice(26))
    setItemInfo({
      "name":itemInfo.name,
      "description":itemInfo.description,
      "svg":svg})
  
  },[nftURI])
  
  return (
    <>
    {itemInfo
    ?<Card
    hoverable
    style={{ width: 200 }}
    cover={<img src={`data:image/svg+xml;utf8,${itemInfo.svg}`} alt={itemInfo.name} />}
    >
      <Meta title={itemInfo.name}  />
    </Card>
    :<Card />
    }    
    </>
  )
  }