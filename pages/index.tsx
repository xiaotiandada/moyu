
import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import styled from 'styled-components'
import Footer from '../components/Footer'
import LoadingSpin from '../components/LoadingSpin'
import useSWR from 'swr'

const IndexPage = () => {
  // @ts-ignore
  const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR('/api/ptwxz', fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('data', data)

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      {
        data.data.length === 0 ? <LoadingSpin></LoadingSpin> : null
      }
      <StyledItem>
        {
          data.data.map((i: any) => (
            <Link key={i.id} href={`/${encodeURIComponent(i.id)}`}>
              <a>
                <StyledItemLi>{i.name}</StyledItemLi>
              </a>
            </Link>
          ))
        }
        <Footer></Footer>
      </StyledItem>
    </Layout>
  )
}

const StyledItem = styled.ul`
  margin: 0;
  padding: 10px 10px 65px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  & > a {
    color: #333;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
const StyledItemLi = styled.li`
  border: 1px solid #f1f1f1;
  /* width: 100px; */
  height: 140px;
  font-size: 14px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default IndexPage