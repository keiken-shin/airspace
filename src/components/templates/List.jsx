import styled from 'styled-components';
import tw from 'twin.macro';

const List = styled.div`
  ${tw`grid`}
  grid-template-columns: repeat(auto-fill, minmax(220px,1fr));

  & {
    @media (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    }

    @media (max-width: 360px) {
      grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    }

    .inner-list-div {
      ${tw`p-2`}
    }
  }
`;

export default List;
