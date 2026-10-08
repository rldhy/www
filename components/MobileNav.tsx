'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'

const MenuIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
)

const CloseIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-8 w-8">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

const ChevronDown = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5 transition-transform group-data-open:rotate-180"
  >
    <path
      fillRule="evenodd"
      d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
      clipRule="evenodd"
    />
  </svg>
)

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setIsOpen(true)}
        className="hover:text-primary-500 dark:hover:text-primary-500 text-gray-900 dark:text-gray-100"
      >
        <MenuIcon />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={setIsOpen} className="relative z-50 sm:hidden">
          <TransitionChild
            enter="transition-opacity duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div aria-hidden="true" className="fixed inset-0 bg-white/95 dark:bg-gray-950/95" />
          </TransitionChild>

          <TransitionChild
            enter="transition-transform duration-300 ease-out"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-200 ease-in"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="fixed inset-y-0 right-0 w-full overflow-y-auto bg-white dark:bg-gray-950">
              <DialogTitle className="sr-only">Primary navigation</DialogTitle>
              <div className="flex justify-end px-8 pt-10">
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary-500 dark:hover:text-primary-500 text-gray-900 dark:text-gray-100"
                  autoFocus
                >
                  <CloseIcon />
                </button>
              </div>

              <nav aria-label="Mobile primary navigation" className="mt-8 px-8">
                {headerNavLinks.map((group) => (
                  <Disclosure
                    key={group.parent}
                    as="div"
                    className="border-b border-gray-200 dark:border-gray-800"
                  >
                    <DisclosureButton className="hover:text-primary-500 dark:hover:text-primary-500 group flex w-full items-center justify-between py-5 text-left text-xl font-bold text-gray-900 dark:text-gray-100">
                      {group.parent}
                      <ChevronDown />
                    </DisclosureButton>
                    <DisclosurePanel className="pb-4">
                      {group.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="hover:text-primary-500 focus-visible:ring-primary-500 dark:hover:text-primary-500 block rounded-md px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 focus-visible:ring-2 focus-visible:outline-none dark:text-gray-200 dark:hover:bg-gray-800"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </nav>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </div>
  )
}

export default MobileNav
