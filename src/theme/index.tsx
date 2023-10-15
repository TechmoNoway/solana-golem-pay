import PropTypes from "prop-types";
import { useMemo } from "react";

import { CssBaseline, Shadows } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material/styles";

import palette from "./palette";
import shadows from "./shadows";
import typography from "./typography";
import GlobalStyles from "./globalStyles";
import customShadows from "./customShadows";
import componentsOverride from "./overrides";

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  //   const themeOptions = useMemo(
  //     () => ({
  //       palette,
  //       shape: { borderRadius: 6 },
  //       typography,
  //       shadows: shadows(),
  //       customShadows: customShadows(),
  //     }),
  //     []
  //   );

  const themeOptions = {
    palette: {
      common: {
        black: "#000",
        white: "#fff",
      },
      primary: {
        lighter: "#7986cb",
        light: "#6474cd",
        main: "#5663c0",
        dark: "#4552b4",
        darker: "#344094",
        contrastText: "#fff",
      },
      secondary: {
        lighter: "#ff8a65",
        light: "#ff7043",
        main: "#ff5722",
        dark: "#e64a19",
        darker: "#bf360c",
        contrastText: "#fff",
      },
      // ... 8 more ...
      action: {
        // ...
      },
    },
    shadows: [
      "none",
      "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
      "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
      // ... 22 more ...
    ] as unknown as Shadows,
  };

  //   const theme = createTheme(themeOptions);
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
