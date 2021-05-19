import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import store from 'store'
import styled from 'styled-components'
import Footer from '../../components/Footer'

const ListPage: React.FC = () => {
  let { id } = useParams<{ id: string }>();
  const [list, setList] = useState<any[]>([])

  useEffect(() => {

    let historyStore = store.get('history') || []
    setList(historyStore.reverse())

  }, [id]);


  return (
    <StyledItem>
      {
        list.map((i, idx) => (
          <StyledItemLi key={idx} >
            <Link to={{
              pathname: `/${encodeURIComponent(i.id)}/${i.page}`,
            }}>
              {i.subtitle}
            </Link>
          </StyledItemLi>
        ))
      }
      <Footer></Footer>
    </StyledItem>
  )
}

const StyledItem = styled.ul`
  margin: 0;
  padding: 10px;
  list-style: none;
`
const StyledItemLi = styled.li`
  width: 100%;
  border: 1px solid #f1f1f1;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px 10px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export default ListPage