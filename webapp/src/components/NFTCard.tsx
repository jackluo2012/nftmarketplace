import React, { useEffect,useState } from 'react';
// import {BadgeToken as abi} from '../abi/BadgeToken.json'
import ERC721ABI  from '../abi/BadgeToken.json';
const base64 = require( "base-64")
import { ethers,BigNumber } from 'ethers';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
interface Props {
  title: string,
  id:any,
  contract:any,
  media:any[],
  description:string
}

interface ItemInfo{
    name:string,
    description:string,
    svg:string
}
declare let window: any;

export default function NFTCard(nft:Props){
    
  return (
    <>
    {nft
    ?<Card
    hoverable
    style={{ width: 200 }}
    cover={<img src={nft.media[0].gateway} alt={nft.title} />}
    >
      <h2>{nft.title}</h2>
      <text>{nft.id.tokenId}</text>
      <text>{nft.id.address}</text>
      <p>{nft.description}</p>
    </Card>
    :<Card />
    }    
    </>
  )
  }