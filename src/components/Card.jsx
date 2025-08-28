export default function Card({ children, isExtend = false, addClass }) {
  return (
    <div className={`${isExtend ? 'w-full h-full': 'w-full max-w-4xl'} p-4 bg-white border border-gray-200 rounded-xl sm:p-6 md:p-8 relative overflow-hidden ${addClass && [...addClass]} z-10`}>
      {children}
    </div>
  )
}