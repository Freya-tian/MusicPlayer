const AUTH_KEY = 'MusicApp-auth-key'

export function getToken() {
  return localStorage.getItem(AUTH_KEY)
}

export function setToken(token:string) {
  return localStorage.setItem(AUTH_KEY, token)
}

export function removeToken() {
  return localStorage.removeItem(AUTH_KEY)
}

