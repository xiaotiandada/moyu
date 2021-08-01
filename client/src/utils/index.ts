import store from 'store'

/**
 * 需要同步的信息
 * @returns 
 */
export const asyncSystemContent = () => {
  let historyStore = store.get('history') || []
  let fontSize = store.get('font-size') || 1

  return {
    content: {
      history: historyStore,
      fontSize: fontSize
    }
  }
}