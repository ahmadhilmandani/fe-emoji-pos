import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getUserInfo } from "../api/getUserInfo";

export default function MainLayout() {
  const [userInfo, setUserInfo] = useState()
  useEffect(() => {
    const handleGetUserInfo = async () => {
      const res = await getUserInfo()
      setUserInfo(res.data.data.user)
      console.log(res)
    }

    handleGetUserInfo()
  }, [])
  return (
    <>
      <div className='bg-light dark:bg-dark w-full min-h-screen flex relative gap-5'>
        <Sidebar />
        <Outlet context={userInfo}  />
      </div>
    </>
  )
}