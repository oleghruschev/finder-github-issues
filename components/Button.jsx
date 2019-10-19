import styled from 'styled-components';
import { func, string } from 'prop-types';

import theme from '../config/theme';

const ButtonStyled = styled.button`
  padding: 10px;
  background: #fff;
  border: 1px solid ${theme.palette.secondary.main};
  font-weight: 600;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  user-select: none;

  &:hover {
    background: ${theme.palette.secondary.main};
    color: #fff;
  }
`;

const Button = ({ onClick, value }) => (
  <ButtonStyled onClick={onClick}>{value}</ButtonStyled>
);

Button.propTypes = {
  onClick: func.isRequired,
  value: string.isRequired,
};

export default Button;
