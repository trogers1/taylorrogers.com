import React from 'react';
import styled from 'styled-components';

import truncate from 'helpers/truncate';

import HeadingLarge from 'components/atoms/HeadingLarge';
import Grid from 'components/atoms/Grid';
import Card from 'components/molecules/SmallCardLink';

const StyledGrid = styled(Grid)`
  margin-bottom: 5rem;
  max-width: 125rem;
`;

const Centered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
`;

const BlogHome = () => {
  return (
    <Centered>
      <HeadingLarge>Welcome</HeadingLarge>
      <StyledGrid>
        {[1, 2, 3, 4, 5, 6, 7].map(num => (
          <Card
            key={num}
            title="This is a fake title"
            body={truncate(
              'Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase. Inherits this property from its parent element. Read about inherit. Transforms all characters to lowercase.',
              350
            )}
            to="/blog/blogNumber"
          />
        ))}
      </StyledGrid>
    </Centered>
  );
};

export default BlogHome;
