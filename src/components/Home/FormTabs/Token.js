import React from 'react'
import {
    FormControl, FormLabel, Input, Badge
} from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'

export default function Token() {

  const { setTokenAddress, currentNetwork } = useAuth();
  
  const handleChange = (e) => {
    setTokenAddress(e.target.value)
  }

  return (
    <>
    <FormControl>
        <FormLabel htmlFor='token'>
          Token
          <Badge colorScheme="blue" ml="2" rounded="md" p="1">Contract (
            {
              currentNetwork === 56 || currentNetwork ===97 ? "BNB"
              :  
              currentNetwork === 128 ? "HT"
              :
              currentNetwork === 1
              ? "ETH" : ""
            }
          {" "}Chain)</Badge>
        </FormLabel>
        <Input id='token' _placeholder={{color: "gray.500"}} onChange={handleChange}  color="black"
        type='email' w='100%' backgroundColor="#E5E5E5" placeholder='0xA0c68C638235ee32657e8f720a23ceC1bFc77C77'/>
    </FormControl>
    </>
  )
}
