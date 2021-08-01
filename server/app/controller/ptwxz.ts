import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const ctx = this.ctx;
    ctx.body = await this.service.ptwxz.index();
  }
  public async list() {
    const ctx = this.ctx;
    const { id } = ctx.query;
    ctx.body = await this.service.ptwxz.list({ id });
  }
  public async get() {
    const ctx = this.ctx;
    const { id, page } = ctx.query;
    ctx.body = await this.service.ptwxz.get({
      id,
      page,
    });
  }
}
