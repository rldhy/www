'use client'
import dynamic from 'next/dynamic'

// Dynamically import the PDF viewer client component.
const InnerPdfViewerClient = dynamic(() => import('./PdfViewerClient'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        fontSize: '1.2rem',
        color: '#333',
      }}
    >
      Loading PDF Viewer...
    </div>
  ),
})

const PdfViewer = ({ title, pdf }: { title: string; pdf: Blob | string }) => {
  return <InnerPdfViewerClient title={title} pdf={pdf} />
}
export default PdfViewer
