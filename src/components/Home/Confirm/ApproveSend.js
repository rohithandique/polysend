import React from 'react'
import { Box, Circle, HStack } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons';

export default function ApproveSend(props) {

    const { isApproved, isSent } = props;

    return (
    <>
    <HStack>
        { isApproved ?
        <Circle p="2" bg="brand.200" w="20px" h="20px">
            <CheckIcon />
        </Circle>
        :
        <Circle p="2" bg="brand.200" w="20px" h="20px">
            1
        </Circle>
        }
        <Box>Approve</Box>
        <Box>----------</Box>
        { isSent ?
        <Circle p="2" bg="brand.200" w="20px" h="20px">
            <CheckIcon />
        </Circle>
        :
        <Circle p="2" bg="brand.200" w="20px" h="20px">
            2
        </Circle>
        }
        <Box>Send</Box>
    </HStack>
    </>
    )
}
