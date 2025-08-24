import Card from "../../components/Card";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button"
import { useState } from "react";
// import { fetchLogin } from "../../api/fetchLogin";
// import { useDispatch, useSelector } from "react-redux";
// import { setButtonLoader } from "../../redux/slices/loaderSlice";
// import { toast } from "react-toastify";

export default function LoginCard() {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()



  return (
    <>
      <Card>
        <div className="mb-8">
          <h1 className="text-center text-2xl mb-3 font-bold">
            Selamat Datang!
          </h1>
          <small className="text-gray-500 mx-auto text-center block">Sebelumnya, login terlebih dahulu, ya!</small>
        </div>
        <div className="mt-5">
          <Input onChangeProp={setEmailOrUsername} labelProp={'Email atau Username'} placeholderProp={'cth: username; user@gmail.com'} typeProp={'text'} inputId={'emailOrUsername'} />
        </div>
        <div className="mt-5">
          <Input onChangeProp={setPassword} labelProp={'Password'} placeholderProp={'·········'} typeProp={'password'} inputId={'password'} />
        </div>

        <div className="my-5">

          <Button buttonType="primary" isExtend={true}>
            Login
          </Button>

        </div>

        <div className="flex gap-1 justify-center items-center">
          <div className="dark:text-light text-dark">
            Belum punya akun?
          </div>
          <Link to={'/register'} className="font-semibold link-primary-color">Daftar di Sini!</Link>
        </div>
      </Card>
    </>
  )
}