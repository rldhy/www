import type { NextRequest, NextResponse } from 'next/server'

export type MiddlewareContext = {
  requestHeaders: Headers
  requestId?: string
  visitId?: string
  hasVisitIdCookie: boolean
}

export function createMiddlewareContext(requestHeaders: Headers): MiddlewareContext {
  return {
    requestHeaders: new Headers(requestHeaders),
    hasVisitIdCookie: false,
  }
}

export type RequestMiddleware = (request: NextRequest, context: MiddlewareContext) => void

export type ResponseMiddleware = (
  request: NextRequest,
  response: NextResponse,
  context: MiddlewareContext
) => NextResponse
