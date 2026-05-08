import pino from 'pino'
import type { NextRequest } from 'next/server'

const isDevelopment = process.env.NODE_ENV === 'development'

const logger = pino({
  level: process.env.LOG_LEVEL ?? (isDevelopment ? 'debug' : 'info'),
  redact: {
    paths: [
      '*.apiKey',
      '*.authorization',
      '*.body.hcaptchaToken',
      '*.captchaToken',
      '*.hcaptchaToken',
      '*.secret',
      '*.secretKey',
      '*.token',
      'apiKey',
      'authorization',
      'body.hcaptchaToken',
      'captchaToken',
      'hcaptchaToken',
      'secret',
      'secretKey',
      'token',
    ],
    censor: '[redacted]',
  },
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          translateTime: 'SYS:standard',
        },
      }
    : undefined,
})

export type Logger = typeof logger

export function getRequestId(req: NextRequest): string {
  return req.headers.get('x-request-id') ?? 'missing-request-id'
}

export function getVisitId(req: NextRequest): string {
  return req.headers.get('x-visit-id') ?? 'missing-visit-id'
}

export function getRequestLogger(req: NextRequest, route: string): Logger {
  return logger.child({
    requestId: getRequestId(req),
    visitId: getVisitId(req),
    route,
    method: req.method,
  })
}

export default logger
