'use client'

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import React, { FormEvent, useState } from 'react'
import Send from './common-icons/send-filled.svg'
import Error from './common-icons/error-filled.svg'
import Success from './common-icons/success-filled.svg'
import { useTheme } from 'next-themes'

interface FormErrors {
  fullName?: string
  email?: string
  message?: string
}

const GetInTouch = () => {
  /* HCaptcha Verification */
  const [hcaptchaToken, setHcaptchaToken] = useState('')
  const [hcaptchaSubmited, setHcaptchaSubmited] = useState(false)

  /* Form Fields */
  const [fullName, setFullName] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  /* UI */
  const [errors, setErrors] = useState<FormErrors>({})
  const [buttonText, setButtonText] = useState('Send')
  const [buttonEnabled, setButtonEnabled] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')
  const [modalLogo, setModalLogo] = useState(<></>)
  const { resolvedTheme } = useTheme()

  const hcaptchaRef = React.useRef<HCaptcha>(null)
  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''

  function validateForm() {
    const tempErrors = {}
    let isValid = true
    if (fullName.trim().length === 0) {
      setFullName('')
      tempErrors['fullName'] = true
      isValid = false
    }
    if (email.trim().length === 0) {
      setEmail('')
      tempErrors['email'] = true
      isValid = false
    }
    if (subject.trim().length === 0) {
      setSubject('')
    }
    if (message.trim().length === 0) {
      setMessage('')
      tempErrors['message'] = true
      isValid = false
    }

    setErrors({ ...tempErrors })

    return isValid
  }

  function submitHCaptcha(token: string) {
    setHcaptchaToken(token)
    setHcaptchaSubmited(true)
  }

  function resetHCaptcha() {
    setHcaptchaToken('')
    setHcaptchaSubmited(false)
    hcaptchaRef.current?.resetCaptcha()
  }

  function isButtonDisabled() {
    if (!hcaptchaSubmited) {
      return true
    }
    return !buttonEnabled
  }

  function lockSubmitButton() {
    setButtonText('Sending')
    setButtonEnabled(false)
  }

  function resetButton() {
    setButtonText('Send')
    setButtonEnabled(true)
  }

  function resetInput() {
    setFullName('')
    setEmail('')
    setSubject('')
    setMessage('')
  }

  function openSuccessModal() {
    setModalTitle('Message Sent')
    setModalMessage('Thank you for your message!')
    setModalLogo(<Success />)
    setShowModal(true)
  }

  function openErrorModal() {
    setModalTitle('Message Failed')
    setModalMessage('Something went awry, please try again.')
    setModalLogo(<Error />)
    setShowModal(true)
  }

  function closeModal() {
    setShowModal(false)
    setModalTitle('')
    setModalMessage('')
    setModalLogo(<></>)
  }

  async function submitPostVerify() {
    let success = true
    try {
      const res = await fetch('/api/contact', {
        body: JSON.stringify({
          hcaptchaToken: hcaptchaToken,
          fullName: fullName.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (res.status === 200) {
        resetInput()
      } else {
        success = false
      }
    } catch {
      success = false
    } finally {
      resetButton()
      resetHCaptcha()
    }

    if (success) {
      openSuccessModal()
    } else {
      openErrorModal()
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const isValidForm = validateForm()

    if (isValidForm) {
      if (hcaptchaSubmited) {
        lockSubmitButton()
        await submitPostVerify()
      } else {
        hcaptchaRef.current?.execute()
      }
    }
  }

  async function onHCaptchaVerify(token: string, ekey: string) {
    if (!token || !ekey) {
      return
    }
    submitHCaptcha(token)
  }

  async function onHCaptchaExpiryOrError() {
    resetHCaptcha()
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-opacity-60 mt-8 flex flex-col rounded-lg border-2 border-gray-400 p-10 shadow-xl dark:border-gray-700"
      >
        <h1 className="mb-2 text-center text-4xl font-bold">Get in Touch!</h1>

        <label htmlFor="fullName" className="mt-4 font-bold">
          Full Name: <span className="text-red-500">*</span>
        </label>
        <input
          type="fullName"
          value={fullName}
          name="fullName"
          required={true}
          placeholder="Enter full name"
          onChange={(e) => {
            setFullName(e.target.value)
          }}
          className="required mb-3 block w-full rounded border border-gray-500 bg-gray-300 px-4 py-3 dark:text-black"
        />

        {errors?.fullName && <p className="text-red-500">Full name cannot be empty.</p>}

        <label htmlFor="email" className="mt-4 font-bold">
          Email: <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={email}
          name="email"
          required={true}
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          className="required mb-3 block w-full rounded border border-gray-500 bg-gray-300 px-4 py-3 dark:text-black"
        />

        {errors?.email && <p className="text-red-500">Email cannot be empty.</p>}

        <label htmlFor="subject" className="mt-8 font-bold">
          Subject:
        </label>
        <input
          type="text"
          value={subject}
          name="subject"
          required={false}
          placeholder="Enter subject"
          onChange={(e) => {
            setSubject(e.target.value)
          }}
          className="mb-3 block w-full rounded border border-gray-500 bg-gray-300 px-4 py-3 dark:text-black"
        />

        <label htmlFor="message" className="mt-4 font-bold">
          Message: <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          required={true}
          value={message}
          placeholder="Enter message"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          className="required mb-3 block min-h-44 w-full rounded border border-gray-500 bg-gray-300 px-4 py-3 dark:text-black"
        ></textarea>

        {errors?.message && <p className="text-red-500">Message cannot be empty.</p>}

        <div className="mt-4 flex flex-col">
          <div className="flex flex-row-reverse items-center">
            <div>
              <HCaptcha
                ref={hcaptchaRef}
                size="normal"
                theme={resolvedTheme}
                sitekey={hcaptchaSiteKey}
                onVerify={onHCaptchaVerify}
                onExpire={onHCaptchaExpiryOrError}
                onError={onHCaptchaExpiryOrError}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse items-center">
            <button
              type="submit"
              disabled={isButtonDisabled()}
              className="bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400 m-1.5 flex flex-row items-center rounded-md px-10 py-2 align-middle text-lg font-bold text-gray-700"
            >
              {buttonText}
              <div className="ml-1.5">
                <Send />
              </div>
            </button>
          </div>
        </div>
      </form>
      <Dialog className="relative z-10" transition={true} open={showModal} onClose={closeModal}>
        <div className="fixed inset-0 bg-black/25 transition duration-300 data-[closed]:opacity-0" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel
              transition={true}
              className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition duration-300 data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-gray-900"
            >
              <DialogTitle className="text-xl leading-6 font-bold text-black dark:text-white dark:ring-offset-slate-500">
                {modalTitle}
              </DialogTitle>
              <div className="mt-4 mb-2 flex items-center">
                <div className="mr-2">{modalLogo}</div>
                <p className="text-md text-black dark:text-white">{modalMessage}</p>
              </div>

              <div className="align-right mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default GetInTouch
