import React, { useState, useEffect } from 'react'
import store from 'store'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import { Button, message, Input, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { clearAllCookie } from '../../utils/cookie'
import { asyncSystemUpdate } from '../../api/index'
import { asyncSystemContent } from '../../utils/index'
import { isEmpty } from 'lodash'
import { useAsync } from '../../hooks/useAsync'

const ListPage: React.FC = () => {

  const [githubToken, setGithubToken] = useState<string>('')
  const [ownerUser, setOwnerUser] = useState<any>({})

  const { asyncConfig } = useAsync()

  useEffect(() => {
    checkGithubToken()
  }, []);

  /**
   * 清除所有 cookie
   */
  const clearCookie = () => {
    clearAllCookie()
    message.success('success')
  }

  /**
   * 清除 localstore
   */
  const clearLocalStore = () => {
    store.clearAll()
    message.success('success')
  }

  /**
   * 检查 GitHub token
   */
  const checkGithubToken = () => {
    let githubToken = store.get('github-token') || ''
    let owner = store.get('owner') || {}
    if (githubToken) {
      setGithubToken(githubToken)
      setOwnerUser(owner)
    }
  }

  /**
   * Github 登录
   */
  const handleGithubLogin = async (token: string) => {
    store.set('github-token', token)
    await asyncConfig()
    await checkGithubToken()
  }

  /**
   * Github 登出
   */
  const handleGithubSignout = () => {
    store.remove('github-token')
    store.remove('owner')
    setGithubToken('')
    setOwnerUser({})
  }

  /**
   * 同步系统配置和历史记录
   */
  const handleAsyncSystem = async () => {
    let data = asyncSystemContent()

    try {
      const res: any = await asyncSystemUpdate(data)
      if (res.code === 0) {
        message.success('同步成功')
      } else {
        message.error('同步失败')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <StyledWrapper>
      <StyledUser>
        { 
          isEmpty(ownerUser) ?
          <>
            <StyledUserInfo>
              <Input placeholder="github token" value={ githubToken } onChange={ (e) => setGithubToken(e.target.value) } />
            </StyledUserInfo>
            <Button type="primary" size="small" onClick={() => handleGithubLogin(githubToken)}>登录</Button>
          </>:
          <>
            <StyledUserInfo>
              <Space>
                <Avatar size={40} icon={<UserOutlined />} src={ownerUser.avatar_url} />
                <span>{ ownerUser.login }</span>
              </Space>
            </StyledUserInfo>
            <Button type="primary" size="small" onClick={handleGithubSignout}>登出</Button>
          </>
        }
      </StyledUser>

      <StyledItem>
        <span>localStorage</span>
        <Button type="primary" danger size="small" onClick={clearLocalStore}>清理</Button>
      </StyledItem>
      <StyledItem>
        <span>cookie</span>
        <Button type="primary" danger size="small" onClick={clearCookie}>清理</Button>
      </StyledItem>
      <StyledItem>
        <span>同步历史记录和系统配置信息</span>
        <Button type="primary" size="small" onClick={handleAsyncSystem}>同步</Button>
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
const StyledUser = styled.div`
  background-color: #fff;
  padding: 16px 10px;
  margin: 10px 0;
  border: 1px solid rgba(247,247,247);
`

const StyledUserInfo = styled.div`
  margin-bottom: 20px;
`

export default ListPage