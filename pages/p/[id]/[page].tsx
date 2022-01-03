import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Slider, message, Space, BackTop } from 'antd'
import store from 'store'
import LoadingSpin from '../../../components/LoadingSpin'
import { MenuOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { useRouter } from 'next/router'
const fontSizeStyle = '16px'

const ListPage: React.FC = () => {
  const [fontSize, setFontSize] = useState<number>(1)
  const [fontSizeVisable, setFontSizeVisable] = useState<Boolean>(false)

  const router = useRouter()
  const { id, page } = router.query

  // @ts-ignore
  const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/ptwxz/get?id=${decodeURIComponent(id as string)}&page=${decodeURIComponent(page as string)}`, fetcher)
  if (error) return <div>failed to load</div>
  if (!data) return <LoadingSpin></LoadingSpin>
  const { data: detail } = data

  let historyStore = store.get('history') || []
  let bookData = {
    title: detail.title,
    subtitle: detail.subtitle,
    id: detail.id,
    page: detail.page,
  }

  let idx  = historyStore.findIndex((i: any) => decodeURIComponent(i.id) === decodeURIComponent(id as string))
  if (~idx) {
    console.log('已存在')
    historyStore[idx] = bookData
  } else {
    historyStore.push(bookData)
  }

  store.set('history', historyStore)

  const prev = () => {
    if (detail?.prev.id) {
      router.push(`/p/${encodeURIComponent(id as string)}/${encodeURIComponent(detail?.prev.id as string)}`)
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
          <Button onClick={prev}>{
            detail?.prev.id ? 'Prev' : 'Not'
          }</Button>
          <Button onClick={next}>{
            detail?.next.id ? 'Next' : 'Not'
          }</Button>
        </Space>
        <Space>
          <Button onClick={() => router.push(`/${encodeURIComponent(id as string)}`)}>
            <MenuOutlined />
          </Button>
          <Button onClick={() => setFontSizeVisable(!fontSizeVisable)}>A</Button>
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
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #f1f1f1;
  box-sizing: border-box;
`
const StyledSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  padding: 4px 20px;
`

export default ListPage