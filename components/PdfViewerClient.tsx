'use client'

import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import ChevronLeftIcon from './common-icons/chevron-left-circle.svg'
import ChevronRightIcon from './common-icons/chevron-right-circle.svg'

import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

const PDFJS_SRC = `https://unpkg.com/pdfjs-dist@${pdfjs.version}`
pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS_SRC}/build/pdf.worker.min.mjs`

const options = {
  cMapUrl: `${PDFJS_SRC}/cmaps/`,
  standardFontDataUrl: `${PDFJS_SRC}/standard_fonts/`,
}

function Nav({ pageNumber, numPages }: { pageNumber: number; numPages: number }) {
  return (
    <nav className="top-0 bg-black">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <p className="text-2xl font-bold text-gray-100">PDF Viewer</p>
        <div className="rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-gray-100">
          <span>{pageNumber}</span>
          <span className="text-gray-400"> / {numPages}</span>
        </div>
      </div>
    </nav>
  )
}

const PdfViewerClient = ({ pdf }: { pdf: Blob | string }) => {
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [pageWidth, setPageWidth] = useState(800)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width) {
          setPageWidth(entry.contentRect.width * 0.9)
        }
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setLoading(false)
  }

  function goToPreviousPage() {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  function goToNextPage() {
    setPageNumber((prev) => Math.min(prev + 1, numPages))
  }

  return (
    <div className="flex h-screen flex-col" hidden={loading}>
      <Nav pageNumber={pageNumber} numPages={numPages} />
      <div ref={containerRef} className="mx-auto w-full max-w-[1000px] px-4 py-6">
        <div className="relative flex w-full justify-center">
          <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2">
            <button
              onClick={goToPreviousPage}
              className="group hover:text-primary-500 px-3 py-20 text-black"
            >
              <ChevronLeftIcon className="h-10 w-10" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 z-10 -translate-y-1/2">
            <button
              onClick={goToNextPage}
              className="group hover:text-primary-500 px-3 py-20 text-black"
            >
              <ChevronRightIcon className="h-10 w-10" />
            </button>
          </div>
          <Document
            file={pdf}
            options={options}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="py-20 text-center">Loading PDF...</div>}
            error={
              <div className="py-20 text-center text-red-500">
                Failed to load PDF. Please try again later.
              </div>
            }
          >
            <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer renderAnnotationLayer />
          </Document>
        </div>
      </div>
    </div>
  )
}

export default PdfViewerClient
