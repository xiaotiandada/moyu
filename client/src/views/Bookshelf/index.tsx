import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import store from 'store'


const HomePage: React.FC = () => {

  const [list, setList] = useState<any[]>([])

  useEffect(() => {

    let historyStore = store.get('history') || []
    setList(historyStore)

  }, []);


  return (
    <StyledItem>
      {
        list.map((i, idx) => (
          <Link key={idx} to={`/${encodeURIComponent(i.id)}/${i.page}`}>
            <StyledItemLi>{i.title}</StyledItemLi>
          </Link>
        ))
      }
      <Footer></Footer>
    </StyledItem>
  )
}

const StyledItem = styled.ul`
  margin: 0;
  padding: 10px 10px 65px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  & > a {
    font-size: 14px;
    color: #333;
  }
`
const StyledItemLi = styled.li`
  border: 1px solid #f1f1f1;
  /* width: 100px; */
  height: 160px;
  font-size: 14px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export default HomePage