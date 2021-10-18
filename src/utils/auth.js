import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserIDKey = 'User-ID'
const UserName = 'User-Name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserId(user_id) {
  return Cookies.set(UserIDKey, user_id)
}

export function getUserId() {
  return Cookies.get(UserIDKey)
}

export function setUserName(user_name) {
  return Cookies.set(UserName, user_name)
}

export function getUserName() {
  return Cookies.get(UserName)
}
