import React, { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { Button, Slider, message, Space, BackTop, Spin } from 'antd'
import { ptwxzDetail } from '../../api/index'
import store from 'store'
import LoadingSpin from '../../components/LoadingSpin'
import { asyncSystemContent } from '../../utils/index'
import { asyncSystemUpdate } from '../../api/index'

const ListPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>()
  const [fontSize, setFontSize] = useState<number>(1)
  const [fontSizeVisable, setFontSizeVisable] = useState<Boolean>(false)
  let { id, page } = useParams<{ id: string, page: string }>();
  let history = useHistory();

  useEffect(() => {

    /**
     * fetch
     */
    const fetch = async () => {

      setLoading(true)

      const res: any = await ptwxzDetail({
        id: decodeURIComponent(id),
        page: decodeURIComponent(page)
      })
      console.log('res', res)
      if (res.code === 0) {
        setDetail(res.data)

        let historyStore = store.get('history') || []
        let data = {
          title: res.data.title,
          subtitle: res.data.subtitle,
          id: res.data.id,
          page: res.data.page,
        }

        let idx  = historyStore.findIndex((i: any) => decodeURIComponent(i.id) === decodeURIComponent(id))
        if (~idx) {
          console.log('已存在')
          historyStore[idx] = data
        } else {
          historyStore.push(data)
        }

        store.set('history', historyStore)

        setLoading(false)

        handleAsyncSystem()
      }
    }

    /**
     * 同步字体设置
     */
    const asyncFontSize = () => {
      let fontSize = store.get('font-size') || 1
      setFontSize(fontSize)
    }

    fetch()
    asyncFontSize()
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

  /**
   * 同步系统配置和历史记录
   */
  const handleAsyncSystem = async () => {
    let data = asyncSystemContent()

    try {
      const res: any = await asyncSystemUpdate(data)
      if (res.code === 0) {
        console.log('同步成功')
      } else {
        console.log('同步失败')
      }
    } catch (e) {
      console.log(e)
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
    store.set('font-size', value)
    setFontSize(value)
  }

  return (
    <StyledWrapper>
      {
        loading ?
        <LoadingSpin></LoadingSpin> :
        <StyledMd style={{ fontSize: fontSizeStyle }} dangerouslySetInnerHTML={{ __html: detail?.content }}></StyledMd>
      }
      <StyledFixed>
        <Space>
          <Button onClick={prev} loading={ loading }>{
            detail?.prev.id ? 'Prev' : 'Not'
          }</Button>
          <Button onClick={next} loading={ loading }>{
            detail?.next.id ? 'Next' : 'Not'
          }</Button>
        </Space>
        <Space>
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