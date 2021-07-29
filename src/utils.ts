export enum Headers {
  gcdnCache = 'gcdn-cache',
  setCookie = 'set-cookie',
  contentType = 'content-type',
  cacheControl = 'cache-control',
  date = 'date',
  age = 'age',
  xCache = 'x-cache',
  authorization = 'authorization',

  // CORS
  accessControlAllowCredentials = 'access-control-allow-credentials',
  accessControlAllowHeaders = 'access-control-allow-headers',
  accessControlAllowMethods = 'access-control-allow-methods',
  accessControlAllowOrigin = 'access-control-allow-origin',
  accessControlExposeHeaders = 'access-control-expose-headers',
  accessControlMaxAge = 'access-control-max-age',
}

export enum CacheHitHeader {
  MISS = 'MISS',
  HIT = 'HIT',
  PASS = 'PASS',
  ERROR = 'ERROR',
}

export const parseMaxAge = (header: string): number => {
  const matches = header.match(/max-age=(\d+)/)
  return matches ? parseInt(matches[1]) : -1
}

export function isResponseCachable(res: Response): boolean {
  if (res.status === 206) return false

  const vary = res.headers.get('vary') || ''
  if (!!~vary.indexOf('*')) return false

  const ccontrol = res.headers.get(Headers.cacheControl) || ''
  if (/(no-cache|no-store)/i.test(ccontrol)) return false

  return true
}

export function isResponsePrivate(res: Response): boolean {
  const ccontrol = res.headers.get(Headers.cacheControl) || ''
  if (/(private)/i.test(ccontrol)) return true

  return false
}
