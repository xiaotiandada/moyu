import * as tunnel from 'tunnel'
import axios from 'axios'

export const fetchPage = async (url: string) => {
  try {
    const configProxyFn = () => {
      const agent = tunnel.httpsOverHttp({
        proxy: {
          host: '127.0.0.1',
          port: 7890,
        },
      })

      return {
        httpsAgent: agent,
        proxy: false,
      }
    }
    const configProxy = configProxyFn()
    const axiosConfig: any = Object.assign({
      url,
      method: 'get',
      responseType: 'arraybuffer',
    }, {
      httpsAgent: configProxy.httpsAgent,
      proxy: configProxy.proxy,
    })
    if (process.env.NODE_ENV !== 'production') {
      return await axios(axiosConfig)
    }
    return await axios({
      url,
      method: 'get',
      responseType: 'arraybuffer',
    })

  } catch (e) {
    console.error(e)
    return false
  }
}