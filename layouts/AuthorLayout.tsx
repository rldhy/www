import { ReactNode } from 'react'
import type { Authors } from 'content-collections'
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
    linkedin,
    github,
    buyMeCoffee,
  } = content

  return (
    <>
      <div className="divide-y divide-gray-400 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About Me
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
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
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="flex text-gray-500 dark:text-gray-400">
              {/* eslint-disable-next-line prettier/prettier */}
              <Link href={`https://www.google.com/maps/place/${location}/`} className="mr-1.5 fill-current hover:fill-primary-500">
                <PinOnMapSvg />
              </Link>
              {location}
            </div>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="hover:text-primary-500 dark:hover:text-primary-500 text-gray-500 dark:text-gray-400">
              <Link href={companyUrl ?? ''} title={company}>
                {company}
              </Link>
            </div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
            </div>
            {buyMeCoffee && (
              <div className="mt-5 flex items-center justify-center">
                <Link href={buyMeCoffee} className="hover:scale-110">
                  <Image
                    src="/static/images/buy-me-coffee.png"
                    alt="Buy Me A Coffee"
                    width={163}
                    height={45}
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
