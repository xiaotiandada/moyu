import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Button, message, Card } from 'antd'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import { matchStr } from '../../utils/reg'

const CustomPage: React.FC = () => {
  const router = useRouter()

  const [customUrl, setCustomUrl] = useState('')

  const jump = () => {

    if (isEmpty(customUrl)) {
      message.warning('please input url')
      return
    }

    const resultArr = matchStr(customUrl, 'https://www.ptwxz.com/html/', '.html')
    const result = resultArr ? resultArr[0].split('/'): ''

    if (!result) {
      message.warning('url format error')
      return
    }

    const id = `${result[0]}/${result[1]}`
    const page = `${result[2]}`

    if (isEmpty(id) || isEmpty(page)) {
      message.warning('id or page empty')
      return
    }
    router.push(`/p/${encodeURIComponent(id)}/${encodeURIComponent(page)}`)
  }

  return (
    <StyledWrapper>
      <Card style={{ marginTop: 20 }}>
        <StyledWrapperItem>
          <Input placeholder="Please input url" onChange={e => setCustomUrl(e.target.value)} />
        </StyledWrapperItem>
        <Button onClick={jump} style={{width: '100%'}}>跳转</Button>
      </Card>
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