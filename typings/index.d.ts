export interface Response<T> {
  code: number
  data: T
  message: string
}

export type ListData = {
  id: string
  href: string
  name: string
}

export type PostData = {
  title: string
  subtitle: string
  content: string
  id: string,
  page: string,
  prev: {
    id: string
    text: string
  },
  next: {
    id: string
    text: string
  },
}

export type HistoryData = {
  title: string
  subtitle: string
  id: string
  page: string
}