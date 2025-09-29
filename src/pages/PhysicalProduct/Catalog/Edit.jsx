import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { IconChevronLeft, IconPlus } from "@tabler/icons-react"
import { getProductDetail } from "../../../api/getProductDetail"

import { updateProduct } from "../../../api/updateProduct"
import Card from "../../../components/Card"
import Input from "../../../components/Input"
import Button from "../../../components/Button"

export default function PhysicalProductEdit() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [minStock, setMinStock] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()
  const navigate = useNavigate()

  const handleEditProduct = async () => {
    setIsLoading(true)

    try {
      const payload = {
        name: name, 
        type: 'produk_fisik', 
        phys_prod_min_stock: minStock, 
        price: price, 
        unit: unit
      }
      await updateProduct(id, payload)
      toast.success("Berhasil Update Produk")
      navigate('/physical-product')

    } catch (error) {
      toast.error(error.msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetDetailSale = async () => {
    setIsLoading(true)
    try {
      const res = await getProductDetail(id)
      setName(res.data.product.name)
      setPrice(res.data.product.price)
      setMinStock(res.data.product.phys_prod_min_stock)
      setUnit(res.data.product.unit)
      setIsLoading(res.data.product.name)
    } catch (error) {
      toast.error(error.msg)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    handleGetDetailSale()
  }, [])


  return (
    <div>
      <header className="mb-5">
        <div className="flex items-center gap-5">
          <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
            navigate('/physical-product')
          }}>
            <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
          </div>
          <h1 className="mb-3">Edit Produk FIsik</h1>
        </div>
        <div>
          <Card isExtend={true}>
            <div className="flex gap-8 items-center flex-wrap mb-8">
              <div className="min-w-[270px] flex-1">
                <Input onChangeProp={setName} labelProp={'Nama'} placeholderProp={'cth: Sepatu Lari'} typeProp={'text'} inputId={'name'} valueProp={name} />
              </div>
              <div className="min-w-[270px] flex-1">
                <Input onChangeProp={setMinStock} labelProp={'Min. Stock'} placeholderProp={'cth: 500'} typeProp={'number'} inputId={'min_stock'} valueProp={parseFloat(minStock)} />
              </div>
            </div>
            <div className="flex gap-8 items-center flex-wrap mb-8">
              <div className="min-w-[270px] flex-1">
                <Input onChangeProp={setPrice} valueProp={parseFloat(price)} labelProp={'Harga'} placeholderProp={'cth: 20000'} typeProp={'number'} inputId={'email'} />
              </div>
              <div className="min-w-[270px] flex-1">
                <Input onChangeProp={setUnit} valueProp={unit} labelProp={'Satuan'} placeholderProp={'cth: porsi, liter, gram'} typeProp={'text'} inputId={'email'} />
              </div>
            </div>
            <Button isExtend={true} buttonType="primary" onClickProp={handleEditProduct} isLoading={isLoading}>
              Simpan
            </Button>
          </Card>
        </div>
      </header>
    </div>
  )
}