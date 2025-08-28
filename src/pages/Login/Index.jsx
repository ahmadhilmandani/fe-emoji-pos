import LoginCard from "./LoginCard";
import logo from "../../assets/logo.png"

export default function LoginIndex() {
  return (
    <>
      <div className='bg-white w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-10 px-4'>
        <img src={logo} alt="Logo of Mental Butler" className="mx-auto w-48 mb-12" />
        <div className='relative z-10 w-full max-w-lg'>
          <LoginCard />
        </div>
        <div className='absolute w-full h-[40vh] bottom-0 left-0 right-0 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-300 blur-[200px] opacity-30 pointer-events-none z-[1]'></div>
      </div>
    </>
  )
}