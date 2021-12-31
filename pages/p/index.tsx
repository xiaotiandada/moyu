import { useEffect, useState } from "react";
import Link from 'next/link'
import Layout from '../../components/Layout'
import Image from 'next/image'
import Head from 'next/head'
import cn from 'classnames'
import stylesP from '../../styles/p.module.css'
import stylesPP from '../../styles/pp.module.scss'

import { getSortedPostsData } from '../../lib/posts'


const PPage = (props: any) => {
  const [ type, setType ] = useState<string>('success')
  const allPostsData = props.allPostsData
  const List = props.data

  useEffect(() => {
    console.log('1111', props)
  }, [])

  return (
    <Layout title="P | Next.js + TypeScript Example">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <style jsx>{`
        p {
          color: red;
        }
      `}</style>
  
      <h1>PPPPP</h1>
      <p>This is the PPPPP page</p>
      <p>
        <Link href="/">
          <a className={stylesP.link} target="_blank">Go home</a>
        </Link>
        <a href="/">Go home</a>
        <a href="/" className={ stylesPP.green }>Go home
          <span>pppppp</span>
          </a>
      </p>
      <div
      className={cn({
        [stylesP.success]: type === 'success',
        [stylesP.error]: type === 'error'
      })}>
        hello
      </div>
      <button onClick={ () => setType('success') }>success</button>
      <button onClick={ () => setType('error') }>error</button>
      <Image
        src="/images/logo512.png"
        alt="Your Name"
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
      />
      <img src="/images/logo512.png" alt="Your Name"/>
       {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section >
        <h2 >Blog</h2>
        <ul >
          {allPostsData.map(({ id, date, title }: any) => (
            <li key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <hr/>
      <ul>
        {
          List.map((i: any, idx: number) => (
            <li key={ idx }>{ i.title }</li>
          ))
        }
      </ul>
    </Layout>
  )
  
}
export default PPage

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = [
    {
      id: 0,
      title: '1111111'
    },
    {
      id: 0,
      title: '222222'
    },
    {
      id: 0,
      title: '33333'
    },
    {
      id: 0,
      title: '44444444444'
    }
  ]

  const allPostsData = getSortedPostsData()

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: {
      data: data,
      allPostsData,
    }
  }
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = [
//     {
//       id: 0,
//       title: '等等等等等等'
//     },
//     {
//       id: 0,
//       title: '啊啊啊啊啊'
//     },
//     {
//       id: 0,
//       title: '发反反复复'
//     },
//     {
//       id: 0,
//       title: '哥哥哥哥哥哥'
//     }
//   ]
//   const allPostsData = getSortedPostsData()

//   // Pass data to the page via props
//   return { props: {
//     data: res,
//     allPostsData
//   } }
// }