import { v4 as uuidV4 } from 'uuid'
import type { RequestMiddleware, ResponseMiddleware } from './types'

const REQUEST_ID_HEADER = 'x-request-id'

export const withRequestId: RequestMiddleware = (request, context) => {
  const requestId = request.headers.get(REQUEST_ID_HEADER) ?? uuidV4()
  context.requestId = requestId
  context.requestHeaders.set(REQUEST_ID_HEADER, requestId)
}

export const withRequestIdResponse: ResponseMiddleware = (_request, response, context) => {
  if (context.requestId) {
    response.headers.set(REQUEST_ID_HEADER, context.requestId)
  }
  return response
}
