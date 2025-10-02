import { IconLoader2 } from "@tabler/icons-react"

const BUTTON_TYPE = {
  'PRIMARY': 'primary',
  'SECONDARY': 'secondary',
  'SUCCESS': 'success',
  'DANGER': 'danger',
  'WARNING': 'warning',
  'DEFAULT': 'default'
}



export default function Button({ onClickProp = () => { }, buttonType = BUTTON_TYPE.DEFAULT, isExtend = false, children, isLoading = false }) {

  if (buttonType == BUTTON_TYPE.PRIMARY) {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`group flex justify-center items-center gap-3 text-light bg-yellow-300 hover:bg-amber-300 font-semibold rounded-xl text-sm px-6 py-3 ring-0 focus:outline-none transition-all ${isExtend && 'w-full'} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && <IconLoader2 className="animate-spin text-sm" />}
          {children}
        </button>
      </>
    )
  }
  else if (buttonType == BUTTON_TYPE.SECONDARY) {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`group flex justify-center items-center gap-3 text-yellow-700 bg-amber-100 hover:bg-amber-200 hover:text-yellow-00 font-semibold rounded-xl text-sm px-6 py-3 ring-0 focus:outline-none transition-all ${isExtend && 'w-full'} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && <IconLoader2 className="animate-spin text-sm" />}
          {children}
        </button>
      </>
    )
  }
  else if (buttonType == BUTTON_TYPE.SUCCESS) {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`group flex justify-center items-center gap-3 text-white bg-emerald-500 hover:bg-emerald-600 font-semibold rounded-xl text-sm px-6 py-3 ring-0 focus:outline-none transition-all ${isExtend && 'w-full'} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && <IconLoader2 className="animate-spin text-sm" />}
          {children}
        </button>
      </>
    )
  }
  else if (buttonType == BUTTON_TYPE.DANGER) {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`group flex justify-center items-center gap-3 text-rose-500 bg-rose-50 hover:bg-rose-100 font-semibold rounded-xl text-sm px-6 py-3 ring-0 focus:outline-none transition-all ${isExtend && 'w-full'} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && <IconLoader2 className="animate-spin text-sm" />}
          {children}
        </button>
      </>
    )
  }
  else if (buttonType == BUTTON_TYPE.WARNING) {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`group flex justify-center items-center gap-3 text-warning-800 dark:text-warning-50 bg-warning-100 hover:bg-warning-300 font-semibold rounded-xl text-sm px-6 py-3 dark:bg-warning-700 dark:hover:bg-warning-600 ring-0 focus:outline-none transition-all ${isExtend && 'w-full'} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && <IconLoader2 className="animate-spin text-sm" />}
          {children}
        </button>
      </>
    )
  } else {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`group flex justify-center items-center gap-3 text-gray-600 bg-gray-200 hover:bg-gray-300 font-semibold rounded-xl text-sm px-6 py-3 ring-0 focus:outline-none transition-all ${isExtend && 'w-full'} ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {isLoading && <IconLoader2 className="animate-spin text-sm" />}
          {children}
        </button>
      </>
    )
  }
}