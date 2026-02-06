import { defineCollection, defineConfig } from '@content-collections/core'
import type { AnyCollection } from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { writeFileSync } from 'fs'
import path from 'path'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import { z } from 'zod'
import siteMetadata from './data/siteMetadata'
import { allCoreContent, sortPosts } from './utils/content'
import { extractTocHeadings, remarkCodeTitles, remarkImgToJsx } from './utils/mdx-plugins'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCitation from 'rehype-citation'
import rehypeKatex from 'rehype-katex'
import rehypePresetMinify from 'rehype-preset-minify'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const mdxOptions = {
  cwd: process.cwd(),
  remarkPlugins: [remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx],
  rehypePlugins: [
    rehypeSlug,
    rehypeAutolinkHeadings,
    rehypeKatex,
    [rehypeCitation, { path: path.join(root, 'data') }],
    [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    rehypePresetMinify,
  ],
} as unknown as Parameters<typeof compileMDX>[2]

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

function createSearchIndex(allBlogs) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    writeFileSync(
      `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
      JSON.stringify(allCoreContent(sortPosts(allBlogs)))
    )
    console.log('Local search index generated...')
  }
}

const blogs = defineCollection({
  name: 'blogs',
  typeName: 'Blog',
  directory: 'data',
  include: 'blog/**/*.mdx',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    lastModified: z.string().optional(),
    draft: z.boolean().optional(),
    summary: z.string().optional(),
    images: z.array(z.string()).default([]),
    authors: z.array(z.string()).optional(),
    layout: z.string().optional(),
    bibliography: z.string().optional(),
    canonicalUrl: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const code = await compileMDX(context, document, mdxOptions)
    const toc = await extractTocHeadings(document.content)
    const flattenedPath = document._meta.path

    return {
      ...document,
      body: {
        raw: document.content,
        code,
      },
      readingTime: readingTime(document.content),
      slug: flattenedPath.replace(/^.+?(\/)/, ''),
      path: flattenedPath,
      filePath: document._meta.filePath,
      toc,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: document.title,
        datePublished: document.date,
        dateModified: document.lastModified || document.date,
        description: document.summary,
        image: document.images?.length ? document.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${flattenedPath}`,
      },
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath,
        contentType: 'mdx',
      },
      _id: document._meta.filePath,
    }
  },
  onSuccess: (docs) => {
    createTagCount(docs)
    createSearchIndex(docs)
  },
}) as unknown as AnyCollection

const authors = defineCollection({
  name: 'authors',
  typeName: 'Authors',
  directory: 'data',
  include: 'authors/**/*.mdx',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    location: z.string().optional(),
    occupation: z.string().optional(),
    company: z.string().optional(),
    companyUrl: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    buyMeCoffee: z.string().optional(),
    layout: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const code = await compileMDX(context, document, mdxOptions)
    const flattenedPath = document._meta.path

    return {
      ...document,
      body: {
        raw: document.content,
        code,
      },
      readingTime: readingTime(document.content),
      slug: flattenedPath.replace(/^.+?(\/)/, ''),
      path: flattenedPath,
      filePath: document._meta.filePath,
      toc: await extractTocHeadings(document.content),
      _raw: {
        sourceFilePath: document._meta.filePath,
        sourceFileName: document._meta.fileName,
        sourceFileDir: document._meta.directory,
        flattenedPath,
        contentType: 'mdx',
      },
      _id: document._meta.filePath,
    }
  },
}) as unknown as AnyCollection

export default defineConfig({
  collections: [blogs, authors],
})
