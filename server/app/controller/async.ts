import { Controller } from 'egg';

export default class MdController extends Controller {
  public async update() {
    const { ctx } = this;
    const { content } = ctx.request.body
    ctx.body = await this.service.async.update({ content });
  }
  public async get() {
    const { ctx } = this;
    ctx.body = await this.service.async.get();
  }
}
