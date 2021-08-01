import { Controller } from 'egg';

export default class MdController extends Controller {
  public async index() {
    const { ctx } = this;
    const { content } = ctx.request.body
    console.log(ctx.request.body)
    ctx.body = await this.service.async.index({ content });
  }
}
