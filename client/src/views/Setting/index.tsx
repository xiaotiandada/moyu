import React, { useState, useEffect } from 'react'
import store from 'store'
import styled from 'styled-components'
import Footer from '../../components/Footer'
import { Button, message, Input } from 'antd';
import { clearAllCookie } from '../../utils/cookie'
import { asyncSystem } from '../../api/index'
import { asyncSystemContent } from '../../utils/index'

const ListPage: React.FC = () => {

  const [isLoggin, setIsLoggin] = useState<boolean>(false)
  const [githubToken, setGithubToken] = useState<string>('')

  useEffect(() => {
    checkGithubToken()
  }, []);

  const clearCookie = () => {
    clearAllCookie()
    message.success('success')
  }

  const clearLocalStore = () => {
    store.clearAll()
    message.success('success')
  }

  const checkGithubToken = () => {
    let githubToken = store.get('github-token') || ''
    if (githubToken) {
      setGithubToken(githubToken)
      setIsLoggin(true)
    }
  }

  /**
   * Github 登录
   */
  const handleGithubLogin = (token: string) => {
    store.set('github-token', token)
  }
  const handleGithubSignout = () => {
    store.remove('github-token')
    setGithubToken('')
  }

  /**
   * 同步系统配置和历史记录
   */
  const handleAsyncSystem = async () => {
    let data = asyncSystemContent()

    try {
      const res: any = await asyncSystem(data)
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
        <Input placeholder="github token" value={ githubToken } onChange={ (e) => setGithubToken(e.target.value) } />
        {
          isLoggin ?
          <Button type="primary" size="small" onClick={handleGithubSignout}>登出</Button> :
          <Button type="primary" size="small" onClick={() => handleGithubLogin(githubToken)}>登录</Button>
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

export default ListPage