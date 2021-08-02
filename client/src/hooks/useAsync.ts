import React, { useEffect, useCallback } from 'react'
import { asyncSystemGet } from '../api/index'
import sotre from 'store'

export function useAsync() {

  const asyncConfig = useCallback(
    async () => {
      try {
        const res: any = await asyncSystemGet()
      if (res.code === 0) {

        const { history = [], fontSize = 1, owner } = res.data

        sotre.set('history', history)
        sotre.set('font-size', fontSize)
        sotre.set('owner', owner)
      }
      } catch (e) {
        console.log(e)
      }
    },
    [],
  )

  return {
    asyncConfig
  }
}