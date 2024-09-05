import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    colorSet: {
      lightGray?: string;
      paleBlue?: string;
      success?: string;
    };
  }
  interface ThemeOptions {
    colorSet?: {
      lightGray?: string;
      paleBlue?: string;
      success?: string;
    };
  }
}
