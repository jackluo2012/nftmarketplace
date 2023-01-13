import React, { useEffect,useState } from 'react'
import { Card, Button, Space,Input,Form } from 'antd';
import { Contract, ethers } from 'ethers';
import { ERC20ABI as abi } from '../abi/ERC20ABI';
import {parseEther } from 'ethers/lib/utils'
import { TransactionResponse,TransactionReceipt } from "@ethersproject/abstract-provider"
interface Props {
    addressContract: string,
    currentAccount: string | undefined
}

declare let window: any;

export default function TransferERC20(props:Props){
        const addressContract = props.addressContract
        const currentAccount = props.currentAccount
        const [amount,setAmount]=useState<string>('100')
        const [toAddress, setToAddress]=useState<string>("")
        
        async function transfer(event:React.FormEvent) {
            event.preventDefault()
            console.log("transfer clicked")
            if(!window.ethereum) return   
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()            
            const erc20:Contract = new ethers.Contract(addressContract, abi, signer)
            
            erc20.transfer(toAddress,parseEther(amount))
            .then((tr: TransactionResponse) => {
                console.log(`TransactionResponse TX hash: ${tr.hash}`)
                tr.wait().then((receipt:TransactionReceipt)=>{console.log("transfer receipt",receipt)})
            })
            .catch((e:Error)=>console.log(e))
        }
    const handleChange = (e:any)=> {
        console.log(e.target.value);
        setAmount(e.target.value)
    }
    return (
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>            
            <Card title="Transfer ClassToken" size="small">
                <p>ERC20 Contract: Transfer</p>
                <Form layout="vertical">
                    <Form.Item label="Amount" required tooltip="请输入要转的金额">
                        <Input type='number' value={amount} onChange={handleChange} min={10} max={1000}  prefix="￥" suffix="CLT" />
                    </Form.Item>
                    <Form.Item label="To address" required tooltip="请输入要转的地址">
                        <Input  id='toAddress' type='text' required onChange={(e)=>setToAddress(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" disabled={!currentAccount} onClick={transfer}>Transfer</Button>
                    </Form.Item>
                </Form>
            </Card> 
        </Space>
    )
}


