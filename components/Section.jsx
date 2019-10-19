import { node, string } from 'prop-types';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const Wrapper = styled.div`
  overflow: hidden;
  padding: 24px 0 12px;
`;

const Section = ({
  children,
  direction = 'row',
  justify = 'space-around',
  alignItems = 'center',
}) => (
  <Wrapper>
    <Grid {...{ container: true, direction, justify, alignItems }}>
      {children}
    </Grid>
  </Wrapper>
);

Section.propTypes = {
  children: node.isRequired,
  direction: string,
  justify: string,
  alignItems: string,
};

export default Section;
