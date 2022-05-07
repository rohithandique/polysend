import React, { useEffect } from 'react'
import { useAuth } from 'contexts/AuthContext';
import { Tbody, Tr,Td 
} from '@chakra-ui/react'

export default function AddressesList() {
    const { isPro, amount, addresses, setAmount } = useAuth()
    useEffect(() => {
        let isConnected = false;
        if(!isConnected && isPro) {
            let _amount = 0;
            for(let i=0; i<addresses.length; i++) {
                _amount+=parseFloat(addresses[i][1]);
            }
            setAmount(_amount)
        }
    
        return () => {
            isConnected = true;
        }
    }, [addresses, isPro, setAmount])
    

    if(addresses) {
        const addrArr = addresses.map((_addr, index)=>(
            <Tr key={index}>
                <Td >{isPro? _addr[0].toUpperCase() : _addr.toUpperCase()}</Td>
                <Td isNumeric>{isPro ? _addr[1] : amount}</Td>
            </Tr>
        ))
        return <Tbody>{addrArr}</Tbody>
    } 
    return null;
}
