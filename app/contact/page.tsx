import GetInTouch from '@/components/GetInTouch'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Contact' })

export default function Contact() {
  return (
    <>
      <div className="divide-y-2 divide-gray-400 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Contact Me
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Please fill out the form below to reach out to me. Looking forward to hearing from you!
          </p>
        </div>
        <div className="container items-start justify-start">
          <GetInTouch />
        </div>
      </div>
    </>
  )
}
