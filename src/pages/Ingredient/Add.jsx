import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { postIngredients } from "../../api/postIngredients"
import { useSelector } from "react-redux"
import { IconChevronLeft } from "@tabler/icons-react"
import Card from "../../components/Card"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ErrorToastMsg from "../../components/ErrorToastMsg"
import { getSupplier } from "../../api/getSupplier"

export default function IngredientAdd() {
  const [name, setName] = useState()
  const [stock, setStock] = useState()
  const [minStock, setMinStock] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const userInfo = useSelector((state) => { return state.userInfoSlie })

  const getAllSupplier = async () => {
    try {
      const res = await getSupplier()
      console.log(res.data.supplier)
      // setSupplierData(res.data.supplier)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitIngredient = async () => {
    if (!name || !stock || !minStock || !unit) {
      return toast.error(<ErrorToastMsg />)
    }

    setIsLoading(true)
    try {
      await postIngredients({
        store_id: userInfo.storeId,
        name,
        stock,
        min_stock: minStock,
        unit
      })
      navigate('/ingredient')
      toast.success("Berhasil Menambah Bahan Baku")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllSupplier()
  }, [])

  const navigate = useNavigate()

  return (
    <div>
      <header className="flex items-center gap-5">
        <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
          navigate('/ingredient')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Tambah Bahan Baku</h1>
      </header>
      <div>
        <Card isExtend={true}>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setName} valueProp={name} labelProp={'Nama'} placeholderProp={'cth: Garam'} typeProp={'text'} inputId={'name'} />
            </div>
          </div>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[100px] flex-1">
              <Input onChangeProp={setStock} valueProp={stock} labelProp={"Stock"} placeholderProp={'cth: 20'} typeProp={'number'} inputId={'stock'} />
            </div>
            <div className="min-w-[100px] flex-1">
              <Input onChangeProp={setMinStock} valueProp={minStock} labelProp={"Min. Stock"} placeholderProp={'cth: 5'} typeProp={'number'} inputId={'min-stock'} />
            </div>
            <div className="min-w-[100px] flex-1">
              <Input onChangeProp={setUnit} valueProp={unit} labelProp={"Satuan"} placeholderProp={'cth: Kg'} typeProp={'text'} inputId={'unit'} />
            </div>
          </div>
          <Button isExtend={true} buttonType="primary" isLoading={isLoading} onClickProp={handleSubmitIngredient}>
            Simpan
          </Button>
        </Card>
      </div>
    </div>
  )
}