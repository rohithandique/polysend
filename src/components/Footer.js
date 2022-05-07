import {
    Box, chakra, Container, Stack,
    Text, useColorModeValue, VisuallyHidden,
    Flex, Image, Divider
  } from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube, FaDiscord, FaTelegramPlane } from 'react-icons/fa';
import Logo from "assets/matic-logo.svg";

  
const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};
  
export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('#E5E5E5', 'gray.800')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Divider />
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        
        <Flex>
          <chakra.a
            href="/"
            title="Navbar"
            display="flex"
            alignItems="center"
          >
            <Image src={Logo} h="30px"/>
            <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
              PolySend
            </chakra.h1>
          </chakra.a>
        </Flex>
        <Text>© 2022 PolySend. All rights reserved</Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={'#'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'YouTube'} href={'#'}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'#'}>
            <FaInstagram />
          </SocialButton>
          <SocialButton label={'Discord'} href={'#'}>
            <FaDiscord />
          </SocialButton>
          <SocialButton label={'Telegram'} href={'#'}>
            <FaTelegramPlane />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}