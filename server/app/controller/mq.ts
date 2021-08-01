import { Controller } from 'egg';

export default class MdController extends Controller {
  public async producer() {
    const { ctx } = this;
    ctx.body = await this.service.mq.producer();
  }
  public async buy() {
    const { ctx } = this;
    ctx.body = await this.service.mq.buy();
  }
}
