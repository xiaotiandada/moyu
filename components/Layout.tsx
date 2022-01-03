import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
import { useRouter } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'MoYu' }: Props) => {
  const router = useRouter()

  return (
    <StyledWrapper>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header></Header>
      {children}
      {
        router.pathname !== '/p/[id]/[page]' && <Footer></Footer> 
      }
    </StyledWrapper>
  )
}

const StyledWrapper = styled.section`
  padding: 40px 0 55px 0;
`

export default Layout
