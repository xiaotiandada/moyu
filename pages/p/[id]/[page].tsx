import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { Button, Slider, message, Space, BackTop } from 'antd'
import store from 'store'
import LoadingSpin from '../../../components/LoadingSpin'
import { MenuOutlined, HomeOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { fetcher } from '../../../utils'
import ErrorTip from '../../../components/ErrorTip'
import { HistoryData, Response } from '../../../typings'
import type { PostData } from '../../../typings'

const ListPage: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(1)
  const [fontSizeVisable, setFontSizeVisable] = useState<Boolean>(false)
  const router = useRouter()
  const id = router.query.id as string
  const page = router.query.page as string

  const fontSizeStyle = useMemo(() => {
    const list: { [key: number]: string } = {
      0: '14px',
      1: '16px',
      2: '18px',
      3: '20px',
      4: '22px',
      5: '24px',
    }
    return list[fontSize] || '16px'
  }, [fontSize])

  useEffect(() => {
    const val = store.get('font-size') || 1
    setFontSize(Number(val))
  }, [])

  const { data, error } = useSWR<Response<PostData>>(`/api/ptwxz/get?id=${decodeURIComponent(id)}&page=${decodeURIComponent(page)}`, fetcher)
  if (error) return <ErrorTip></ErrorTip>
  if (!data) return <LoadingSpin></LoadingSpin>
  const { data: detail } = data

  let historyStore: HistoryData[] = store.get('history') || []
  let bookData = {
    title: detail.title,
    subtitle: detail.subtitle,
    id: detail.id,
    page: detail.page,
  }

  let idx  = historyStore.findIndex((i) => decodeURIComponent(i.id) === decodeURIComponent(id))
  if (~idx) {
    historyStore[idx] = bookData
  } else {
    historyStore.push(bookData)
  }

  store.set('history', historyStore)

  const prev = () => {
    if (detail?.prev.id) {
      router.push(`/p/${encodeURIComponent(id)}/${encodeURIComponent(detail?.prev.id)}`)
    } else {
      message.error('没有上一章')
    }
  }
  const next = () => {
    if (detail?.next.id) {
      router.push(`/p/${encodeURIComponent(id as string)}/${encodeURIComponent(detail?.next.id as string)}`)
    } else {
      message.error('没有下一章')
    }
  }


  const handleChange = (value: number) => {
    store.set('font-size', value)
    setFontSize(value)
  }

  return (
    <StyledWrapper>
      <StyledMd style={{ fontSize: fontSizeStyle }} dangerouslySetInnerHTML={{ __html: detail?.content }}></StyledMd>
      <StyledFixed>
        <Space>
          <Button onClick={prev} size='small'>{
            detail?.prev.id ? 'Prev' : 'Not'
          }</Button>
          <Button onClick={next} size='small'>{
            detail?.next.id ? 'Next' : 'Not'
          }</Button>
        </Space>
        <Space>
          <Button onClick={() => router.push('/')} size='small'>
            <HomeOutlined />
          </Button>
          <Button onClick={() => router.push(`/${encodeURIComponent(id as string)}`)} size='small'>
            <MenuOutlined />
          </Button>
          <Button onClick={() => setFontSizeVisable(!fontSizeVisable)} size='small'>A</Button>
        </Space>
        {
          fontSizeVisable ? <StyledSlider>
            <Slider style={{ width: 180 }} defaultValue={fontSize} max={5} min={0} onChange={handleChange} />
            <span>{fontSizeStyle}</span>
          </StyledSlider> : null
        }
      </StyledFixed>
      <BackTop />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  margin: 20px 0;
`
const StyledMd = styled.div`
  margin: 0;
  padding: 10px 10px 64px 10px;
  max-width: 880px;
  margin: 0 auto;
  h1 {
    text-align: center;
  }
`
const StyledFixed = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px;
  border-top: 1px solid #f1f1f1;
  box-sizing: border-box;
  .ant-btn-sm {
    font-size: 12px;
  }
`
const StyledSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 40px;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  padding: 4px 20px;
`

export default ListPage