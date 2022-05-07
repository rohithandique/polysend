import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from 'contexts/AuthContext';

const theme = extendTheme({
  colors: {
    brand: {
      100: "#2561ED",
      200: "#7BA8F9",
      300: "#D3E5FE"
    },
  }
})

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
