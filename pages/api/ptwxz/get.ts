import { NextApiRequest, NextApiResponse } from 'next'
import * as iconv from 'iconv-lite'
import * as cheerio from 'cheerio'
import { fetchPage } from './fetch'
import { PTWXZ_API } from '../../../config'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (_req.method !== 'GET') {
    return res.status(500).json({ code: 500, message: 'only allow GET' })
  }
  
  const { id, page } = _req.query

  if (!id || !page) {
    return res.status(500).json({
      code: 500,
      message: 'id or page is empty!',
    })
  }

  try {
    const result: any = await fetchPage(`${PTWXZ_API}/html/${id}/${page}.html`)
    if (result.status !== 200) {
      throw new Error('status is not 200')
    }
    const r = iconv.decode(result.data, 'gb2312')
    const $ = cheerio.load(r)

    const firstPrev = $('.bottomlink a').first().attr('href') || ''
    const firstNext = $('.bottomlink a').last().attr('href') || ''

    const firstPrevId = firstPrev === 'index.html' ? '' : firstPrev.replace('.html', '')
    const firstNextId = firstNext === 'index.html' ? '' : firstNext.replace('.html', '')

    $('#guild').remove()
    $('#shop').remove()
    $('.toplink').remove()
    $('.bottomlink').remove()
    $('#Commenddiv').remove()
    $('#feit2').remove()
    $('#feit2').remove()
    $('div[align=center]').remove()
    $('table[align=center]').remove()
    $('script').remove()

    const metaObj:any = {}
    $('head meta').each((_, el: any) => {
      const name = $(el).attr('name') || ''
      const content = $(el).attr('content') || ''
      if (name && content) {
        metaObj[name] = content
      }
    })

    res.status(200).json({
      code: 0,
      data: {
        title: metaObj.keywords || '',
        subtitle: $('body h1').text(),
        content: $('body').html(),
        id,
        page,
        prev: {
          id: firstPrevId,
          text: $('.bottomlink a').first().text(),
        },
        next: {
          id: firstNextId,
          text: $('.bottomlink a').last().text(),
        },
      },
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
