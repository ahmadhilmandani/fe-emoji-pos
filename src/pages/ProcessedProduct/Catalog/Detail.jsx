import { IconChevronLeft, IconEraser, IconLoader2, IconMinus, IconPlus } from "@tabler/icons-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate, useParams } from "react-router";
import Card from "../../../components/Card";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../../api/getProductDetail";

export default function ProcessedProductDetail() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const { id } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const handleGetProduct = async () => {
      setIsLoading(true)

      try {
        const res = await getProductDetail(id)
        setName(res.data.product.name)
        setPrice(res.data.product.price)
        setUnit(res.data.product.unit)
        setIngredients(res.data.product.ingredients)
        console.log(res)
      } catch (error) {
        toast.error(error.response.data.msg)
      } finally {
        setIsLoading(false)
      }
    }

    handleGetProduct()
  }, [id])


  return (
    <div>
      <header className="flex items-center gap-5">
        <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
          navigate('/processed-product')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Tambah Produk Olahan</h1>
      </header>
      <div>
        <Card isExtend={true}>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setName} labelProp={'Nama'} placeholderProp={'cth: Sepatu Lari'} typeProp={'text'} inputId={'email'} valueProp={name} />
            </div>
          </div>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setPrice} valueProp={price} labelProp={'Harga'} placeholderProp={'cth: 20000'} typeProp={'number'} inputId={'email'} />
            </div>

            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setUnit} valueProp={unit} labelProp={'Satuan'} placeholderProp={'cth: porsi, liter, gram'} typeProp={'text'} inputId={'email'} />
            </div>
          </div>

          <div className="mb-8 border rounded-3xl border-gray-300 overflow-hidden bg-gray-50/20">
            <div className="bg-gray-100 w-full px-8 py-3 text-center font-bold">
              List Bahan Baku Dipakai
            </div>
            <div className="p-8">
              {
                ingredients?.map((val, index) => {
                  return (
                    <>
                      <div className="flex gap-8 items-end flex-wrap mb-8 pb-2 border-b border-gray-300">
                        <div className="max-w-[40px] flex-1 bg-amber- font-bold">
                          {1 + index}.
                        </div>
                        <div className="min-w-[270px] flex-1 bg-red-">
                          {val.ingredient_name}
                        </div>
                        <div className="max-w-xs flex-1">
                          <label htmlFor={'qty'} className="block mb-2 text-sm font-medium text-dark">
                            Sisa Stock ({val.stock})
                          </label>
                          <div className="relative flex items-center">
                            {val.quantity}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}