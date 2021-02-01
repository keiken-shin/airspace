import styled from 'styled-components';
import tw from 'twin.macro';

const Heading = styled.div`
  ${tw`w-full px-4 mb-6 md:w-7/12 md:mb-12`}
  h2 {
    ${tw`text-3xl md:text-5xl font-semibold md:w-2/3`}
  }

  p {
    ${tw`mt-2 md:mt-6 text-sm md:text-lg`}
    a {
      ${tw`text-dodgerBlue`}
    }
  }
`;

const StyledForm = styled.form`
  ${tw`grid w-full px-4 md:w-7/12`}

  & {
    .divider {
      ${tw`text-silver relative w-full text-center my-8`}

      :before,
      :after {
        content: '';
        width: 30%;
        height: 1px;
        ${tw`absolute bg-silver top-1/2 transform -translate-y-1/2 rounded-lg`}
      }

      :before {
        ${tw`left-0`}
      }

      :after {
        ${tw`right-0`}
      }
    }
  }
`;

const StyledButton = styled.button`
  ${tw`w-full h-16 grid place-items-center bg-royalBlue text-lynxWhite text-lg font-medium rounded-xl outline-none transform transition-all`}
  box-shadow: 0 10px 20px -10px rgba(68, 96, 241, 0.5);

  &:hover,
  &:focus {
    box-shadow: 0 20px 20px -10px rgba(68, 96, 241, 0.5);
    transform: translateY(-5px);
  }
`;

const StyledAuth = styled.div`
  ${tw`w-full px-4 mb-6 md:w-7/12 md:mb-12`}

  & {
    .btn-auth {
      ${tw`w-full flex items-center justify-center gap-x-3 border border-solid rounded-xl border-dimGray h-16`}
    }
  }
`;

export { Heading, StyledForm, StyledButton, StyledAuth };
