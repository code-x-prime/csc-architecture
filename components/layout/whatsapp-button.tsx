'use client'

import { contact } from '@/data/site'

const message = "Hi CSC team, I'd like to talk about a consulting engagement."

function whatsappHref() {
  const digits = contact.phone.replace(/[^\d]/g, '')
  // US numbers in data/site.ts are 10-digit local format — prefix the country code.
  const withCountryCode = digits.length === 10 ? `1${digits}` : digits
  return `https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`
}

export function WhatsappButton() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with CSC on WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110 hover:shadow-[0_14px_38px_rgba(37,211,102,0.6)] sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 [animation:whatsapp-ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7 fill-white">
        <path d="M16.004 3C9.377 3 4.001 8.373 4.001 15c0 2.223.606 4.363 1.756 6.24L4 29l7.94-1.703A11.95 11.95 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.818a9.77 9.77 0 0 1-4.98-1.36l-.357-.212-4.71 1.01 1.006-4.59-.233-.373A9.79 9.79 0 0 1 5.2 15c0-5.966 4.85-10.818 10.804-10.818 5.955 0 10.805 4.852 10.805 10.818 0 5.966-4.85 10.818-10.805 10.818Zm5.923-8.096c-.324-.163-1.917-.947-2.214-1.056-.297-.108-.514-.163-.73.163-.216.325-.838 1.056-1.028 1.273-.19.217-.378.244-.703.081-.324-.163-1.368-.505-2.606-1.612-.963-.86-1.614-1.923-1.803-2.248-.19-.325-.02-.5.142-.663.145-.145.325-.379.487-.568.163-.19.216-.325.324-.542.108-.217.054-.407-.027-.57-.081-.163-.73-1.766-1-2.42-.264-.634-.532-.548-.73-.558l-.622-.011c-.216 0-.567.081-.865.407-.297.325-1.135 1.11-1.135 2.706s1.162 3.138 1.325 3.355c.163.217 2.286 3.49 5.538 4.895.774.334 1.377.534 1.848.684.777.247 1.484.212 2.043.129.623-.093 1.917-.784 2.187-1.542.27-.758.27-1.407.19-1.542-.081-.135-.297-.217-.622-.38Z" />
      </svg>

      <style>{`
        @keyframes whatsapp-ping {
          0% { transform: scale(1); opacity: 0.5; }
          75%, 100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </a>
  )
}
