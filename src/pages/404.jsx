import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Header } from '../components';

const Styled404 = styled.div`
  ${tw`w-full flex items-center justify-center`}
  min-height: calc(100vh - 4rem);

  & {
    .description {
      ${tw`flex flex-col items-center`}
      h1 {
        ${tw`font-black mb-2`}
        font-size: 10rem;
        line-height: 1;
      }

      .base-line {
        ${tw`font-semibold text-xl`}
      }

      .base-description {
        ${tw`w-3/4 text-center text-gray-500`}

        p {
          ${tw`mt-4`}
        }

        a {
          ${tw`text-dodgerBlue`}
        }
      }
    }
  }
`;

const Notfound = () => (
  <>
    <Header />
    <Styled404>
      <div className="description">
        <h1>404</h1>
        <p className="base-line">Hmm, yeah. This is awkward.</p>
        <div className="base-description">
          <p>
            We tried really hard to find the page you were looking for. But
            seems like its not here.
          </p>
          <p>
            Let's head to <Link to="/">Homepage</Link>
          </p>
        </div>
      </div>
    </Styled404>
  </>
);

export default Notfound;
