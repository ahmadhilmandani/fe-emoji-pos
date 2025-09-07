import { IconChevronLeft, IconDots, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../components/Card";
import { toast } from "react-toastify";
import { useState } from "react";
import { postEmployee } from "../../api/postEmployee";
import { useSelector } from "react-redux";

export default function EmployeeAdd() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [phone, setPhone] = useState()
  const [age, setAge] = useState()
  const [sex, setSex] = useState()
  const [userRole, setUserRole] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const userInfoSlie = useSelector((state) => { return state.userInfoSlie })
  const navigate = useNavigate()

  const handleSubmitEmployee = async () => {
    setIsLoading(true)
    try {
      const payload = {
        store_id: userInfoSlie.storeId,
        name: name,
        password: password,
        user_role: userRole,
        email: email,
        phone: phone,
        age: age,
        sex: sex,
      }
      await postEmployee(payload)
      toast.success('Berhasil Menambah Karyawan')
      navigate('/employee')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <header className="flex items-center gap-5">
        <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
          navigate('/employee')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Tambah Karyawan</h1>
      </header>
      <div>
        <Card isExtend={true}>
          <div className="flex gap-6 flex-wrap">
            <div className="min-w-[280px] flex-1">
              <Input valueProp={name} labelProp='Nama' placeholderProp='Nama' typeProp='text' inputId='nama' onChangeProp={setName} />
            </div>
            <div className="min-w-[280px] flex-1">
              <Input valueProp={email} labelProp='Email' placeholderProp='Email' typeProp='email' inputId='email' onChangeProp={setEmail} />
            </div>
            <div className="min-w-[280px] shrink-0 w-full">
              <Input valueProp={password} labelProp='password' placeholderProp='Password' typeProp='password' inputId='password' onChangeProp={setPassword} />
            </div>
            <div className="min-w-[280px] flex-1">
              <Input isRequired={false} valueProp={phone} labelProp='No. Hp' placeholderProp='081231xxxxxx' typeProp='text' inputId='phone' onChangeProp={setPhone} />
            </div>
            <div className="min-w-[100px] flex-1">
              <Input isRequired={false} valueProp={age} labelProp='Umur' placeholderProp='10' typeProp='number' inputId='umur' onChangeProp={setAge} />
            </div>
            <div className="min-w-[100px] flex-1">
              <div className="block mb-2 text-sm font-medium text-dark">
                Jenis Kelamin
              </div>
              <div className="flex flex-wrap">
                <div>
                  <input type="radio" id="l" name="sex" value="L" onChange={(e) => { setSex(e.target.value) }} />
                  <label for="l" className="ml-2 mr-5 text-[14px]">Laki - Laki</label>
                </div>
                <div>
                  <input type="radio" id="p" name="sex" value="P" onChange={(e) => { setSex(e.target.value) }} />
                  <label for="p" className="ml-2 text-[14px]">Perempuan</label>
                </div>
              </div>
            </div>
            <div className="min-w-[100px] flex-1">
              <div className="block mb-2 text-sm font-medium text-dark">
                Role
              </div>
              <div className="flex flex-wrap">
                <div>
                  <input type="radio" id="l" name="role" value="admin" onChange={(e) => { setUserRole(e.target.value) }} />
                  <label for="l" className="ml-2 mr-5 text-[14px]">Admin</label>
                </div>
                <div>
                  <input type="radio" id="p" name="role" value="kasir" onChange={(e) => { setUserRole(e.target.value) }} />
                  <label for="p" className="ml-2 text-[14px]">Kasir</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button isLoading={isLoading} onClickProp={handleSubmitEmployee} buttonType="primary" isExtend={true}>
              Simpan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}