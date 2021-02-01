import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Proptypes from 'prop-types';

import hero from '../assets/images/hero-3d.png';
import { Logo } from './icons';

const StyledLayoutOne = styled.div`
  ${tw`w-full min-h-screen`}

  & {
    .section {
      ${tw`min-h-screen grid md:grid-cols-2`}

      .section-one {
        ${tw`px-4 md:px-12 py-6 md:py-12 relative`}

        .section-one__img {
          ${tw`w-1/2 md:w-9/12 mx-auto`}
        }
      }

      .section-two {
        ${tw`flex flex-col items-center justify-center py-6 md:py-12`}
      }
    }
  }
`;

const LayoutOne = ({ children }) => (
  <StyledLayoutOne>
    <section className="section">
      <div className="section-one">
        <Logo />
        <div className="section-one__img">
          <img src={hero} alt="hero-3d" />
        </div>
      </div>
      <div className="section-two">{children}</div>
    </section>
  </StyledLayoutOne>
);

LayoutOne.propTypes = {
  children: Proptypes.node.isRequired,
};

export default LayoutOne;
