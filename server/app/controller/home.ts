import { Controller } from 'egg';
import * as jwt from 'jwt-simple';
import * as ms from 'ms';

export default class HomeController extends Controller {
  public async index(): Promise<any> {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  public async add() {
    const ctx = this.ctx;
    let count: any = ctx.cookies.get('count');
    console.log('count', count);
    console.log('token', ctx.cookies.get('access-token'));

    count = count ? Number(count) : 0;
    const countCookie: any = ++count;
    ctx.cookies.set('count', countCookie, {
      sameSite: 'none',
      maxAge: ms('7d'),
    });
    ctx.body = count;
  }
  public async remove() {
    const ctx = this.ctx;
    ctx.cookies.set('count', null);
    ctx.status = 204;
  }
  public async fetchPosts() {
    const ctx = this.ctx;
    // 获取 Session 上的内容
    console.log('ctx.session', ctx.session);

    const userId = 1;
    const posts = `userId: ${userId}`;
    // 修改 Session 的值
    ctx.session.visited = ctx.session.visited ? (ctx.session.visited + 1) : 1;
    ctx.body = {
      success: true,
      posts,
    };
  }
  public async signIn() {
    const { ctx } = this;
    const { account, password } = ctx.request.body;
    const payload = {
      account,
      password,
    };
    const secret = 'xxx';
    const token = jwt.encode(payload, secret);
    ctx.cookies.set('access-token', token, {
      sameSite: 'none',
      maxAge: ms('7d'),
    });
    ctx.body = {
      data: token,
    };
  }
}
