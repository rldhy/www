import GetInTouch from '@/components/GetInTouch'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Contact' })

export default function Contact() {
  return (
    <>
      <div className="divide-y-2">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Contact Me
          </h1>
        </div>
      </div>
      <div className="min-w-full items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
        <GetInTouch />
      </div>
    </>
  )
}
