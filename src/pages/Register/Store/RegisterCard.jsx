import { Link, useNavigate } from "react-router";
import Button from "../../../components/Button"
import { useState } from "react";
import { IconAt, IconCircleCheckFilled, IconLabel, IconLock, IconMail } from "@tabler/icons-react";
import Card from "../../../components/Card";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RegisterUserSection from "./UserSection";
import RegisterStoreSection from "./StoreSection";
import RegisterConfirmSection from "./ConfirmSection";

export default function RegisterCard() {
  const [stepNum, setStepNum] = useState(1)

  const navigate = useNavigate()

  const name = useSelector((state) => state.registerStoreSlice.name)
  const password = useSelector((state) => state.registerStoreSlice.password)
  const email = useSelector((state) => state.registerStoreSlice.email)
  const age = useSelector((state) => state.registerStoreSlice.age)
  const sex = useSelector((state) => state.registerStoreSlice.sex)
  const phone = useSelector((state) => state.registerStoreSlice.phone)
  

  const nameStore = useSelector((state) => state.registerStoreSlice.nameStore)
  const addressStore = useSelector((state) => state.registerStoreSlice.addressStore)
  const phoneStore = useSelector((state) => state.registerStoreSlice.phoneStore)

  const handlePrevStep = () => {
    if (stepNum != 1) {
      setStepNum(state => state - 1)
    }
  }

  const handleNextStep = () => {
    console.log(name)
    console.log(password)
    console.log(email)
    console.log(age)
    console.log(sex)
    console.log(phone)
    
    console.log(nameStore)
    console.log(addressStore)
    console.log(phoneStore)

    if (stepNum == 3) {
      handleRegis()
    } else {
      setStepNum(state => state + 1)
    }
  }

  const handleRegis = async () => {


  }


  return (
    <>
      <Card>
        <div className="mb-10">
          <h1 className="text-center text-2xl mb-3 font-bold">
            Pendaftaran Toko! 🏪
          </h1>
        </div>

        <ol className="flex justify-center items-center mb-10">
          <li className={`flex w-full items-center after:content-[''] after:w-full after:h-[3px] after:border-2 after:inline-block after:mx-2 rounded-full ${stepNum > 1 ? 'text-emerald-500 after:border-emerald-100' : 'text-gray-400 after:border-gray-300'} transition-all`}>
            {
              stepNum > 1 && <IconCircleCheckFilled className="mr-2" />
            }
            Pemilik
          </li>
          <li className={`flex w-full items-center after:content-[''] after:w-full after:h-[3px] after:border-2 after:inline-block after:mx-2 rounded-full ${stepNum > 2 ? 'text-emerald-500 after:border-emerald-100' : 'text-gray-400 after:border-gray-300'} transition-all`}>
            {
              stepNum > 2 && <IconCircleCheckFilled className="mr-2" />
            }
            Toko
          </li>
          <li className="flex items-center w-fit text-gray-400">
            Konfirmasi
          </li>
        </ol>

        <div className="p-8 border border-gray-200 rounded-md mb-8">
          {
            stepNum == 1 ? <RegisterUserSection /> : stepNum == 2 ? <RegisterStoreSection /> : <RegisterConfirmSection />
          }

          <div className="mt-6 flex justify-center gap-6">
            <Button onClickProp={handlePrevStep} buttonType={stepNum == 1 ? 'default' : 'secondary'} isExtend={true}>
              Kembali
            </Button>
            <Button onClickProp={handleNextStep} buttonType={stepNum < 3 ? 'primary' : 'success'} isExtend={true}>
              {
                stepNum < 3 ? 'Lanjut' : 'Selesaikan'
              }
            </Button>
          </div>
        </div>
        <div className="flex gap-1 justify-center items-center">
          <div className="text-[13px] text-gray-500">
            Sudah Pernah Mendaftar Toko?
          </div>
          <Link to={'/'} className="font-semibold text-[13px] text-gray-500 hover:text-yellow-600 transition-all">Login di sini!</Link>
        </div>
      </Card>
    </>
  )
}