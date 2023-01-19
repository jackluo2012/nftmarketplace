import Head from 'next/head'
import type { NextPage } from 'next'
import { useState,useEffect, JSXElementConstructor, ReactElement, ReactFragment } from 'react';

import Profile from "../../components/Profile"
import { useQuery, gql } from "@apollo/client";
import recommendedProfilesQuery from '../../queries/recommendedProfilesQuery.js';

const Apollo: NextPage = () =>{
  const {loading, error, data} = useQuery(recommendedProfilesQuery);
  
  

  return (
    <>
    {loading?
    'Loading..'
    :
    <div>    
    {data.recommendedProfiles.map((profile:any, index:number) => {
      console.log(`Profile ${index}:`, profile);
      return <Profile key={profile.id} profile={profile} displayFullProfile={false} />;
    })}
  </div>
    }
    </>
    )
}


export default Apollo
