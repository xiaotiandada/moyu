import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Footer: React.FC = () => {

  let location = useLocation();
  const active = (name: string) => location.pathname === name

  return (
    <StyledWrapper>
      <StyledLink active={active('/') } to={'/'}>首页</StyledLink>
      <StyledLink active={active('/bookshelf')} to={'/bookshelf'}>书架</StyledLink>
      <StyledLink active={active('/custom')} to={'/custom'}>自定义</StyledLink>
      <StyledLink active={active('/setting')} to={'/setting'}>其他</StyledLink>
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

const StyledLink = styled(Link)<{ active: boolean }>`
  color:  ${({ active }) => active ? '#333' : '#a7a7a7'};
`

export default Footer