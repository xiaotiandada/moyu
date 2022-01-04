
import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import LoadingSpin from '../components/LoadingSpin'
import useSWR from 'swr'
import ErrorTip from '../components/ErrorTip'
import { fetcher } from '../utils'
import { Response } from '../typings'
import type { ListData } from '../typings'

const IndexPage = () => {
  const { data, error } = useSWR<Response<ListData[]>>('/api/ptwxz', fetcher)
  if (error) return <ErrorTip></ErrorTip>
  if (!data) return <LoadingSpin></LoadingSpin>

  return (
    <StyledItem>
      {
        data.data.map((i) => (
          <Link key={i.id} href={`/p/${encodeURIComponent(i.id)}`}>
            <a>
              <StyledItemLi>{i.name}</StyledItemLi>
            </a>
          </Link>
        ))
      }
    </StyledItem>
  )
}

const StyledItem = styled.ul`
  margin: 0;
  padding: 10px 10px 40px;
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
  height: 140px;
  font-size: 14px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default IndexPage