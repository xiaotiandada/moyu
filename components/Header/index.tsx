import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { HomeOutlined, ArrowLeftOutlined, GithubOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { REPO_ADDRESS } from '../../config'

const Header: React.FC = () => {
  const router = useRouter()

  return (
    <StyledWrapper>
      {
        router.pathname === '/' ?
          <Link href={'/'}>
            <a>
              <HomeOutlined />
            </a>
          </Link> :
          <span onClick={() => router.back()}>
            <ArrowLeftOutlined />
          </span>
      }
      <a href={ REPO_ADDRESS } rel="noopener noreferrer" target='_blank'>
        <GithubOutlined />
      </a>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  height: 40px;
  z-index: 10;
  a {
    font-size: 12px;
    color: #333;
  }
`

export default Header