import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import Greeting from '@/components/Greeting'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="my-6 flex flex-col items-center gap-x-12 xl:mb-12 xl:flex-row">
        <div className="mr-8 pt-6">
          <h1 className="pb-6 text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            <Greeting showFlags={true} />
          </h1>
          <div className="flex flex-row items-center space-x-2 pt-8">
            <Image
              src="/static/images/avatar.png"
              alt="Ritwik Lodhiya"
              width={192}
              height={192}
              className="mr-4 h-52 w-52 rounded-full"
            />
            <div className="prose flex flex-col text-lg text-gray-500 dark:text-gray-400">
              <span className="mb-2">
                {`Welcome to my small corner on the world wide web! My name is `}
                <Link href="/about">Ritwik Lodhiya</Link>
                {`.`}
              </span>
              <span className="mb-2">
                {`I am a software engineer based in San Francisco, CA. `}
                {`I specialize in backend development, and focusing on machine learning. `}
                {`I lead engineering teams by example and take pride in fostering a culture of engineering excellence.`}
              </span>
              <span className="mb-2">
                {`In my free time, I like creating `}
                <Link href="/projects">side projects</Link>
                {` and `}
                <Link href="/blog">writing</Link>
                {` about various things. `}
              </span>
              <span className="my-1">
                {`Other than tech, I enjoy traveling, music, art, photography, PC + board games, and reading (mostly non-fiction topics such as economics, politics, history).`}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-2xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Latest Posts
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl leading-8 font-bold tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base leading-6 font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base leading-6 font-medium">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
