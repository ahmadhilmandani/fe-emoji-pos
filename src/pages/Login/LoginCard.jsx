import Card from "../../components/Card";
import Input from "../../components/Input";
import { Link, useNavigate } from "react-router";
import Button from "../../components/Button"
import { useState } from "react";
import { toast } from "react-toastify";
import { postLogin } from "../../api/postLogin";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slice/userInfoSlice";

export default function LoginCard() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const res = await postLogin({
        password,
        email,
      })
      localStorage.setItem('token', res.data.user.token)
      toast.success(`Selamat Datang Kembali, ${res.data.user.name}!` )
      dispatch(setUserInfo({
        id: res.data.user.id,
        name: res.data.user.name,
        email: res.data.user.email,
        role: res.data.user.role,
        storeId: res.data.user.store_id,
        maxPercentageEmojiDiscount: res.data.user.percentage_max_emoji_disc
      }))
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }


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
          <Input onChangeProp={setEmail} labelProp={'Email'} placeholderProp={'cth: username; user@mail.test'} typeProp={'text'} inputId={'email'} />
        </div>
        <div className="mt-5">
          <Input onChangeProp={setPassword} labelProp={'Password'} placeholderProp={'·········'} typeProp={'password'} inputId={'password'} />
        </div>

        <div className="my-5">

          <Button onClickProp={handleLogin} buttonType="primary" isExtend={true}>
            Login
          </Button>

        </div>

        <div className="flex gap-1 justify-center items-center">
          <div className="text-[13px] text-gray-500">
            Ingin Mendaftar Toko?
          </div>
          <Link to={'/register-store'} className="font-semibold text-[13px] text-gray-500 hover:text-yellow-600 transition-all">Klik di Sini!</Link>
        </div>
      </Card>
    </>
  )
}