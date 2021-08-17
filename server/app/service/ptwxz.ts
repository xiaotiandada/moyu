import { Service } from 'egg';
import * as cheerio from 'cheerio';
import axios from 'axios';
import * as tunnel from 'tunnel';
import * as iconv from 'iconv-lite';
import { isEmpty } from 'lodash';

/**
 * Test Service
 */
export default class Test extends Service {

  private async fetchPage(url: string) {
    try {
      console.log('env', this.app.env);
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
      if (this.app.env === 'local') {
        return await axios(axiosConfig);
      }
      return await axios({
        url,
        method: 'get',
        responseType: 'arraybuffer',
      });

    } catch (e) {
      console.error(e);
      return false;
    }
  }
  public async index() {
    try {
      const res: any = await this.fetchPage(this.config.urlList.ptwxz);
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
  public async list({ id }) {
    try {
      const res: any = await this.fetchPage(`${this.config.urlList.ptwxz}/html/${id}`);
      if (res.status !== 200) {
        throw new Error('status is not 200');
      }
      const r = iconv.decode(res.data, 'gb2312');
      const $ = cheerio.load(r);

      const listData: { id: string, href: string, name: string }[] = [];
      $('ul li').each((_, el) => {
        // console.log('el', $(el).text());
        const name = $(el).text();
        const href = $(el).find('a').attr('href') || '';
        if (!isEmpty(href) || !isEmpty(name.trim())) {
          listData.push({
            id: href.replace('.html', ''),
            href,
            name: name.trim(),
          });
        }
      });

      return {
        code: 0,
        data: listData,
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
      const res: any = await this.fetchPage(`${this.config.urlList.ptwxz}/html/${id}/${page}.html`);
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
      $('.bottomlink').remove();
      $('#Commenddiv').remove();
      $('#feit2').remove();
      $('#feit2').remove();
      $('div[align=center]').remove();
      $('table[align=center]').remove();
      $('script').remove();

      const metaObj:any = {};
      $('head meta').each((_, el: any) => {
        const name = $(el).attr('name') || '';
        const content = $(el).attr('content') || '';
        if (name && content) {
          metaObj[name] = content;
        }
      });

      return {
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
