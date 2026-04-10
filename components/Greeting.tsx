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

function getAvailableGreetingIndices(excludeIndex: number): number[] {
  return GREETINGS.map((_, index) => index).filter((index) => index !== excludeIndex)
}

export default function Greeting({ showFlags }) {
  const [greetingIndex, setGreetingIndex] = useState<number>(0)
  const [greeting, setGreeting] = useState<GreetingInfo>(GREETINGS[0])
  const [flagsHiddenMap, setFlagsHiddenMap] = useState<Map<string, boolean>>(
    getFlagHiddenMap(new Set(GREETINGS[0].flags))
  )
  const [isShowing, setIsShowing] = useState<boolean>(true)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const availableGreetingIndices = useRef<number[]>(getAvailableGreetingIndices(0))

  function isFlagHidden(flag: string): boolean {
    if (showFlags === false) {
      return true
    }
    return flagsHiddenMap[flag]
  }

  function nextGreeting() {
    if (availableGreetingIndices.current.length === 0) {
      availableGreetingIndices.current = getAvailableGreetingIndices(greetingIndex)
    }

    const randomIndex = Math.floor(Math.random() * availableGreetingIndices.current.length)
    const [nextGreetingIndex] = availableGreetingIndices.current.splice(randomIndex, 1)
    const nextGreeting = GREETINGS[nextGreetingIndex]

    setGreetingIndex(nextGreetingIndex)
    setGreeting(nextGreeting)
    setFlagsHiddenMap(getFlagHiddenMap(new Set(nextGreeting.flags)))
  }

  function switchGreeting() {
    if (isShowing) {
      setIsShowing(false)
      timeoutRef.current = setTimeout(() => {
        nextGreeting()
        setIsShowing(true)
      }, 100)
    }
  }

  function getGreetingTitle(greeting: GreetingInfo) {
    return `"Hello World!" ${greeting.language === 'English' ? '' : `| "${greeting.message}"`} | Language: ${greeting.language}`
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
    timeoutRef.current = setTimeout(() => {
      startAnimation()
    }, 200)

    return () => {
      clearInterval(intervalRef.current ?? undefined)
      clearTimeout(timeoutRef.current ?? undefined)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="flex justify-between">
        <Transition show={isShowing}>
          <div className="flex w-5/6 flex-row align-middle transition data-closed:opacity-0">
            <div className="w-4/5 align-middle">
              <span title={getGreetingTitle(greeting)}>{greeting.message}</span>
            </div>

            <div className="flex flex-row items-center">
              {FLAGS.map((flag) => {
                return (
                  <Image
                    key={flag.name}
                    title={flag.countryName}
                    src={`/static/icons/flags/4x3/${flag.name}.svg`}
                    alt=""
                    className={`${isFlagHidden(flag.name) ? 'm-0 h-0 w-0' : 'h-3/5 w-auto scale-75 rounded-full'}`}
                    width={0}
                    height={0}
                  />
                )
              })}
            </div>
          </div>
        </Transition>

        <div className="flex flex-row-reverse align-middle">
          <button onClick={handleStartStop} className="hover:fill-primary-500 fill-current">
            {isStarted ? <PauseSvg /> : <PlaySvg />}
          </button>
        </div>
      </div>
    </>
  )
}
