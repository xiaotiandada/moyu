import React, { useMemo } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const Footer: React.FC = () => {
  const router = useRouter()
  const active = (name: string) => router.pathname === name

  const Menu = useMemo(() => {
    return [
      {
        href: '/',
        name: '首页'
      },
      {
        href: '/bookshelf',
        name: '书架'
      },
      {
        href: '/custom',
        name: '自定义'
      },
      {
        href: '/setting',
        name: '其他'
      }
    ]
  }, [])

  return (
    <StyledWrapper>
      {
        Menu.map((i) => (
          <Link href={i.href} key={i.href}>
            <a style={{ color: active(i.href) ? '#333' : '#a7a7a7' }}>
              {i.name}
            </a>
          </Link>
        ))
      }
    </StyledWrapper>
  )
}

const StyledWrapper = styled.section`
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
  a {
    font-size: 14px;
  }
`

export default Footer