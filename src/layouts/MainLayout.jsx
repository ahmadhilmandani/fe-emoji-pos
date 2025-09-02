import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {

  return (
    <>
      <div className='w-full min-h-screen flex relative gap-5 bg-gray-50'>
        <Sidebar />
        <div className="flex-1 py-10 pr-10 pl-5">
          <Outlet />
        </div>
      </div>
    </>
  )
}