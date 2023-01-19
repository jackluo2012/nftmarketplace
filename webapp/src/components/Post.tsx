import React, { useEffect,useState } from 'react';
import Link from "next/link";
import ERC721ABI  from '../abi/BadgeToken.json';
const base64 = require( "base-64")
import { ethers,BigNumber } from 'ethers';
import { Card, Col, Row } from 'antd';
const { Meta } = Card;
interface Props {
  post:any
}

interface ItemInfo{
    name:string,
    description:string,
    svg:string
}

export default function Post(props:Props) {
  const post = props.post;

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <p className="mt-2 text-xs text-slate-500 whitespace-pre-line">
              {post.metadata.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}