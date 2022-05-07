import React from "react";
import ToggleTheme from "utils/ToggleTheme";


import {
  chakra, Box, Flex, useColorModeValue,
  HStack, useDisclosure, VStack,
  IconButton, CloseButton, Image, Alert,
  AlertIcon, AlertTitle, AlertDescription,
} from "@chakra-ui/react";

import { HamburgerIcon} from "@chakra-ui/icons"
import Logo from "assets/matic-logo.svg";
import LoginButton from "./LoginButton";

import { useAuth } from "contexts/AuthContext";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const bg = useColorModeValue("#E5E5E5", "gray.800");
  const mobileNav = useDisclosure();

  const { currentNetwork } = useAuth()

  return (
    <React.Fragment >
      {currentNetwork === 137 
      ?
      <></>
      :
      <Alert status='warning' justifyContent='center'>
        <AlertIcon />
        <AlertTitle mr={2}>Current Network not supported!</AlertTitle> 
        <AlertDescription>Please switch to supported networks.</AlertDescription>
      </Alert>
      }
      
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
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
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              {/*<Button variant="ghost">Todo</Button>*/}
              <ToggleTheme />
            </HStack>
            <LoginButton />
            <AuthButton />
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                {/*<Button w="full" variant="ghost">
                  Todo
                </Button>*/}
                <ToggleTheme />
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}