import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyle = createGlobalStyle`
	:root{
		--transparent: transparent;
		--whiteSmoke: #ECECEC;
		--silver: #ACACAC;
		--dodgerBlue: #0066ff;
		--royalBlue: #4460F1;
		--dimGray: #666666;
		--blackPearl: #061936;
		--lynxWhite: #f7f7f7;
		--midGray: #ccc;

		--box-shadow-sm: 0 10px 20px -10px rgba(68, 96, 241, 0.5);
		--box-shadow-lg: 0 20px 20px -10px rgba(68, 96, 241, 0.5); 

		--svg-width: 24px;
		--svg-height: 24px;

		--folder-max-width: 250px;
	}

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

	.primary{
		${tw`px-6 py-2 rounded-lg bg-dodgerBlue text-lynxWhite transition transition-all flex items-center gap-x-2`}
		box-shadow: var(--box-shadow-sm);

		&{
			:disabled{
				${tw`bg-blue-300 shadow-none`}
			}

			:hover,
			:focus {
			  outline: none;
			  box-shadow: var(--box-shadow-lg);
			  transform: translateY(-5px);

			  :disabled{
				  ${tw`shadow-none`}
				  transform: none;
			  }
			}

			svg{
				width: var(--svg-width);
				height: var(--svg-height);
			}

		}
	}

	.backdrop{
		${tw`absolute inset-0 z-40 w-full h-full`}
	}
`;

export default GlobalStyle;
