import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import LoadingSpin from '../../../components/LoadingSpin'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import ErrorTip from '../../../components/ErrorTip'
import { fetcher } from '../../../utils'
import { Response } from '../../../typings'
import type { ListData } from '../../../typings'

const ListPage: React.FC = () => {
  const router = useRouter()
  const id = router.query.id as string

  const { data, error } = useSWR<Response<ListData[]>>(`/api/ptwxz/list?id=${decodeURIComponent(id)}`, fetcher)
  if (error) return <ErrorTip></ErrorTip>
  if (!data) return <LoadingSpin></LoadingSpin>

  return (
    <StyledItem>
      {
        (data.data.reverse()).map((i) => (
          <Link key={`${i.id}${i.href}`} href={`/p/${encodeURIComponent(id)}/${encodeURIComponent(i.id)}`}>
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
  padding: 10px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 4px;
  grid-column-gap: 4px;
  & > a {
    color: #333;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const StyledItemLi = styled.li`
  border: 1px solid #f1f1f1;
  font-size: 12px;
  margin: 0 auto;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default ListPage