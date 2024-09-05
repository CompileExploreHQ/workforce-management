import { Theme } from '@material-ui/core';
import 'styled-components';

type ThemeInterface = Theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
