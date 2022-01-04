import React from 'react'
import store from 'store'
import { Button, message, Popconfirm} from 'antd'
import styled from 'styled-components'
import { clearAllCookie } from '../../utils/cookie'

const ListPage: React.FC = () => {
  // 清除所有 Cookie
  const clearCookie = () => {
    clearAllCookie()
    message.success('success')
  }

  // 清除 LocalStore
  const clearLocalStore = () => {
    store.clearAll()
    message.success('success')
  }

  return (
    <StyledWrapper>
      <StyledItem>
        <span>localStorage</span>
        <Popconfirm placement="topLeft" title={'您确定要清理？'} onConfirm={clearLocalStore} okText="Yes" cancelText="No">
          <Button type="primary" danger size="small">清理</Button>
        </Popconfirm>
      </StyledItem>
      <StyledItem>
        <span>cookie</span>
        <Popconfirm placement="topLeft" title={'您确定要清理？'} onConfirm={clearCookie} okText="Yes" cancelText="No">
          <Button type="primary" danger size="small">清理</Button>
        </Popconfirm>
      </StyledItem>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  padding: 10px;
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
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, .08);
  span {
    font-size: 14px;
  }
  &:nth-child(1) {
    margin-top: 0;
  }
`

export default ListPage