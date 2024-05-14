import { genPageMetadata } from 'app/seo'
import PdfViewer from '@/components/PdfViewer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Résumé' })

const RESUME_BASE_PATH = '/static/resume/resume'

export default function Page() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            My Résumé
          </h1>
        </div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {`In order to view my resume, please enter my first name, last name, and the word "resume" without any spaces in `}
            <span className="text-primary-500 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400">
              <Link href="https://www.techopedia.com/definition/pascal-case">PascalCase</Link>
            </span>
            {` when prompted for the password below. Feel free to `}
            <span className="text-primary-500 hover:text-primary-500 dark:text-primary-500 dark:hover:text-primary-400">
              <Link href="/contact">reach out</Link>
            </span>
            {` if you encounter any issues or would like to learn more. `}
          </p>
          <div className="h-svh w-full">
            <PdfViewer
              pdfPath={undefined}
              pdfPathLight={`${RESUME_BASE_PATH}-light.pdf`}
              pdfPathDark={`${RESUME_BASE_PATH}-dark.pdf`}
            />
          </div>
        </div>
      </div>
    </>
  )
}
