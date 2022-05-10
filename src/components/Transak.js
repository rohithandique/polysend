import React from 'react'
import { AspectRatio } from '@chakra-ui/react'

import { useAuth } from 'contexts/AuthContext'

export default function Transak() {

    const { currentAccount } = useAuth();

    return (
        <AspectRatio ratio={2}>
            <iframe
            src={"https://staging-global.transak.com?apiKey=90910540-95d5-475d-9050-5fd712894643&walletAddress="+ currentAccount +"&disableWalletAddressForm=true"}
            height="50%"
            width="100%"
            title="Transak"
            id="transakId"
            />
        </AspectRatio>
    )
}
