import { IconEraser, IconEye, IconPencil, IconPlus, IconSearch } from "@tabler/icons-react";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getProduct } from "../../../api/getProduct";
import { toast } from "react-toastify";
import PhysicalProductIndexLoading from "../Component/IndexLoading";
import PhysicalProductModalDelete from "../Component/ModalDelete";
import { useSelector } from "react-redux";

export default function PhysicalProductIndex() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataProducts, setDataProducts] = useState()
  const [productDataDelete, setProductDataDelete] = useState(null)
  const [isRefetch, setIsRefetch] = useState(true)

  const userRole = useSelector((state) => state.userInfoSlie.role)


  const navigate = useNavigate()

  const handleToggleOpen = (productData) => {
    setProductDataDelete(productData)
  }

  const handleToggleRefetch = (param) => {
    setIsRefetch(param)
  }


  const getProducts = async () => {
    try {
      const res = await getProduct(`?type=produk_fisik`)
      setDataProducts(res.data.products)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
      setIsRefetch(false)
    }
  }

  useEffect(() => {
    if (isRefetch) {
      getProducts()
    }
  }, [isRefetch])

  if (isLoading) {
    return <PhysicalProductIndexLoading />
  } else {
    return (
      <>
        {productDataDelete && (<>
          <PhysicalProductModalDelete isRefetch={handleToggleRefetch} productData={productDataDelete} handleCloseModal={() => { handleToggleOpen(null) }} />
        </>
        )
        }
        <div>
          <header className="flex justify-between items-center gap-5">
            <h1>Produk Fisik</h1>
            {
              userRole === 'owner' && (
                <>
                  <Button buttonType={'primary'} onClickProp={() => {
                    navigate('/physical-product/add')
                  }}>
                    Tambah
                    <IconPlus size={16} className="group-hover:translate-x-0.5 transition-all" />
                  </Button>
                </>
              )}
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
            </div>
            <div className="w-full overflow-x-auto relative rounded-b-lg border border-gray-200 bg-white">
              <table className="min-w-[320px] w-full text-left rtl:text-right">
                <thead className="uppercase border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-bold">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-4 font-bold">
                      Harga
                    </th>
                    <th scope="col" className="px-6 py-4 font-bold">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-4 font-bold">
                      Min. Stock
                    </th>
                    <th scope="col" className="px-6 py-4 font-bold">
                      Satuan
                    </th>
                    <th scope="col" className="px-6 py-4 font-bold">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataProducts?.map((val) => {
                    return (
                      <tr className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {val.name}
                        </td>
                        <td className="px-6 py-4">
                          Rp. {val.price}
                        </td>
                        <td className="px-6 py-4">
                          {val.stock ? val.stock : 0}
                        </td>
                        <td className="px-6 py-4">
                          {val.phys_prod_min_stock}
                        </td>
                        <td className="px-6 py-4">
                          {val.unit}
                        </td>
                        <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                          {userRole === 'owner' && (
                            <>
                              <button onClick={() => { navigate(`/physical-product/edit/${val.id}`) }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-purple-50 hover:cursor-pointer transition-all hover:border-purple-500">
                                <IconPencil className="group-hover:-translate-y-0.5 transition-all stroke-purple-500" stroke={1.2} size={22} />
                                Edit
                              </button>
                              <button onClick={() => {
                                handleToggleOpen(val)
                              }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:cursor-pointer transition-all hover:border-rose-500">
                                <IconEraser className="group-hover:-translate-y-0.5 transition-all stroke-rose-500" stroke={1.2} size={22} />
                                Hapus
                              </button>
                            </>
                          )
                          }
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
}