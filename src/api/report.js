import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/reports',
    method: 'get',
    params: query
  })
}
