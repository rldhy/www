'use client'
import dynamic from 'next/dynamic'

// Dynamically import the PDF viewer client component.
const PdfViewerClient = dynamic(() => import('./PdfViewerClient'), {
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

const PdfViewer = ({ pdf }) => {
  return <PdfViewerClient pdf={pdf} />
}
export default PdfViewer
