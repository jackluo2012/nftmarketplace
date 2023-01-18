import Head from 'next/head'
import type { NextPage } from 'next'
import { useState,useEffect } from 'react';
import {BigNumber, ethers} from "ethers"
import Login from "../../components/Login"



declare let window:any
//nft 的 id
const tokenId = BigNumber.from(1)
//合约地址
const nftAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const Gallery: NextPage = () =>{
  const [balance,setBalance] = useState<string |undefined>()
  const [currentAccount,setCurrentAccount] = useState<string |undefined>()
  const [chainId,setChainId] = useState<number | undefined>()
  const [chainname, setChainName] = useState<string | undefined>()
  const [selectOption, setSelectOption] = useState<number|0>()

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
    <><Login /></>
    )
}


export default Gallery
