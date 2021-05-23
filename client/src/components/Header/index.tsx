import React from 'react';
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Dropdown, message } from 'antd';
import { ptwxzDetail } from '../../api/index'
import store from 'store'
import { MenuOutlined, HomeOutlined } from '@ant-design/icons'

const Header: React.FC = () => {
  let { id, page } = useParams<{ id: string, page: string }>();

  const onClick: any = async ({ key }: { key: string }) => {
    if (key === 'add') {

      console.log('id', id, page)
      if (!id && !page) {
        message.warning('请在小说内使用')
        return
      }

      const res: any = await ptwxzDetail({
        id: decodeURIComponent(id),
        page: decodeURIComponent(page)
      })
      console.log('res', res)
      if (res.code === 0) {

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
      }
    } else if (key === 'github') {
      window.open('https://github.com/xiaotiandada/moyu')
    }
  };

  const menu = () => (
    <Menu onClick={onClick}>
      <Menu.Item key="add">
        加入书架
      </Menu.Item>
      <Menu.Item key="github">
        Github
      </Menu.Item>
    </Menu>
  )

  return (
    <StyledWrapper>
      <Link to={'/'}>
        <HomeOutlined />
      </Link>
      <Dropdown overlay={menu}>
        <StyledMore>
          <MenuOutlined />
        </StyledMore>
      </Dropdown>

    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid #f1f1f1;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-sizing: border-box;
  height: 40px;
  a {
    font-size: 14px;
    color: #333;
  }
`

const StyledMore = styled.div``
export default Header