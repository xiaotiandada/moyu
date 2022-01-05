import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import VirtualList from 'rc-virtual-list'
import LoadingSpin from '../../../components/LoadingSpin'
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

  const _height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const VirtualListHeight = _height - 80 - 20

  return (
    <StyledWrapper>
      <VirtualList data={data.data.reverse()} height={VirtualListHeight} itemHeight={44} itemKey="id">
        {(item) => (
          <Link key={`${item.id}${item.href}`} href={`/p/${encodeURIComponent(id)}/${encodeURIComponent(item.id)}`}>
            <a>
              <StyledItemLi>{item.name}</StyledItemLi>
            </a>
          </Link>
        )}
      </VirtualList>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.section`
  margin: 0;
  padding: 10px;
`

const StyledItemLi = styled.section`
  border: 1px solid #f1f1f1;
  font-size: 12px;
  margin: 4px 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
  height: 36px;
  color: #333;
`

export default ListPage