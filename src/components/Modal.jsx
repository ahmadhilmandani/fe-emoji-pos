export default function Modal({ children }) {
  return (
    <div className="bg-white/60 backdrop-blur-lg flex justify-center items-center w-full h-screen fixed top-0 left-0 bottom-0 right-0 p-4 z-[500]">
      <div className="max-w-4xl w-full px-4 py-12 border shadow-2xl bg-white border-gray-200 rounded-3xl max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  )
}