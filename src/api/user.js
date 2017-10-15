import fetch from '@/utils/fetch'

export function fetchList(query) {
  return fetch({
    url: '/users',
    method: 'get',
    params: query
  })
}

export function fetchInfo() {
  return fetch({
    url: '/users/info',
    method: 'get'
  })
}

export function createUser(data) {
  return fetch({
    url: '/users',
    method: 'post',
    data: data
  })
}

export function deleteUser(id) {
  return fetch({
    url: '/users/' + id,
    method: 'delete'
  })
}
