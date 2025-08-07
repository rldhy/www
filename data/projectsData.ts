interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Building RLODHIYA.DEV',
    description: `After putting it off for way too long, I finally launched my personal website! Check out the page for details.`,
    imgSrc: '/static/images/social-banner.png',
    href: '/blog/building-my-site/main',
  },
]

export default projectsData
