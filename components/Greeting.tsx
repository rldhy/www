'use client'

import { Transition } from '@headlessui/react'
import { useState, useRef, useEffect, MouseEvent } from 'react'
import { FLAGS, GREETINGS, Greeting } from 'data/greetings'
import PlaySvg from './common-icons/play-circle-solid.svg'
import PauseSvg from './common-icons/pause-circle-solid.svg'
import Image from '@/components/Image'

function getFlagHiddenMap(showFlags: Set<string>): Map<string, boolean> {
  const map = new Map<string, boolean>()
  FLAGS.forEach((flag) => {
    map[flag] = !showFlags.has(flag)
  })
  return map
}

export default function Greeting() {
  const [greetingIndex, setGreetingIndex] = useState<number>(0)
  const [greeting, setGreeting] = useState<Greeting>(GREETINGS[0])
  const [flagsHiddenMap, setFlagsHiddenMap] = useState<Map<string, boolean>>(
    getFlagHiddenMap(new Set(GREETINGS[0].flags))
  )
  const [isShowing, setIsShowing] = useState<boolean>(true)
  const [isStarted, setIsStarted] = useState<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  interface FilteredGreeting {
    index: number
    greeting: Greeting
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
          className="flex w-4/5 flex-row align-middle"
          show={isShowing}
          enter="transition-opacity duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="w-4/5 align-middle">
            <span title={`${greeting.message} (Language: ${greeting.language})`}>
              {greeting.message}
            </span>
          </div>
          <div className="flex flex-row align-middle">
            {FLAGS.map((flag) => {
              return (
                <div className="flex items-center align-middle" key={flag}>
                  <Image
                    title={flag}
                    src={`/static/icons/flags/4x3/${flag}.svg`}
                    alt=""
                    className={`hidden h-auto w-2/3 rounded-full`}
                    width={0}
                    height={0}
                  />
                </div>
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
