import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import LoadingSpin from '../../../components/LoadingSpin'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const ListPage: React.FC = () => {
  const router = useRouter()
  const { id } = router.query

  // @ts-ignore
  const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/ptwxz/list?id=${decodeURIComponent(id as string)}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <LoadingSpin></LoadingSpin>

  return (
    <StyledItem>
      {
        (data.data.reverse()).map((i: any) => (
          <Link key={`${i.id}${i.href}`} href={`/p/${encodeURIComponent(id as string)}/${i.id}`}>
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
  font-size: 14px;
  margin: 0 auto;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default ListPage