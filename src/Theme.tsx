import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakPoints = createBreakpoints({
  sm: "320px",
  md: "620px",
  lg: "1024px",
  xl: "1920px",
});

const customTheme = extendTheme({
  breakpoints: breakPoints,
});

export default customTheme;
