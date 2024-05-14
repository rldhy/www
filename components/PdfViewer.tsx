'use client'

import { version } from 'pdfjs-dist'
import { ReactElement } from 'react'
import { useTheme } from 'next-themes'
import { PageLayout, RenderPageProps, Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin, ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const PDFJS_WORKER_SRC = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`

const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
  <Toolbar>
    {(props: ToolbarSlot) => {
      const {
        CurrentPageLabel,
        EnterFullScreen,
        GoToNextPage,
        GoToPreviousPage,
        NumberOfPages,
        Zoom,
        ZoomIn,
        ZoomOut,
      } = props
      return (
        <>
          <div style={{ padding: '0px 2px' }}>
            <ZoomOut />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <Zoom />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <ZoomIn />
          </div>
          <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
            <GoToPreviousPage />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <CurrentPageLabel /> / <NumberOfPages />
          </div>
          <div style={{ padding: '0px 2px' }}>
            <GoToNextPage />
          </div>
          <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
            <EnterFullScreen />
          </div>
        </>
      )
    }}
  </Toolbar>
)

const PdfViewer = ({ pdfPath, pdfPathLight, pdfPathDark }) => {
  const { resolvedTheme } = useTheme()

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [defaultTabs[0]],
  })

  const pageLayout: PageLayout = {
    buildPageStyles: () => ({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
    }),
    transformSize: ({ size }) => ({
      height: size.height + 30,
      width: size.width + 30,
    }),
  }

  function renderPage(props: RenderPageProps) {
    return (
      <>
        {props.canvasLayer.children}
        <div className="select-none">{props.textLayer.children}</div>
        {props.annotationLayer.children}
      </>
    )
  }

  return (
    <Worker workerUrl={PDFJS_WORKER_SRC}>
      {pdfPath !== undefined && (
        <div className={`h-full w-full`}>
          <Viewer
            fileUrl={pdfPath}
            theme={resolvedTheme}
            renderPage={(props) => renderPage(props)}
            pageLayout={pageLayout}
            plugins={[defaultLayoutPluginInstance]}
          />
        </div>
      )}
      {pdfPath === undefined && (
        <>
          <div className={`h-full w-full ${resolvedTheme === 'dark' ? 'hidden' : ''}`}>
            <Viewer
              fileUrl={pdfPathLight}
              theme={resolvedTheme}
              renderPage={(props) => renderPage(props)}
              pageLayout={pageLayout}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
          <div className={`h-full w-full ${resolvedTheme === 'light' ? 'hidden' : ''}`}>
            <Viewer
              fileUrl={pdfPathDark}
              theme={resolvedTheme}
              renderPage={(props) => renderPage(props)}
              pageLayout={pageLayout}
              plugins={[defaultLayoutPluginInstance]}
            />
          </div>
        </>
      )}
    </Worker>
  )
}

export default PdfViewer
