export interface HeaderNavLink {
  href: string
  title: string
}

export interface HeaderNavGroup {
  parent: string
  links: HeaderNavLink[]
}

const headerNavLinks: HeaderNavGroup[] = [
  {
    parent: 'About',
    links: [
      { href: '/about', title: 'About Me' },
      { href: '/resume', title: 'Résumé' },
      { href: '/contact', title: 'Contact' },
    ],
  },
  {
    parent: 'Work',
    links: [
      { href: '/projects', title: 'Projects' },
      { href: '/blog', title: 'Blog' },
      { href: '/tags', title: 'Tags' },
    ],
  },
]

export default headerNavLinks
