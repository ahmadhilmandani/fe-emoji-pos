import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input";
import { setAge, setEmail, setName, setPassword, setPhone, setSex } from "../../../redux/slice/registerStoreSlice";

export default function RegisterUserSection() {
  const dispatch = useDispatch()

  const name = useSelector((state) => state.registerStoreSlice.name)
  const password = useSelector((state) => state.registerStoreSlice.password)
  const email = useSelector((state) => state.registerStoreSlice.email)
  const age = useSelector((state) => state.registerStoreSlice.age)
  const phone = useSelector((state) => state.registerStoreSlice.phone)

  return (
    <>
      <h2 className="mb-5 text-center">
        Pengisian Informasi Pemilik Toko 😁
      </h2>
      <div className="flex gap-6 flex-wrap">
        <div className="min-w-[280px] flex-1">
          <Input valueProp={name} labelProp='Nama' placeholderProp='Nama' typeProp='text' inputId='nama' onChangeProp={(e) => { dispatch(setName(e)) }} />
        </div>
        <div className="min-w-[280px] flex-1">
          <Input valueProp={email} labelProp='Email' placeholderProp='Email' typeProp='email' inputId='email' onChangeProp={(e) => { dispatch(setEmail(e)) }} />
        </div>
        <div className="min-w-[280px] shrink-0 w-full">
          <Input valueProp={password} labelProp='password' placeholderProp='Password' typeProp='password' inputId='password' onChangeProp={(e) => { dispatch(setPassword(e)) }} />
        </div>
        <div className="min-w-[280px] flex-1">
          <Input valueProp={phone} labelProp='No. Hp' placeholderProp='081231xxxxxx' typeProp='text' inputId='phone' onChangeProp={(e) => { dispatch(setPhone(e)) }} />
        </div>
        <div className="min-w-[100px] flex-1">
          <Input valueProp={age} labelProp='Umur' placeholderProp='10' typeProp='number' inputId='umur' onChangeProp={(e) => { dispatch(setAge(e)) }} />
        </div>
        <div className="min-w-[100px] flex-1">
          <div className="block mb-2 text-sm font-medium text-dark">
            Jenis Kelamin
          </div>
          <div className="flex flex-wrap">
            <div>
              <input type="radio" id="l" name="sex" value="L" onChange={(e)=>{
                dispatch(setSex(e.target.value))
              }} />
              <label for="l" className="ml-2 mr-5 text-[14px]">Laki - Laki</label>
            </div>
            <div>
              <input type="radio" id="p" name="sex" value="P" onChange={(e)=>{
                dispatch(setSex(e.target.value))
              }} />
              <label for="p" className="ml-2 text-[14px]">Perempuan</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}