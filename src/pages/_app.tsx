import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import axios from "axios";
import "@fontsource/noto-sans";

axios.defaults.baseURL = process.env.PROD_URL || process.env.DEV_URL;

const theme = extendTheme({
  fonts: {
    heading: "Noto Sans",
    body: "Noto Sans",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
