import { NextApiRequest, NextApiResponse } from 'next'
import { PTWXZ_API } from '../../../config'
import { fetchPage } from './fetch'
import * as iconv from 'iconv-lite'
import * as cheerio from 'cheerio'
import { isEmpty } from 'lodash'
import { ListData } from '../../../typings'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method !== 'GET') {
    return res.status(500).json({ code: 500, message: 'only allow GET' })
  }
  
  const { id } = _req.query

  if (!id) {
    return res.status(500).json({
      code: 500,
      message: 'id is empty!',
    })
  }

  try {
    const result: any = await fetchPage(`${PTWXZ_API}/html/${id}`)
    if (result.status !== 200) {
      throw new Error('status is not 200')
    }
    const r = iconv.decode(result.data, 'gb2312')
    const $ = cheerio.load(r)

    const listData: ListData[] = []
    $('ul li').each((_, el) => {
      // console.log('el', $(el).text());
      const name = $(el).text()
      const href = $(el).find('a').attr('href') || ''
      if (!isEmpty(href) || !isEmpty(name.trim())) {
        listData.push({
          id: href.replace('.html', ''),
          href,
          name: name.trim(),
        })
      }
    })

    res.status(500).json({
      code: 0,
      data: listData,
      message: 'success'
    })
  } catch (e: any) {
    console.error(e)

    res.status(500).json({
      code: -1,
      message: e.toString(),
    })
  }
}

export default handler
