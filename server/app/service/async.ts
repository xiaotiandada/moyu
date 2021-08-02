import { Service } from 'egg';
import { Octokit } from '@octokit/rest';

export default class Test extends Service {

  public async update({ content }: { content: any }) {

    const token = this.ctx.header['github-token']
    const gistId = 'c16c52ec1a95ce5e8c73885b5c6687ff'

    const octokit = new Octokit({
      auth: token,
    });

    try {
      const { status, data } = await octokit.rest.gists.get({
        gist_id: gistId,
      });

      this.ctx.logger.info(`data: ${data}`)

      if (status !== 200) {
        throw new Error('status !== 200')
      }

      const { status: statusUpdate, data: dataUpdate } = await octokit.rest.gists.update({
        gist_id: gistId,
        files: {
          'system.json': {
            content: JSON.stringify(content)
          }
        }
      });

      this.ctx.logger.info(`data: ${dataUpdate}`)

      if (statusUpdate !== 200) {
        throw new Error('statusUpdate !== 200')
      }

      return {
        code: 0,
        message: 'success'
      }
    } catch (e) {
      console.log('e', e)
      return {
        code: -1,
        message: e.toString()
      }
    }
  }

  public async get() {

    const token = this.ctx.header['github-token']
    const gistId = 'c16c52ec1a95ce5e8c73885b5c6687ff'

    const octokit = new Octokit({
      auth: token,
    });

    try {
      const { status, data } = await octokit.rest.gists.get({
        gist_id: gistId,
      });

      this.ctx.logger.info(`data: ${data}`)

      if (status !== 200) {
        throw new Error('status !== 200')
      }

      let content = {} as any
      if (data.files!['system.json']) {
        content = data.files!['system.json'].content
      }

      console.log('data', data)

      return {
        code: 0,
        message: 'success',
        data: {
          ...JSON.parse(content),
          owner: data.owner
        }
      }
    } catch (e) {
      console.log('e', e)
      return {
        code: -1,
        message: e.toString()
      }
    }
  }
}
