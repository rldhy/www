'use client'

import { useTheme } from 'next-themes'
import { Viewer, Worker } from '@react-pdf-viewer/core'

import '@react-pdf-viewer/core/lib/styles/index.css'

const PdfViewer = ({ basePdfPath }) => {
  const { resolvedTheme } = useTheme()

  function getPdfFilePath() {
    return `${basePdfPath}-${resolvedTheme}.pdf`
  }

  return (
    <div className="h-full w-full">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={getPdfFilePath()} theme={resolvedTheme} />
      </Worker>
    </div>
  )
}
export default PdfViewer
