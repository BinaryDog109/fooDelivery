import { extendTheme } from "@chakra-ui/react";

const myColorPalletes = {
  band1: {
    100: "#0987A0",
    200: "#006D85",
    300: "#00536B",
    400: "#003B52",
    500: "#00253A",
  },
  band2: {
    50: "#F9C9FF",
    100: "#DAACFF",
    500: "#BC90FF",
    600: "#9E74F3",
    700: "#805AD5",
  },
};

const theme = extendTheme({
  fonts: {
    heading: "Heading Font Name, sans-serif",
    body: "'Nunito', sans-serif",
  },
  colors: {
    ...myColorPalletes,
  },
  styles: {
    global: {
      html: {
        background: `linear-gradient(to right, 
          ${myColorPalletes.band1[100]} , 
          ${myColorPalletes.band2[600]} );`,

      },
      // styles for the `body`
      body: {
        bg: "transparent",
      },
    },
  },
});

export default theme;
