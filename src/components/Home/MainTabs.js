import React from 'react'
import Amounts from './FormTabs/Amounts';
import Addresses from './FormTabs/Addresses';
import Token from './FormTabs/Token';
import SupportedNetworks from './FormTabs/SupportedNetworks';

import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box, useColorModeValue, 
    Button, Switch, FormControl, FormLabel, Tooltip, Grid, GridItem, useToast 
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { useAuth } from 'contexts/AuthContext';

import convertStringAddrToArr from 'utils/convertStringAddrToArr';
import convertStringAmountAddrToArr from 'utils/convertStringAmountAddrToArr';
import Transak from 'components/Transak';

export default function MainTabs() {

    const bg = useColorModeValue("#E5E5E5", "gray.800");
    let navigate = useNavigate();
    const toast = useToast()

    const { amount, tokenAddress, addresses, setAddresses, 
        currentAccount, isPro, setIsPro, tabIndex, setTabIndex,
        currentNetwork
    } = useAuth()

    const changePro = () => {
        setIsPro(!isPro)
    }

    const confirm = () => {
        if(!currentAccount) {
            toast({
                title: 'No Account Found!',
                description: "Please connect with your wallet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if(!isPro && !amount) {
            toast({
                title: 'No Amount detected',
                description: "Please add correct amount.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if(!isPro && amount <= 0 ) {
            toast({
                title: 'Incorrect Amount detected',
                description: "Amount can't be negative.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        
        if(tabIndex === 1 && tokenAddress.length!==42) {
            toast({
                title: 'Incorrect Token Address detected',
                description: "Please enter correct address",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }
        
        if(!addresses || addresses.length===0) {
            toast({
                title: 'Incorrect Addresses detected!',
                description: "Please enter correct addresses.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        if(!isPro && typeof(addresses)==="string") {
            setAddresses(convertStringAddrToArr(addresses))
        }

        if(isPro && typeof(addresses)==="string") {
            setAddresses(convertStringAmountAddrToArr(addresses))
        }
        
        if(currentNetwork !== 137) {
            toast({
                title: 'Unsupported Network detected!',
                description: "Please switch to supported network.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return;
        }

        navigate("/confirm", { replace: false })
    }

    const handleTabChange = index => {
        setTabIndex(index)
    }

    return (
    <>
    <Center bg={bg} h="90vh">
        <Box mt="-20" px="2" pb="4" rounded="xl" shadow="lg" bg={useColorModeValue("white", "gray.700")} w={{base:'90vw', md:"60vw"}} h="80vh">
            <Tabs isFitted variant='unstyled' onChange={(index) => handleTabChange(index)}>
            <Grid templateColumns='repeat(5, 1fr)' gap={4}>
                <GridItem colSpan={4}>
                    <TabList  mx={4} mt="8" p={2} bg="brand.300" rounded="xl" w={{base:"92.5%", md:"60%"}} color="black">
                    <Tab _selected={{ color: 'black', bg: 'brand.200' }} 
                        _focus={{ outline: "none" }} rounded="lg">
                        Send {
                        currentNetwork === 56 || currentNetwork ===97 ? "BNB"
                        :  
                        currentNetwork === 128 ? "HT"
                        :
                        currentNetwork === 1
                        ? "ETH" : ""}
                    </Tab>
                    <Tab _selected={{ color: 'black', bg: 'brand.200' }}
                        _focus={{ outline: "none" }} rounded="lg">
                        Send Tokens
                    </Tab>
                    </TabList>
                </GridItem>
                <GridItem colSpan={1}>
                    <FormControl display='flex' alignItems='flex-end' justifyContent='flex-end' mt="8" pr="4">
                    <FormLabel htmlFor='pro' mb='0'>
                        PRO
                        <Tooltip label='In Pro Mode, you can set different amounts of token to be sent to each address' 
                        fontSize='sm' rounded="md">
                            <InfoOutlineIcon ml="2"/>
                        </Tooltip>
                    </FormLabel>
                    <Switch id='pro' onChange={changePro}/>
                    </FormControl>
                </GridItem>
            </Grid>
            <TabPanels>
                <TabPanel>
                    { isPro
                    ? <></>
                    : <Amounts />}
                    <Addresses />
                </TabPanel>
                <TabPanel>
                    <Token />
                    { isPro
                    ? <></>
                    : <Amounts />}
                    <Addresses />
                </TabPanel>
            </TabPanels>
            </Tabs>
            <Center>
                <Button bg="brand.100" color="white" 
                size="md"
                _hover={{
                    backgroundColor: "brand.200"
                }}
                onClick={confirm}
                >
                    NEXT
                </Button>
            </Center>
        </Box>
    </Center>
    <SupportedNetworks />
    <Transak />
    </>
  )
}
