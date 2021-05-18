import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Footer: React.FC = () => {
  return (
    <StyledWrapper>
      <Link to={'/'}>首页</Link>
      <Link to={'/'}>书架</Link>
      <Link to={'/custom'}>自定义</Link>
      <Link to={'/'}>我的</Link>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #f1f1f1;
  padding: 16px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
`
export default Footer