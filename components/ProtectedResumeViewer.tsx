'use client'

import { useState, useRef } from 'react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import PdfViewer from './PdfViewer'
import { useTheme } from 'next-themes'

const ProtectedResumeViewer = () => {
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()

  const hcaptchaRef = useRef<HCaptcha>(null)
  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''

  function getHCaptchaTheme() {
    switch (resolvedTheme) {
      case 'dark':
        return 'dark'
      case 'light':
        return 'light'
      default:
        return undefined
    }
  }

  const handleCaptchaVerify = async (token: string, ekey: string) => {
    if (!token || !ekey) {
      return
    }
    try {
      const res = await fetch(`/api/resume?hcaptchaToken=${token}`)

      if (!res.ok) {
        setError('Failed to verify or download PDF.')
        return
      }

      const blob = await res.blob()
      setPdfBlob(blob)
    } catch (err) {
      setError('Something went wrong while fetching the PDF.')
    }
  }

  const handleCaptchaError = () => {
    setPdfBlob(null)
    setError('Captcha verification failed or expired.')
  }

  return (
    <div className="pt-4">
      {!pdfBlob && (
        <div className="mb-4">
          <p className="mb-2 font-medium text-gray-700 dark:text-gray-200">
            Please complete the CAPTCHA to view the PDF:
          </p>
          <HCaptcha
            ref={hcaptchaRef}
            size="normal"
            theme={getHCaptchaTheme}
            sitekey={hcaptchaSiteKey}
            onVerify={handleCaptchaVerify}
            onExpire={handleCaptchaError}
            onError={handleCaptchaError}
          />
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      )}

      {pdfBlob && <PdfViewer title="Résumé" pdf={pdfBlob} />}
    </div>
  )
}

export default ProtectedResumeViewer
