'use client'

import { useState } from 'react'
import GetQuotePopup from './GetQuotePopup'

interface GetQuotePopupWrapperProps {
  content: {
    title: string
    subtitle: string
    firstNameLabel: string
    companyEmailLabel: string
    companyNameLabel: string
    locationPreferenceLabel: string
    spaceRequirementLabel: string
    submitButtonText: string
  }
}

export default function GetQuotePopupWrapper({ content }: GetQuotePopupWrapperProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
      >
        {content.title}
      </button>

      <GetQuotePopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        content={content}
      />
    </>
  )
}
