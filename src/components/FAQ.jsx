import { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'

const faqs = [
  {
    question: 'What metadata is stored in photos?',
    answer:
      'Photos contain EXIF metadata including GPS coordinates (exact location where the photo was taken), camera model and settings, date and time, lens information, software used for editing, author name, copyright info, and thumbnail previews. This data can reveal your identity, location, and habits.',
  },
  {
    question: 'Does MetaClean remove GPS location data?',
    answer:
      'Yes, MetaClean completely removes all GPS and geolocation data from your images and videos. After processing, there is no way to determine where the photo or video was taken from the file metadata.',
  },
  {
    question: 'Is it safe to use MetaClean?',
    answer:
      'Absolutely. MetaClean processes all files locally in your web browser using client-side JavaScript. Your files are never uploaded to any server — they never leave your device. This is the safest possible approach for privacy-sensitive file processing.',
  },
  {
    question: 'Can I remove metadata from MP4 videos?',
    answer:
      'Yes! MetaClean supports metadata removal from MP4, MOV, AVI, MKV, WEBM, and M4V video files. The tool strips all metadata while preserving video and audio quality using compatible web codecs.',
  },
  {
    question: 'What file formats are supported?',
    answer:
      'MetaClean supports the following image formats: JPG, JPEG, PNG, WEBP, GIF, TIFF, BMP, HEIC, and AVIF. For videos: MP4, MOV, AVI, MKV, WEBM, and M4V. We regularly add support for additional formats.',
  },
  {
    question: 'Will removing metadata reduce image quality?',
    answer:
      'For most formats, MetaClean preserves maximum image quality. JPEG files are re-saved at 95% quality (virtually indistinguishable from the original). PNG and WEBP files maintain lossless quality. Videos are processed with stream copy (no re-encoding), preserving original quality.',
  },
  {
    question: 'Can I process multiple files at once?',
    answer:
      'Yes! MetaClean supports batch processing. You can drag and drop or select multiple files at once, and they will all be processed sequentially. You can then download them individually or as a ZIP archive.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. MetaClean requires no signup, no email address, and no personal information. Just open the page, upload your files, and download the cleaned versions. It is completely free with no limits.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500">
            Everything you need to know about metadata removal and privacy.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-slate-100 shadow-sm rounded-xl overflow-hidden">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-violet-50/50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-sm sm:text-base font-medium text-slate-900 pr-4">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`w-5 h-5 text-violet-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
