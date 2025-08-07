import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={8} />
          <SocialIcon kind="github" href={siteMetadata.github} size={8} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={8} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={8} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={8} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={8} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={8} />
          <SocialIcon kind="x" href={siteMetadata.x} size={8} />
          <SocialIcon kind="mastodon" href={siteMetadata.mastodon} size={8} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={8} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={8} />
          <SocialIcon kind="medium" href={siteMetadata.medium} size={8} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          {/* eslint-disable-next-line prettier/prettier */}
          <Link href="/" className="hover:text-primary-500 dark:hover:text-primary-500">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <div>
            {`Built with ❤️ using `}
            {/* eslint-disable-next-line prettier/prettier */}
            <Link href="https://nextjs.org/" className="hover:text-primary-500 dark:hover:text-primary-500">Next.js</Link>
            {` and `}
            {/* eslint-disable-next-line prettier/prettier */}
            <Link href="https://tailwindcss.com/" className="hover:text-primary-500 dark:hover:text-primary-500">Tailwind CSS</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
