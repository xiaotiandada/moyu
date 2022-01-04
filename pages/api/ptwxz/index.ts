import { NextApiRequest, NextApiResponse } from 'next'
import * as cheerio from 'cheerio'
import * as iconv from 'iconv-lite'
import { fetchPage } from './fetch'
import { PTWXZ_API } from '../../../config'
import { ListData } from '../../../typings'


const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method === 'POST') {
    // Process a POST request
  } else if (_req.method === 'GET') {
    //
  } else {
    // Handle any other HTTP method
  }

  if (_req.method !== 'GET') {
    return res.status(500).json({ code: 500, message: 'only allow GET' })
  }

  try {
    const result: any = await fetchPage(PTWXZ_API)
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
    const data: ListData[] = []
    rightAllDom.each((_, el) => {
      $(el).find('li').each((_, elem) => {
        const id = $(elem).find('a').attr('href')
        if (id) {
          const idContent = matchStr(id, '/bookinfo/', '.html')
          data.push({
            id: idContent && idContent.length ? idContent[0] : '',
            href: $(elem).find('a').attr('href') || '',
            name: $(elem).text(),
          })
        }
      })
    })
    console.log('data', data)
    res.status(200).json({ code: 0, data, message: 'success' })

  } catch (e: any) {
    console.error(e)
    res.status(500).json({ code: 500, message: e.toString() })
  }
}

export default handler
