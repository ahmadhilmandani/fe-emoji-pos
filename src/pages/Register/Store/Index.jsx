import RegisterCard from "./RegisterCard";
import logo from "../../../assets/logo.png"


export default function RegisterStoreIndex() {
  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-10 px-4'>
        <img src={logo} alt="Logo of Mental Butler" className="mx-auto w-48 mb-12" />
        <div className='relative z-10 w-full mx-auto flex justify-center'>
          <RegisterCard />
        </div>
        <div className='absolute w-full h-[60vh] bottom-0 left-0 right-0 bg-gradient-to-br from-primary-200 via-primary-500 to-yellow-500 blur-[200px] opacity-30 pointer-events-none z-[1]'></div>
      </div>
    </>
  )
}