import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import PinOnMapSvg from '@/components/common-icons/pin-on-map.svg'
import Image from '@/components/Image'
import Link from '@/components/Link'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const {
    name,
    avatar,
    location,
    occupation,
    company,
    companyUrl,
    email,
    twitter,
    linkedin,
    github,
  } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About Me
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt={name}
                width={192}
                height={192}
                className="h-56 w-56 rounded-3xl"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
            <div className="flex text-gray-500 dark:text-gray-400">
              {/* eslint-disable-next-line prettier/prettier */}
              <Link href={`https://www.google.com/maps/place/${location}/`} className="mr-1.5 fill-current hover:fill-primary-500">
                <PinOnMapSvg />
              </Link>
              {location}
            </div>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-500">
              <Link href={companyUrl ?? ''} title={company}>
                {company}
              </Link>
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
            </div>
            <div className="mt-5 flex items-center justify-center">
              <Link href="https://www.buymeacoffee.com/rlodhiya" className="hover:scale-110">
                <Image
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  width={217}
                  height={60}
                />
              </Link>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
