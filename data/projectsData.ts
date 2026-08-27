interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Building a Local AI Agent for Legal Documents',
    description: `An AI Agent that uses RAG to answer questions across legal documents with citations. Check out the page for details.`,
    imgSrc: '/static/images/legal-doc-agent-banner.png',
    href: '/blog/building-a-legal-docs-rag-agent/v1-milestone',
  },
  {
    title: 'Building RLODHIYA.DEV',
    description: `After putting it off for way too long, I finally launched my personal website! Check out the page for details.`,
    imgSrc: '/static/images/social-banner.png',
    href: '/blog/building-my-site/main',
  },
]

export default projectsData
