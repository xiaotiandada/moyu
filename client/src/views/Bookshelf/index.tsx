import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import store from 'store'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'

const HomePage: React.FC = () => {

  const [list, setList] = useState<any[]>([])

  useEffect(() => {

    let historyStore = store.get('history') || []
    setList(historyStore)

  }, []);


  return (
    <StyledWrapper>
      {
        !isEmpty(list) ? <StyledItem>
        {
          list.map((i, idx) => (
            <Link key={idx} to={`/${encodeURIComponent(i.id)}/${i.page}`}>
              <StyledItemLi>{i.title}</StyledItemLi>
            </Link>
          ))
        }
        </StyledItem> : <Empty description={'暂无书籍 📚'} />
      }
      <Footer></Footer>
    </StyledWrapper>

  )
}
const StyledWrapper = styled.div`
  padding: 10px 10px 65px;
`

const StyledItem = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  & > a {
    font-size: 14px;
    color: #333;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
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