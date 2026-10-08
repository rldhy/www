'use client'

import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'

const ChevronDown = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-4 w-4 transition-transform group-data-open:rotate-180"
  >
    <path
      fillRule="evenodd"
      d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

const DesktopNav = () => (
  <PopoverGroup
    as="nav"
    aria-label="Primary navigation"
    className="hidden items-center gap-6 sm:flex"
  >
    {headerNavLinks.map((group) => (
      <Popover key={group.parent} className="group relative">
        {({ close }) => (
          <>
            <PopoverButton className="hover:text-primary-500 dark:hover:text-primary-500 focus-visible:ring-primary-500 flex items-center gap-1 font-medium text-gray-900 outline-none focus-visible:ring-2 dark:text-gray-100">
              {group.parent}
              <ChevronDown />
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute right-0 z-30 mt-3 w-52 origin-top-right rounded-lg bg-white p-2 shadow-lg ring-1 ring-black/10 transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0 dark:bg-gray-900 dark:ring-white/10"
            >
              {group.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="hover:text-primary-500 focus-visible:ring-primary-500 dark:hover:text-primary-500 block rounded-md px-4 py-3 font-medium text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  {link.title}
                </Link>
              ))}
            </PopoverPanel>
          </>
        )}
      </Popover>
    ))}
  </PopoverGroup>
)

export default DesktopNav
