import React, { useEffect,useState } from 'react'
import { Card, Button, Space,Input,Form } from 'antd';
import { ethers } from 'ethers';
import { ERC20ABI as abi } from '../abi/ERC20ABI';
interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function ReadERC20(props:Props){
        const addressContract = props.addressContract
        const currentAccount = props.currentAccount
        const [totalSupply,setTotalSupply]=useState<string>()
        const [symbol,setSymbol]= useState<string>("")
        const [balance, SetBalance] =useState<number|undefined>(undefined)

        useEffect( () => {
            if(!window.ethereum) return
        
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const erc20 = new ethers.Contract(addressContract, abi, provider);
            erc20.symbol().then((result:string)=>{
                setSymbol(result)
            }).catch('error', console.error)
        
            erc20.totalSupply().then((result:string)=>{
                setTotalSupply(ethers.utils.formatEther(result))
            }).catch('error', console.error);
            //called only once
          },[])
          useEffect(()=>{
            if(!window.ethereum) return
            if(!currentAccount) return
            
            queryTokenBalance(window)
            
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const erc20 = new ethers.Contract(addressContract, abi, provider);

            // listen for changes on an Ethereum address
            // 监听 区块变化
            //https://docs.ethers.org/v5/getting-started/#getting-started--contracts
            console.log(`listening for Transfer...`)
            const formMe = erc20.filters.Transfer(currentAccount,null)
            provider.on(formMe,(from,to,amount,event)=>{
                //let formatAmount = ethers.utils.formatEther(amount) 
                console.log('from=>',from,'to=>',to,'amount=>',amount)
                console.log(`I got ${amount} from ${ from }.`);
                queryTokenBalance(window)
            })
            const toMe = erc20.filters.Transfer(null, currentAccount)
            provider.on(toMe, (from, to, amount, event) => {
                console.log('Transfer|received', { from, to, amount, event })
                queryTokenBalance(window)
            })
            // remove listener when the component is unmounted
            return ()=>{
                provider.removeAllListeners(formMe)
                provider.removeAllListeners(toMe)
            }
          },[currentAccount])
          
          async function queryTokenBalance(window:any){
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const erc20 = new ethers.Contract(addressContract, abi, provider);
                    
            erc20.balanceOf(currentAccount)
            .then((result:string)=>{
                SetBalance(Number(ethers.utils.formatEther(result)))
            })
            .catch('error', console.error)
          }          
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>     
            <Card title="读取 ClassToken 信息" size="small">
                <p>ERC20 Contract: {addressContract} <br /> token totalSupply: {totalSupply} {symbol}</p>
                <p>ClassToken in current account: <br /> {balance} {symbol}</p>
            </Card>            
        </Space>
    )
}


