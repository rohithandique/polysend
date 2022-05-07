import React from 'react'
import {
    FormControl, FormLabel, Textarea, Tooltip, Grid, GridItem, Button
} from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { FaFileCsv } from "react-icons/fa"
import { BsBookmarks } from "react-icons/bs"
import CSVUpload from './CSVUpload'
import { useAuth } from 'contexts/AuthContext'

export default function Addresses() {

  const { setAddresses, isUpload, setIsUpload, isPro} = useAuth()

  const handleChange = (e) => {
    setAddresses(e.target.value)
  }

  const handleClick = () => {
    setAddresses(undefined)
    setIsUpload(!isUpload)
  }

  return (
    <>
    <FormControl mt="4">
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        <GridItem colSpan={4}>
          <FormLabel htmlFor='addresses'>
            Addresses
            <Tooltip label='Max 255 Addresses Allowed' fontSize='sm' rounded="md">
              <InfoOutlineIcon ml="2"/>
            </Tooltip>
          </FormLabel>
        </GridItem>
        <GridItem colSpan={1} display='flex' alignItems='flex-end' justifyContent='flex-end'>
          <Button variant="unstyled" onClick={handleClick} 
          rightIcon={isUpload ? <FaFileCsv /> : <BsBookmarks />}
          _focus={{
            outline: "none"
          }}
          pb="4"
          >
            {isUpload ?
            "Direct Input"
            :
            "Upload File"
            }
          </Button>
        </GridItem>
      </Grid>
      { isUpload ?
      <CSVUpload />
      :
      isPro ?
      <Textarea id='addresses' type='text' w="100%" rows="8" backgroundColor="#E5E5E5"
      _placeholder={{color: "gray.500"}} color="black" onChange={handleChange} multiline="true"
      placeholder=
        '1. 0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea, 10, 
2. 0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea, 20,
3. 0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea, 30'
      />
      :
      <Textarea id='addresses' type='text' w="100%" rows="8" backgroundColor="#E5E5E5"
      _placeholder={{color: "gray.500"}} color="black" onChange={handleChange} multiline="true"
      placeholder=
        '1. 0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea, 
2. 0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea
3. 0x1a0b5F2EAde71626D051C29Ef425d9c49dc87Aea'
      />
      }
      
    </FormControl>
    </>
  )
}
