import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import axios from 'axios'
import * as tunnel from 'tunnel'
import * as iconv from 'iconv-lite'
import { isEmpty } from 'lodash'

const fetchPage = async (url: string) => {
  try {
    const configProxyFn = () => {
      const agent = tunnel.httpsOverHttp({
        proxy: {
          host: '127.0.0.1',
          port: 7890,
        },
      })

      return {
        httpsAgent: agent,
        proxy: false,
      }
    }
    const configProxy = configProxyFn()
    const axiosConfig: any = Object.assign({
      url,
      method: 'get',
      responseType: 'arraybuffer',
    }, {
      httpsAgent: configProxy.httpsAgent,
      proxy: configProxy.proxy,
    })
    if (process.env.NODE_ENV !== 'production') {
      return await axios(axiosConfig)
    }
    return await axios({
      url,
      method: 'get',
      responseType: 'arraybuffer',
    })

  } catch (e) {
    console.error(e)
    return false
  }
}

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === 'POST') {
    // Process a POST request
  } else if (_req.method === 'GET') {

    try {
      const result: any = await fetchPage('https://www.ptwxz.com')
      console.log('res', res)
      if (result.status !== 200) {
        throw new Error('status is not 200')
      }
      const r = iconv.decode(result.data, 'gb2312')
      const $ = cheerio.load(r)

      const matchStr = (str: string, left: string, right: string) => {
        const pattern = new RegExp(`(?<=${left}).*?(?=${right})`)
        return str.match(pattern)
      }

      const rightAllDom = $('#right .ultop').slice(0, 1)
      const data: {}[] = []
      rightAllDom.each((_, el) => {
        $(el).find('li').each((_, elem) => {
          const id = $(elem).find('a').attr('href')
          if (id) {
            const idContent = matchStr(id, '/bookinfo/', '.html')
            data.push({
              id: idContent && idContent.length ? idContent[0] : '',
              href: $(elem).find('a').attr('href'),
              name: $(elem).text(),
            })
          }
        })
      })
      console.log('data', data)
      res.status(200).json({ code: 0, data })

    } catch (e: any) {
      console.error(e)
      res.status(200).json({ code: 400, message: e.toString() })
    }

  } else {
    // Handle any other HTTP method
  }
}

export default handler
