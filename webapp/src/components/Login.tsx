import React, { useEffect,useState } from 'react'
import { Button, Checkbox, Form, Input,Card, Col, Row,Divider } from 'antd';
import NFTCard from './NFTCard';

declare let window: any;

export default function Login(){
    const [wallet, setWalletAddress] = useState("");
    const [collection, setCollectionAddress] = useState("");
    const [NFTs, setNFTs] = useState([])
    const [fetchForCollection, setFetchForCollection]=useState(false)

    const onFinish = (values: any) => {
        if (fetchForCollection) {
            console.log('fetchForCollection',fetchForCollection);
            fetchNFTsForCollection()
          }else{
            console.log(fetchForCollection);
            fetchNFTs()
          } 
        
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const fetchNFTs = async() => {
        let nfts; 
        console.log("fetching nfts");
        const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
        const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
        var requestOptions = {
            method: 'GET'
          };
         
        if (!collection.length) {
        
          const fetchURL = `${baseURL}?owner=${wallet}`;
      
          nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        } else {
          console.log("fetching nfts for collection owned by address")
          const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
          nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
        }
      
        if (nfts) {
          console.log("nfts:", nfts)
          setNFTs(nfts.ownedNfts)
        }
      }
      const fetchNFTsForCollection = async () => {
        if (collection.length) {
          var requestOptions = {
            method: 'GET'
          };
          const api_key = "A8A1Oo_UTB9IN5oNHfAc2tAxdR4UVwfM"
          const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
          const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
          const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
          if (nfts) {
            console.log("NFTs in collection:", nfts)
            setNFTs(nfts.nfts)
          }
        }
      } 
        
    return (
        <>
        <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="wallet"
        label="Wallet"        
      >
        <Input disabled={fetchForCollection} onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address" />
      </Form.Item>

      <Form.Item
        name="Collection"
        label="Collection"    
      >
        <Input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox onChange={(e)=>{setFetchForCollection(e.target.checked)}} >Fetch for collection</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" >
        Let's go!
        </Button>
      </Form.Item>
    </Form>
    <Divider orientation="left">列表</Divider>
    <Row gutter={16} justify={"center"}>
    {NFTs
    ?(NFTs.length ==0)
    ?<Col>没有商品</Col>
    :NFTs.map((nft:any)=>{
        return (
            <Col key={nft.id.tokenId}>
                <NFTCard {...nft}  ></NFTCard>
                <Button block></Button>                                
            </Col>
        )
    })
    :<Col></Col>}    
    </Row>
    </>
    )
}


