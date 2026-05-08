import { validate as isUuid, v4 as uuidV4 } from 'uuid'
import type { RequestMiddleware, ResponseMiddleware } from './types'

const VISIT_ID_COOKIE = 'visit-id'
const VISIT_ID_HEADER = 'x-visit-id'
const VISIT_ID_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export const withVisitId: RequestMiddleware = (request, context) => {
  const cookieVisitId = request.cookies.get(VISIT_ID_COOKIE)?.value || undefined
  const hasValidVisitIdCookie = cookieVisitId !== undefined && isUuid(cookieVisitId)
  const visitId = hasValidVisitIdCookie ? cookieVisitId : uuidV4()

  context.visitId = visitId
  context.hasVisitIdCookie = hasValidVisitIdCookie
  context.requestHeaders.set(VISIT_ID_HEADER, visitId)
}

export const withVisitIdResponse: ResponseMiddleware = (_request, response, context) => {
  if (context.visitId) {
    response.headers.set(VISIT_ID_HEADER, context.visitId)
  }

  if (context.visitId && !context.hasVisitIdCookie) {
    response.cookies.set(VISIT_ID_COOKIE, context.visitId, {
      httpOnly: true,
      maxAge: VISIT_ID_MAX_AGE_SECONDS,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  }

  return response
}
