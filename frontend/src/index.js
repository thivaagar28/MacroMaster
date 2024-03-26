import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme, cssVar} from '@chakra-ui/react';

const $arrowBg = cssVar("popper-arrow-bg");
const theme = extendTheme({
  components: {
    Tooltip: {
      // Styles for the base style
      baseStyle: {},
      // Styles for the size variations
      sizes: {},
      // Styles for the visual style variations
      variants: {
        blackMode: () => {
          return {
            color: "white",
            p: "2",
            fontWeight : "md",
            bg: "black",
            borderRadius: "md",
            [$arrowBg.variable]: "black"
          };
        }
      },
      // The default `size` or `variant` values
      defaultProps: {}
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
