import React from 'react'
import store from 'store'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import { Button, message } from 'antd';
import { clearAllCookie } from '../../utils/cookie'

const ListPage: React.FC = () => {

  const clearCookie = () => {
    clearAllCookie()
    message.success('success')
  }

  const clearLocalStore = () => {
    store.clearAll()
    message.success('success')
  }

  return (
    <StyledWrapper>
      <StyledItem>
        <span>localStorage</span>
        <Button type="primary" danger size="small" onClick={clearLocalStore}>清理</Button>
      </StyledItem>
      <StyledItem>
        <span>cookie</span>
        <Button type="primary" danger size="small" onClick={clearCookie}>清理</Button>
      </StyledItem>
      <Footer></Footer>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  padding: 10px;
  height: 100%;
  background: rgba(244, 245, 247);
`
const StyledItem = styled.div`
  background-color: #fff;
  padding: 16px 10px;
  margin: 10px 0;
  border: 1px solid rgba(247,247,247);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
  }
  &:nth-child(1) {
    margin-top: 0;
  }
`


export default ListPage