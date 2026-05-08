import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  createMiddlewareContext,
  withRequestId,
  withRequestIdResponse,
  withVisitId,
  withVisitIdResponse,
} from './utils/middleware'
import type {
  MiddlewareContext,
  RequestMiddleware,
  ResponseMiddleware,
} from './utils/middleware'

const requestMiddleware: RequestMiddleware[] = [withRequestId, withVisitId]
const responseMiddleware: ResponseMiddleware[] = [withRequestIdResponse, withVisitIdResponse]

export function proxy(request: NextRequest) {
  const context: MiddlewareContext = createMiddlewareContext(request.headers)

  requestMiddleware.forEach((middleware) => middleware(request, context))

  const response = NextResponse.next({
    request: {
      headers: context.requestHeaders,
    },
  })

  return responseMiddleware.reduce(
    (nextResponse, middleware) => middleware(request, nextResponse, context),
    response
  )
}

export const config = {
  matcher: [
    '/api/:path*',
    '/',
    '/about',
    '/contact',
    '/projects',
    '/resume',
    '/tags/:path*',
    '/blog/:path*',
  ],
}
