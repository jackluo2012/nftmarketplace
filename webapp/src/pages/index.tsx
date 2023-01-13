import Head from 'next/head'
import type { NextPage } from 'next'
import { Card, Button, Space,Dropdown, Typography } from 'antd';
import { useState,useEffect } from 'react';
import {BigNumber, ethers} from "ethers"
import ReadERC20 from '../components/ReadERC20';
import TransferERC20 from '../components/TransferERC20';
import CardERC721 from '../components/CardERC721';
import ReadNFTMarket from '../components/ReadNFTMarket';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';


declare let window:any
//nft 的 id
const tokenId = BigNumber.from(1)
//合约地址
const nftAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Home: NextPage = () =>{
  const [balance,setBalance] = useState<string |undefined>()
  const [currentAccount,setCurrentAccount] = useState<string |undefined>()
  const [chainId,setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()
  const [selectOption, setSelectOption] = useState<number|0>()
  const onClick: MenuProps['onClick'] = ({ key }) => {
    setSelectOption(Number(key));
    console.log(key);
  };
  const items: MenuProps['items'] = [
    {
      key: '0',
      label: '所有商品',
    },
    {
      key: '1',
      label: '我的商品',
    },
    {
      key: '2',
      label: '我创建的商品',
    },
  ];
  useEffect(()=>{
    //检查是否设置了区块连帐号
    if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
    // 检查浏览器端是否安装了metamask
    // https://docs.metamask.io/guide/getting-started.html#basic-considerations
    if(!window.ethereum) return 
    // 连接 metamask 
    //https://docs.ethers.org/v5/getting-started/#getting-started--connecting
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //查询 帐号余额
    provider.getBalance(currentAccount).then((result)=>{
      setBalance(ethers.utils.formatEther(result))
    })
    //https://docs.ethers.org/v5/api/providers/provider/#Provider--network-methods
    provider.getNetwork().then((result)=>{
      setChainId(result.chainId)
      setChainName(result.name)
    })
  },[currentAccount]) // 仅在 currentAccount 更改时更新 实现了性能的优化
  
  //连接metamask
  const onClickConnect = ()=>{
    if(!window.ethereum){
      console.log("请先安装MetaMask")
      return 
    }
    //https://docs.ethers.org/v5/getting-started/#getting-started--connecting
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    //连接matemask 并获取 帐号
    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", []).then((accounts)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    }).catch((e)=>console.log(e));
  }
  //取消联接metamask
  const onClickDisconnect=()=>{
    console.log("onClickDisConnect")
    setBalance(undefined)
    setCurrentAccount(undefined)
  }
  

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>     
        <h1>构建像OpenSea这样的NFT市场DApp</h1>
        {currentAccount
        ?<Button block onClick={onClickDisconnect} >
          Account:{currentAccount}
        </Button>
        :
          <Button block onClick={onClickConnect} >Connect MetaMask</Button>
        }
        {currentAccount
        ?<Card title="帐号信息" size="small">
          <p>当前帐号ETH: {balance}</p> 
          <p>Chain Info: ChainId {chainId} name:{chainname} </p>
        </Card>
        :<></>
        }
        {/* <CardERC721 addressContract={nftAddress} tokenId={tokenId} ></CardERC721> */}
        <Dropdown
          menu={{
            items,
            onClick,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              选择要查看的内容
              <DownOutlined />              
            </Space>
          </a>
        </Dropdown>
        <ReadNFTMarket option={0}></ReadNFTMarket>
        <ReadNFTMarket option={1}></ReadNFTMarket>
        <ReadNFTMarket option={2}></ReadNFTMarket>
  </Space>
    )
}


export default Home
