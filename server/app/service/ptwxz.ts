import { Service } from 'egg';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as tunnel from 'tunnel';
import * as iconv from 'iconv-lite';

/**
 * Test Service
 */
export default class Test extends Service {

  private async fetchPage(url: string) {
    try {
      const configProxyFn = () => {
        const agent = tunnel.httpsOverHttp({
          proxy: {
            host: '127.0.0.1',
            port: 7890,
          },
        });

        return {
          httpsAgent: agent,
          proxy: false,
        };
      };
      const configProxy = configProxyFn();
      const axiosConfig: any = Object.assign({
        url,
        method: 'get',
        responseType: 'arraybuffer',
      }, {
        httpsAgent: configProxy.httpsAgent,
        proxy: configProxy.proxy,
      });
      return await axios(axiosConfig);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async index() {
    try {
      const res: any = await this.fetchPage('https://www.ptwxz.com');
      if (res.status !== 200) {
        throw new Error('status is not 200');
      }
      const r = iconv.decode(res.data, 'gb2312');
      const $ = cheerio.load(r);

      const matchStr = (str, left, right) => {
        const pattern = new RegExp(`(?<=${left}).*?(?=${right})`);
        return str.match(pattern);
      };

      const rightAllDom = $('#right .ultop').slice(0, 1);
      const data: {}[] = [];
      rightAllDom.each((_, el) => {
        $(el).find('li').each((_, elem) => {
          const id = $(elem).find('a').attr('href');
          const idContent = matchStr(id, '/bookinfo/', '.html');
          data.push({
            id: idContent && idContent.length ? idContent[0] : '',
            href: $(elem).find('a').attr('href'),
            name: $(elem).text(),
          });
        });
      });
      console.log('data', data);

      return {
        code: 0,
        data,
      };
    } catch (e) {
      console.error(e);
      return {
        code: -1,
        message: e.toString(),
      };
    }
  }
  public async get({
    id,
    page,
  }) {
    console.log('id', id, page);
    try {
      const res: any = await this.fetchPage(`https://www.ptwxz.com/html/${id}/${page}.html`);
      if (res.status !== 200) {
        throw new Error('status is not 200');
      }
      const r = iconv.decode(res.data, 'gb2312');
      const $ = cheerio.load(r);

      const firstPrev = $('.bottomlink a').first().attr('href') || '';
      const firstNext = $('.bottomlink a').last().attr('href') || '';

      const firstPrevId = firstPrev === 'index.html' ? '' : firstPrev.replace('.html', '');
      const firstNextId = firstNext === 'index.html' ? '' : firstNext.replace('.html', '');

      $('#guild').remove();
      $('#shop').remove();
      $('.toplink').remove();
      // $('.bottomlink').remove();
      $('#Commenddiv').remove();
      $('#feit2').remove();

      return {
        code: 0,
        data: {
          content: $('body').html(),
          prev: {
            id: firstPrevId,
            text: $('.bottomlink a').first().text(),
          },
          next: {
            id: firstNextId,
            text: $('.bottomlink a').last().text(),
          },
        },
      };
    } catch (e) {
      console.error(e);
      return {
        code: -1,
        message: e.toString(),
      };
    }
  }
}
