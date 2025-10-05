import { useNavigate } from "react-router"
import Button from "../../components/Button"
import { IconEraser, IconPencil, IconPlus, IconSearch } from "@tabler/icons-react"
import Input from "../../components/Input"
import Badge from "../../components/Badge"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getAllIngredients } from "../../api/getAllIngredients"
import IngredientModalDelete from "./Component/ModalDelete"

export default function IndgredientIndex() {
  const [ingredients, setIngredients] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [ingredientDataDelete, setIngredientDataDelete] = useState(null)
  const [isRefetch, setIsRefetch] = useState(true)

  const navigate = useNavigate()

  const handleToggleOpen = (param) => {
    setIngredientDataDelete(param)
  }

  const handleToggleRefetch = (param) => {
    setIsRefetch(param)
  }


  const getIngredients = async () => {
    setIsLoading(true)
    try {
      const res = await getAllIngredients()
      setIngredients(res.data.ingredients)
    } catch (error) {
      toast.error((error.response.data.msg))
    } finally {
      setIsLoading(false)
      setIsRefetch(false)
    }
  }

  useEffect(() => {
    if (isRefetch) {
      getIngredients()
    }
  }, [isRefetch])

  return (
    <>
      {ingredientDataDelete && (<>
        <IngredientModalDelete isRefetch={handleToggleRefetch} ingredientData={ingredientDataDelete} handleCloseModal={() => { handleToggleOpen(null) }} />
      </>
      )
      }
      <div>
        <header className="flex justify-between items-center gap-5">
          <h1>Bahan Baku</h1>
          <Button buttonType={'primary'} onClickProp={() => {
            navigate('/ingredient/add')
          }}>
            Tambah
            <IconPlus size={16} className="group-hover:translate-x-0.5 transition-all" />
          </Button>
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
        </div> */}
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
                    <span className="sr-only"></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredients?.map((val) => {
                  return (
                    <>
                      <tr key={val.id} className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {val.name}
                        </th>
                        <td className="px-6 py-4">
                          {val.price}
                        </td>
                        <td className="px-6 py-4">
                          {val.stock}
                        </td>
                        <td className="px-6 py-4">
                          {val.min_stock}
                        </td>
                        <td className="px-6 py-4">
                          {val.unit}
                        </td>
                        <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                          <button onClick={() => { navigate(`/ingredient/edit/${val.id}`) }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-purple-50 hover:cursor-pointer transition-all hover:border-purple-500">
                            <IconPencil className="group-hover:-translate-y-0.5 transition-all stroke-purple-500" stroke={1.2} size={22} />
                            Edit
                          </button>
                          <button onClick={() => {
                            handleToggleOpen(val)
                          }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:cursor-pointer transition-all hover:border-rose-500">
                            <IconEraser className="group-hover:-translate-y-0.5 transition-all stroke-rose-500" stroke={1.2} size={22} />
                            Hapus
                          </button>
                        </td>
                      </tr>
                    </>
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