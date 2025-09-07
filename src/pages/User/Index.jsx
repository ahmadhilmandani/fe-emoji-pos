import { useNavigate } from "react-router"
import Input from "../../components/Input"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import { IconEraser, IconEye, IconPencil, IconPlus, IconSearch } from "@tabler/icons-react"
import { toast } from "react-toastify"
import { getAllUserInfo } from "../../api/getAllUserInfo"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function UserIndex() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataUsersInfo, setDataUsersInfo] = useState()
  const navigate = useNavigate()

  const userInfoSlie = useSelector((state) => { return state.userInfoSlie })

  const getAlltUserInfo = async () => {
    try {
      const res = await getAllUserInfo(userInfoSlie.storeId)
      setDataUsersInfo(res.data.users_info)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAlltUserInfo()
  }, [])

  return (
    <>
      <div>
        <header className="flex justify-between items-center gap-5">
          <h1>Pengguna</h1>
          <Button buttonType={'primary'} onClickProp={() => {
            navigate('/product/add')
          }}>
            Tambah
            <IconPlus size={16} className="group-hover:translate-x-0.5 transition-all" />
          </Button>
        </header>
        <div>
          <div className="flex justify-between items-center gap-5 bg-white p-5 rounded-t-lg border border-b-2 border-b-yellow-300 border-gray-200">
            <div className="flex gap-1 items-stretch">
              <Input
                valueProp={''} placeholderProp={'cari berdasarkan nama'} typeProp={'text'} inputId={'cari'} onChangeProp={() => {
                }} isRequired={false}
              />
              <div className="p-2.5 flex justify-center items-center aspect-square rounded-lg bg-yellow-300">
                <IconSearch size={16} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <b>
                Role
              </b>
              <Badge>
                All
              </Badge>
              <Badge>
                Admin
              </Badge>
              <Badge>
                Kasir
              </Badge>
            </div>
          </div>
          <div className="w-full overflow-x-auto relative rounded-b-lg border border-gray-200 bg-white">
            <table className="min-w-[320px] w-full text-left rtl:text-right">
              <thead className="uppercase border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    No. Hp
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Umur
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataUsersInfo?.map((val) => {
                  return (
                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50/60">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {val.name}
                      </th>
                      <td className="px-6 py-4">
                        {val.email}
                      </td>
                      <td className="px-6 py-4">
                        {val.phone}
                      </td>
                      <td className="px-6 py-4">
                        {val.user_role}
                      </td>
                      <td className="px-6 py-4">
                        {val.age} thn
                      </td>
                      <td className="px-6 py-4">
                        {val.sex == 'L' ? 'Laki-laki' : 'Perempuan'}
                      </td>
                      <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                        <button className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-amber-50 hover:border-amber-500 hover:cursor-pointer transition-all">
                          <IconEye className="group-hover:-translate-y-0.5 transition-all stroke-amber-500" stroke={1.2} size={22} />
                          Detail
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-purple-50 hover:border-purple-500 hover:cursor-pointer transition-all">
                          <IconPencil className="group-hover:-translate-y-0.5 transition-all stroke-purple-500" stroke={1.2} size={22} />
                          Edit
                        </button>
                        <button className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:border-rose-500 hover:cursor-pointer transition-all">
                          <IconEraser className="group-hover:-translate-y-0.5 transition-all stroke-rose-500" stroke={1.2} size={22} />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}