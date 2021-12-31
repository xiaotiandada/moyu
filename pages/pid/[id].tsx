import Layout from '../../components/Layout'
import { useRouter } from 'next/router'


export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return (
    <Layout>
      11111
      <p>Post: {id}</p>
    </Layout>
  )
}

