import fetch from 'utils/fetch'

export function verify ({idToken = '', accessToken = ''}) {
  return fetch({
    url: `/auth?ID-Token=${idToken}&Access-Token=${accessToken}`,
    method: 'get'
  })
}

export function getAccess (params = {scope: 'public_profile'}) {
  const data = {
    scope: params.scope
  }
  return fetch({
    url: `/auth`,
    method: 'post',
    data
  })
}
