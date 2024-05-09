'use client'

import { Transition } from '@headlessui/react'
import { useState, useRef, useEffect, MouseEvent } from 'react'
import { FLAGS, GREETINGS, GreetingInfo } from 'data/greetings'
import PlaySvg from './common-icons/play-circle-solid.svg'
import PauseSvg from './common-icons/pause-circle-solid.svg'
import Image from '@/components/Image'

function getFlagHiddenMap(showFlags: Set<string>): Map<string, boolean> {
  const map: Map<string, boolean> = new Map<string, boolean>()
  FLAGS.forEach((flag) => {
    map[flag.name] = !showFlags.has(flag.name)
  })
  return map
}

export default function Greeting({ showFlags }) {
  const [greetingIndex, setGreetingIndex] = useState<number>(0)
  const [greeting, setGreeting] = useState<GreetingInfo>(GREETINGS[0])
  const [flagsHiddenMap, setFlagsHiddenMap] = useState<Map<string, boolean>>(
    getFlagHiddenMap(new Set(GREETINGS[0].flags))
  )
  const [isShowing, setIsShowing] = useState<boolean>(true)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  interface FilteredGreeting {
    index: number
    greeting: GreetingInfo
  }

  function isFlagHidden(flag: string): boolean {
    if (showFlags === false) {
      return true
    }
    return flagsHiddenMap[flag]
  }

  function nextGreeting() {
    const indices: FilteredGreeting[] = []
    GREETINGS.forEach((v, i) => {
      if (i !== greetingIndex) {
        indices.push({ index: i, greeting: v })
      }
    })
    const randomIndex = Math.floor(Math.random() * indices.length)
    const next = indices[randomIndex]
    setGreetingIndex(next.index)
    setGreeting(next.greeting)
    setFlagsHiddenMap(getFlagHiddenMap(new Set(next.greeting.flags)))
  }

  function switchGreeting() {
    if (isShowing) {
      setIsShowing(false)
      setTimeout(() => {
        nextGreeting()
        setIsShowing(true)
      }, 100)
    }
  }

  function startAnimation() {
    if (!isStarted) {
      clearInterval(intervalRef.current ?? undefined)
      intervalRef.current = setInterval(() => {
        switchGreeting()
      }, 2500)
      setIsStarted(true)
    }
  }

  function stopAnimation() {
    if (isStarted) {
      clearInterval(intervalRef.current ?? undefined)
      setIsStarted(false)
    }
  }

  function handleStartStop(e: MouseEvent) {
    e.preventDefault()
    if (isStarted) {
      stopAnimation()
    } else {
      startAnimation()
    }
  }

  useEffect(() => {
    setTimeout(() => {
      startAnimation()
    }, 3000)
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <Transition
          className="flex w-3/4 flex-row align-middle"
          show={isShowing}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-4/5 align-middle">
            <span title={`"Hello World!" | Language: ${greeting.language}`}>
              {greeting.message}
            </span>
          </div>

          <div className="flex flex-row items-center">
            {FLAGS.map((flag) => {
              return (
                <Image
                  key={flag.name}
                  title={flag.countryName}
                  src={`/static/icons/flags/4x3/${flag.name}.svg`}
                  alt=""
                  className={`${
                    isFlagHidden(flag.name) ? 'm-0 h-0 w-0' : 'h-2/3 w-auto scale-75 rounded-full'
                  }`}
                  width={0}
                  height={0}
                />
              )
            })}
          </div>
        </Transition>

        <div className="flex flex-row-reverse align-middle">
          <button onClick={handleStartStop} className="fill-current hover:fill-primary-500">
            {isStarted ? <PauseSvg /> : <PlaySvg />}
          </button>
        </div>
      </div>
    </>
  )
}
