import React, { useEffect, useState } from 'react'
import { ptwxz, ptwxzDetail } from '../../api/index'

import styled from 'styled-components'

const ListPage: React.FC = () => {

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
    <StyledItem>
      {
        list.map((i, idx) => <StyledItemLi key={idx}>{i.name}</StyledItemLi>)
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
  grid-row-gap: 10px;
  grid-column-gap: 10px;
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

export default ListPage