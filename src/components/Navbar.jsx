import { IconMenu2, IconUserCircle } from "@tabler/icons-react";
import Card from "./Card";
import Button from "./Button";
import { Link } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsSidebarOpen } from "../redux/slices/sidebarSlice";

export default function Navbar({ emailProp, nameProp, usernameProp }) {
  const [isOpenModel, setIsOpenModel] = useState(false)
  // const isSidebarOpen = useSelector((state) => state.sidebarSlice.isOpen)
  const dispatch = useDispatch()


  return (
    <div className="w-full h-[62px] border border-gray-200 rounded-2xl bg-white flex justify-end sticky top-5 left-5 right-5 z-[100] mb-5 items-center p-3">
      <div className="relative">
        <IconMenu2 onClick={() => { dispatch(setIsSidebarOpen(true)) }} className="text-dark cursor-pointer xl:hidden block" />
        <IconUserCircle onClick={() => { setIsOpenModel((val) => !val) }} size={32} className="text-primary-500 cursor-pointer hidden xl:block" />
        {
          isOpenModel &&
          <div className="w-md absolute top-12 right-0">
            <Card isExtend={true}>
              <div className="py-2 flex justify-between gap-5">
                <div className="font-semibold">
                  Username
                </div>
                <div className="text-gray-500 text-right break-all text-pretty">
                  {usernameProp}
                </div>
              </div>
              <div className="py-2 flex justify-between gap-5">
                <div className="font-semibold">
                  Nama
                </div>
                <div className="text-gray-500 text-right break-all text-pretty">
                  {nameProp}
                </div>
              </div>
              <div className="py-2 flex justify-between gap-5">
                <div className="font-semibold">
                  Email
                </div>
                <div className="text-gray-500 text-right break-all text-pretty">
                  {emailProp}
                </div>
              </div>
              <Link to={'/user/edit'} className="py-2 flex justify-between gap-5">
                <Button isExtend={true} buttonType="secondary">
                  Edit Profil
                </Button>
              </Link>
            </Card>
          </div>
        }
      </div>
    </div>
  )
}