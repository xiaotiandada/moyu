import React from 'react'
import { Typography, Space } from 'antd'
import { FrownOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Text } = Typography

const ErrorTip: React.FC = () => {
  return (
    <StyledWrapper>
      <Space>
        <FrownOutlined />
        <Text>failed to load</Text>
      </Space>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`

export default ErrorTip