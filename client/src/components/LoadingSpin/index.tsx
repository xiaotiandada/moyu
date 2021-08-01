import React from 'react';
import { Spin } from 'antd'
import styled from 'styled-components'

const LoadingSpin: React.FC = () => {
  return (
    <StyledLoading>
      <Spin></Spin>
    </StyledLoading>
  )
}

const StyledLoading = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default LoadingSpin