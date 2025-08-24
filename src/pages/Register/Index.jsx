import RegisterCard from "./RegisterCard";

import LogoLight from "../../assets/logo/logo-mental-butler-dark.png"
import LogoDark from "../../assets/logo/logo-mental-butler-light.png"

export default function RegisterIndex() {
  return (
    <>
      <div className='bg-light dark:bg-dark w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-10 px-4'>
        <img src={LogoLight} alt="Logo of Mental Butler" className="mx-auto w-48 mb-12" />
        <div className='relative z-10 w-full max-w-lg'>
          <RegisterCard />
        </div>
        <div className='absolute w-full h-[60vh] bottom-0 left-0 right-0 bg-gradient-to-br from-primary-200 via-primary-500 to-yellow-500 blur-[200px] opacity-30 pointer-events-none z-[1]'></div>
      </div>
    </>
  )
}