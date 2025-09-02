import { IconLoader2 } from "@tabler/icons-react"

const BADGE_TYPE = {
  'PRIMARY': 'primary',
  'SECONDARY': 'secondary',
  'SUCCESS': 'success',
  'DANGER': 'danger',
  'WARNING': 'warning',
  'DEFAULT': 'default'
}



export default function Badge({ onClickProp = () => { }, badgeType = BADGE_TYPE.DEFAULT, children, isLoading = false }) {

  if (badgeType == BADGE_TYPE.PRIMARY) {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`flex justify-center items-center gap-3 text-yellow-600 border border-yellow-600 bg-yellow-50 font-semibold rounded-xl text-[13px] px-2 py-1 ring-0 focus:outline-none transition-all ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {children}
        </button>
      </>
    )
  }
  else {
    return (
      <>
        <button onClick={onClickProp} type="button" className={`flex justify-center items-center gap-3 text-gray-500 border border-gray-500 bg-gray-50 font-semibold rounded-xl text-[13px] px-2 py-1 ring-0 focus:outline-none transition-all ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
          {children}
        </button>
      </>
    )
  }
}