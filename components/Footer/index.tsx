import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'


const Footer: React.FC = () => {
  const router = useRouter()
  const active = (name: string) => router.pathname === name

  return (
    <StyledWrapper>
      <StyledLink active={active('/') } href={'/'}>首页</StyledLink>
      <StyledLink active={active('/bookshelf')} href={'/bookshelf'}>书架</StyledLink>
      <StyledLink active={active('/custom')} href={'/custom'}>自定义</StyledLink>
      <StyledLink active={active('/setting')} href={'/setting'}>其他</StyledLink>
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