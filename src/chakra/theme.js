import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#ff3c00",
    },
  },
  fonts: {
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "60px",
        fontSize: "10pt",
        fontWeight: 700,
        _focus: {
          boxShadow: "none",
        },
      },
      sizes: {
        sm: {
          fontSize: "8pt",
        },
        md: {
          fontSize: "10pt",
          // height: "28px",
        },
      },
      variants: {
        solid: {
          color: "white",
          bg: "blue.500",
          _hover: {
            bg: "blue.400",
          },
        },
        outline: {
          color: "blue.500",
          border: "1px solid",
          borderColor: "blue.500",
        },
        oauth: {
          height: "34px",
          border: "1px solid",
          borderColor: "gray.300",
          _hover: {
            bg: "gray.50",
          },
        },
      },
    },
  },
});
