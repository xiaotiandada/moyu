import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Header: React.FC = () => {
  return (
    <StyledWrapper>
      <Link to={'/'}>首页</Link>
      <Link to={'/'}>更多</Link>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid #f1f1f1;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
`
export default Header