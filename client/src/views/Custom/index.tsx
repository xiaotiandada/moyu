import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import { Input, Button, message } from 'antd'
import { isEmpty } from 'lodash'

const CustomPage: React.FC = () => {
  let history = useHistory();
  const [id, setId] = useState('')
  const [page, setPage] = useState('')

  const jump = () => {
    if (isEmpty(id) || isEmpty(page)) {
      message.warning('not id or page')
      return
    }
    history.push(`/${encodeURIComponent(id)}/${page}`);
  }

  return (
    <StyledWrapper>
      <StyledWrapperItem>
        <Input placeholder="Enter id" onChange={e => setId(e.target.value)} />
      </StyledWrapperItem>
      <StyledWrapperItem>
        <Input placeholder="Enter page" onChange={e => setPage(e.target.value)} />
      </StyledWrapperItem>
      <Button onClick={jump} style={{width: '100%'}} type="primary">阅读</Button>
      <Footer></Footer>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin: 0;
  padding: 80px 10px;
`

const StyledWrapperItem = styled.div`
  margin: 10px 0;
`

export default CustomPage