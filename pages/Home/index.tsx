import React, { useEffect, useState } from 'react'
import { ptwxz } from '../../api/index'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import LoadingSpin from '../../components/LoadingSpin'

const HomePage: React.FC = () => {

  const [list, setList] = useState<any[]>([])

  useEffect(() => {

    const fetch = async () => {
      const res: any = await ptwxz()
      console.log('res', res)
      if (res.code === 0) {
        setList(res.data)
      }
    }

    fetch()
  }, []);


  return (
    <>
      {
        list.length === 0 ? <LoadingSpin></LoadingSpin> : null
      }
      <StyledItem>
        {
          list.map((i, idx) => (
            <Link key={idx} to={`/${encodeURIComponent(i.id)}`}>
              <StyledItemLi>{i.name}</StyledItemLi>
            </Link>
          ))
        }
        <Footer></Footer>
      </StyledItem>
    </>
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

export default HomePage