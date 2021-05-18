import React, { useEffect, useState } from 'react'
import { ptwxzList } from '../../api/index'
import { Link, useParams } from 'react-router-dom'

import styled from 'styled-components'

const ListPage: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [list, setList] = useState<any[]>([])

  useEffect(() => {

    const fetch = async () => {
      const res: any = await ptwxzList({
        id: decodeURIComponent(id)
      })
      console.log('res', res)
      if (res.code === 0) {
        setList(res.data)
      }
    }

    fetch()
  }, [id]);


  return (
    <StyledItem>
      {
        list.map((i, idx) => (
          <Link key={idx} to={{
            pathname: `/${id}/${i.id}`,
          }}>
            <StyledItemLi>{i.name}</StyledItemLi>
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