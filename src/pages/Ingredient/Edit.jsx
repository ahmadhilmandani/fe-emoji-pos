import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { IconChevronLeft } from "@tabler/icons-react"
import Card from "../../components/Card"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ErrorToastMsg from "../../components/ErrorToastMsg"
import { updateIngredients } from "../../api/updateIngredients"
import { getIngredientDetail } from "../../api/getIngredientDetail"

export default function IngredientEdit() {
  const [name, setName] = useState()
  const [minStock, setMinStock] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [price, setPrice] = useState(false)
  const [stock, setStock] = useState(false)
  const { id } = useParams()

  const handleEditIngredient = async () => {
    if (!name || !minStock || !unit) {
      return toast.error(<ErrorToastMsg />)
    }

    setIsLoading(true)
    try {
      await updateIngredients(id, {
        name,
        stock: stock,
        min_stock: minStock,
        unit,
        price
      })
      navigate('/ingredient')
      toast.success("Berhasil Mengubah Bahan Baku")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }


  const navigate = useNavigate()


  useEffect(() => {
    const handleGetDetailSale = async () => {
      setIsLoading(true)
      try {
        const res = await getIngredientDetail(id)
        setName(res.data.ingredients[0].name)
        setPrice(parseFloat(res.data.ingredients[0].price))
        setStock(parseFloat(res.data.ingredients[0].stock))
        setMinStock(parseFloat(res.data.ingredients[0].min_stock))
        setUnit(res.data.ingredients[0].unit)
      } catch (error) {
        toast.error(error.msg)
      } finally {
        setIsLoading(false)
      }
    }

    handleGetDetailSale()

  }, [])

  return (
    <div>
      <header className="flex items-center gap-5">
        <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
          navigate('/ingredient')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Edit Bahan Baku</h1>
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
              <Input onChangeProp={setPrice} valueProp={price} labelProp={"Harga"} placeholderProp={'cth: 25000'} typeProp={'number'} inputId={'price'} />
            </div>
            <div className="min-w-[100px] flex-1">
              <Input onChangeProp={setMinStock} valueProp={minStock} labelProp={"Min. Stock"} placeholderProp={'cth: 5'} typeProp={'number'} inputId={'min-stock'} />
            </div>
            <div className="min-w-[100px] flex-1">
              <Input onChangeProp={setUnit} valueProp={unit} labelProp={"Satuan"} placeholderProp={'cth: Kg'} typeProp={'text'} inputId={'unit'} />
            </div>
          </div>
          <Button isExtend={true} buttonType="primary" isLoading={isLoading} onClickProp={handleEditIngredient}>
            Edit
          </Button>
        </Card>
      </div>
    </div>
  )
}