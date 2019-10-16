import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

const Wrapper = styled.div`
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

export default Section;
