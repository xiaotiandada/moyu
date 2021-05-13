import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Slider, message, Space } from 'antd'
import { ptwxzDetail } from '../../api/index'

const ListPage: React.FC = () => {
  const [detail, setDetail] = useState<any>()
  const [fontSize, setFontSize] = useState<number>(1)
  let { id, page } = useParams<{ id: string, page: string }>();
  let history = useHistory();

  useEffect(() => {

    const fetch = async () => {
      const res: any = await ptwxzDetail({
        id: decodeURIComponent(id),
        page: decodeURIComponent(page)
      })
      console.log('res', res)
      if (res.code === 0) {
        setDetail(res.data)
      }
    }

    fetch()
  }, [id, page]);

  const prev = () => {
    if (detail?.prev.id) {
      history.push(`/${id}/${detail?.prev.id}`);
    } else {
      message.error('没有上一章')
    }
  }
  const next = () => {
    if (detail?.next.id) {
      history.push(`/${id}/${detail?.next.id}`);
    } else {
      message.error('没有下一章')
    }
  }

  const fontSizeStyle = useMemo(() => {
    let list: any = {
      0: '14px',
      1: '16px',
      2: '18px',
      3: '20px',
      4: '22px',
      5: '24px',
    }
    return list[fontSize] || '16px'
  }, [fontSize])

  const handleChange = (value: number) => {
    console.log('111', value)
    setFontSize(value)
  }

  return (
    <StyledWrapper>
      <StyledMd style={{ fontSize: fontSizeStyle }} dangerouslySetInnerHTML={{__html: detail?.content}}></StyledMd>
      <StyledFixed>
        <Space>
          <Button type="primary" onClick={prev}>{
            detail?.prev.id ? 'Prev' : 'Not'
          }</Button>
          <Button type="primary" onClick={next}>{
            detail?.next.id ? 'Next' : 'Not'
          }</Button>
        </Space>
        <StyledSlider>
          <Slider style={{ width: 160 }} defaultValue={fontSize} max={5} min={0} onChange={handleChange} />
        </StyledSlider>
      </StyledFixed>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin: 0;
`
const StyledMd = styled.div`
  margin: 0;
  padding: 10px 10px 64px 10px;
`
const StyledFixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #f1f1f1;
  box-sizing: border-box;
`
const StyledSlider = styled.div`
  display: flex;
  align-items: center;
`

export default ListPage