import React, { useState } from 'react'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import { Input, Button, message, Card } from 'antd'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

const CustomPage: React.FC = () => {
  const router = useRouter()

  const [id, setId] = useState('')
  const [page, setPage] = useState('')
  const [, setSearchValue] = useState('')

  const jump = () => {
    if (isEmpty(id) || isEmpty(page)) {
      message.warning('not id or page')
      return
    }
    router.push(`/${encodeURIComponent(id)}/${page}`)
  }

  return (
    <StyledWrapper>
      <Card>
        <StyledWrapperItem>
          <Input placeholder="Enter id" onChange={e => setId(e.target.value)} />
        </StyledWrapperItem>
        <StyledWrapperItem>
          <Input placeholder="Enter page" onChange={e => setPage(e.target.value)} />
        </StyledWrapperItem>
        <Button onClick={jump} style={{width: '100%'}}>阅读</Button>
      </Card>
      <Card style={{ marginTop: 20 }}>
        <StyledWrapperItem>
          <Input placeholder="Enter search" onChange={e => setSearchValue(e.target.value)} />
        </StyledWrapperItem>
        <Button onClick={jump} style={{width: '100%'}} disabled>搜索</Button>
      </Card>
      <Footer></Footer>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin: 0;
  padding: 10px;
`

const StyledWrapperItem = styled.div`
  margin: 10px 0;
`

export default CustomPage