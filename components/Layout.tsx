import type { FC } from 'react'
import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'

type Props = {
  title?: string
}

const Layout: FC<Props> = ({ children, title = 'MoYu' }) => {
  const router = useRouter()

  return (
    <StyledWrapper>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="https://www.gstatic.com/android/keyboard/emojikitchen/20210218/u1f636-u200d-u1f32b-ufe0f/u1f636-u200d-u1f32b-ufe0f_u1f92b.png" />
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
  padding: 40px 0;
`

export default Layout
