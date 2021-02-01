import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyle = createGlobalStyle`
	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	html {
		box-sizing: border-box;
		font-size: 14px;

		@media(max-width: 300px){
			font-size: 12px;
		}
	}

	body{
    ${tw`bg-lynxWhite m-0 p-0 text-blackPearl font-noto w-full min-h-full`}
  }
`;

export default GlobalStyle;
