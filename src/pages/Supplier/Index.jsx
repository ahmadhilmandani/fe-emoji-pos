import { IconDots, IconEraser, IconEye, IconPencil, IconPlus, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getSupplier } from "../../api/getSupplier";
import { toast } from "react-toastify";
import SupplierModalDelete from "./Component/ModalDelete";
import { useSelector } from "react-redux";

export default function SupplierIndex() {
  const [isLoading, setIsLoading] = useState(true)
  const [supplierData, setSupplierData] = useState()
  const [supplierDelete, setSupplierDelete] = useState(null)
  const [isRefetch, setIsRefetch] = useState(true)

  const userRole = useSelector((state) => state.userInfoSlie.role)


  const navigate = useNavigate()

  const handleToggleOpen = (productData) => {
    setSupplierDelete(productData)
  }

  const handleToggleRefetch = (param) => {
    setIsRefetch(param)
  }


  const getAllSupplier = async () => {
    try {
      const res = await getSupplier()
      setSupplierData(res.data.supplier)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
      setIsRefetch(false)

    }
  }

  useEffect(() => {
    if (isRefetch) {
      getAllSupplier()
    }
  }, [isRefetch])

  return (
    <>
      {supplierDelete && (<>
        <SupplierModalDelete isRefetch={handleToggleRefetch} suppliierData={supplierDelete} handleCloseModal={() => { handleToggleOpen(null) }} />
      </>
      )
      }
      <div>
        <header className="flex justify-between items-center gap-5">
          <h1>Supplier</h1>

          {userRole === 'owner' &&
          <Button buttonType={'primary'} onClickProp={() => {
            navigate('/supplier/add')
          }}>
            Tambah
            <IconPlus size={16} className="group-hover:translate-x-0.5 transition-all" />
          </Button>
          }
        </header>
        <div>
          {/* <div className="flex justify-between items-center gap-5 bg-white p-5 rounded-t-lg border border-b-2 border-b-yellow-300 border-gray-200">
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
                Tipe
              </b>
              <Badge>
                Semua Produk
              </Badge>
              <Badge>
                Produk Jadi
              </Badge>
              <Badge>
                Produk Olahan
              </Badge>
              <Badge badgeType={'primary'} >
                Layanan
              </Badge>
            </div>
          </div> */}
          <div className="w-full overflow-x-auto relative rounded-b-lg border border-gray-200 bg-white">
            <table className="min-w-[320px] w-full text-left rtl:text-right">
              <thead className="uppercase border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    No. Hp
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    Alamat
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold">
                    <span className="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {supplierData?.map((val) => {
                  return (
                    <tr key={val.id} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {val.name}
                      </th>
                      <td className="px-6 py-4">
                        {val.phone}
                      </td>
                      <td className="px-6 py-4">
                        {val.address}
                      </td>
                      <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                        <button onClick={() => { navigate(`/supplier/${val.id}`) }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-purple-50 hover:border-purple-500 hover:cursor-pointer transition-all">
                          <IconPencil className="group-hover:-translate-y-0.5 transition-all stroke-purple-500" stroke={1.2} size={22} />
                          Edit
                        </button>
                        <button onClick={() => {
                          handleToggleOpen(val)
                        }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:border-rose-500 hover:cursor-pointer transition-all">
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