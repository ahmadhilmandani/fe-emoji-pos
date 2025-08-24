import Card from "../../components/Card";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button"
import { useState } from "react";
import { postRegister } from "../../api/postRegister";
import { useDispatch, useSelector } from "react-redux";
import { setButtonLoader } from "../../redux/slices/loaderSlice";
import { toast } from "react-toastify";
import InputWithIcon from "../../components/InputWithIcon";
import { IconAt, IconLabel, IconLock, IconMail } from "@tabler/icons-react";

export default function RegisterCard() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const buttonLoader = useSelector((state) => state.loaderSlice.buttonLoader)


  const handleRegis = async () => {
    if (buttonLoader) {
      return
    }

    if (!name  || !username  || !email  || !password) {
      toast.error('Harus terisi semua');
      dispatch(setButtonLoader(false))
      return
    }

    dispatch(setButtonLoader(true))

    const rest = await postRegister({ username, name, email, password })


    if (rest.data?.is_error) {
      toast.error(rest.data.msg);
    } else {
      toast.success('Sekarang, Tolong Login pakai Akun yang dibuat barusan, thanks!');
      navigate('/')
    }
    dispatch(setButtonLoader(false))

  }


  return (
    <>
      <Card>
        <div className="mb-8">
          <h1 className="text-center text-2xl mb-3 font-bold">
            Kami Ingin Membantumu!
          </h1>
          <small className="text-gray-500 mx-auto text-center block">Silahkan daftar terlebih dahulu, ya!</small>
        </div>
        <div className="mt-5">
          <InputWithIcon iconProp={<IconLabel size={16} />} onChangeProp={setName} labelProp={'Nama'} placeholderProp={'cth: Budi Dangklek'} typeProp={'text'} inputId={'name'} />
        </div>
        <div className="mt-5">
          <InputWithIcon iconProp={<IconAt size={16} />} onChangeProp={setUsername} labelProp={'Username'} placeholderProp={'cth: hujansendu'} typeProp={'text'} inputId={'username'} />
        </div>
        <div className="mt-5">
          <InputWithIcon iconProp={<IconMail size={16} />} onChangeProp={setEmail} labelProp={'Email'} placeholderProp={'cth: Budi@dangklek.com'} typeProp={'email'} inputId={'email'} />
        </div>
        <div className="mt-5">
          <InputWithIcon iconProp={<IconLock size={16} />} onChangeProp={setPassword} labelProp={'Password'} placeholderProp={'.............'} typeProp={'text'} inputId={'password'} />
        </div>

        <div className="my-5">
          <Button onClickProp={handleRegis} buttonType={'primary'} isExtend={true} isLoading={buttonLoader}>
            Register
          </Button>
        </div>

        <div className="flex gap-1 justify-center items-center">
          <div className="dark:text-light text-dark">
            Sudah punya akun?
          </div>
          <Link to={'/'} className="font-semibold link-primary-color">Login di sini!</Link>
        </div>
      </Card>
    </>
  )
}