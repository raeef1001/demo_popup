'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GetQuotePopupProps {
  isOpen: boolean
  onClose: () => void
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

interface FormData {
  firstName: string
  companyEmail: string
  companyName: string
  locationPreference: string
  spaceRequirement: string
}

export default function GetQuotePopup({ isOpen, onClose, content }: GetQuotePopupProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    companyEmail: '',
    companyName: '',
    locationPreference: '',
    spaceRequirement: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-xl w-full shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h2>
              <p className="text-gray-600">{content.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {content.firstNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    {content.companyEmailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={formData.companyEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, companyEmail: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {content.companyNameLabel}
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {content.locationPreferenceLabel}
                </label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={formData.locationPreference}
                  onChange={(e) =>
                    setFormData({ ...formData, locationPreference: e.target.value })
                  }
                >
                  <option value="">Select a location</option>
                  <option value="London">London</option>
                  <option value="Bristol">Bristol</option>
                  <option value="Brighton">Brighton</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {content.spaceRequirementLabel}
                </label>
                <textarea
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  rows={4}
                  value={formData.spaceRequirement}
                  onChange={(e) =>
                    setFormData({ ...formData, spaceRequirement: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg py-4 px-6 font-semibold hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
              >
                {content.submitButtonText}
              </button>
            </form>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
