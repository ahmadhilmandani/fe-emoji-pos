import { IconChevronLeft, IconEraser, IconLoader2, IconMinus, IconPencil, IconPlus } from "@tabler/icons-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate, useParams } from "react-router";
import Card from "../../../components/Card";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../../api/getProductDetail";
import { getAllIngredients } from "../../../api/getAllIngredients";
import { updateProduct } from "../../../api/updateProduct";

export default function ProcessedProductEdit() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [usedIngredients, setUsedIngredients] = useState([])
  const { id } = useParams()
  const [ingredientsOpt, setIngredientsOpt] = useState([])
  const [screenLoading, setScreenLoading] = useState(false)

  const navigate = useNavigate()

  const handleEditProduct = async () => {
    setIsLoading(true)
    try {
      const payload = {
        name: name,
        type: 'produk_olahan',
        price: price,
        unit: unit,
        ingredient: usedIngredients,
      }
      await updateProduct(id, payload)
      toast.success('Berhasil Mengubah Produk Olahan')
      navigate('/processed-product/')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }


  const handleQtyListIngredients = (id, qty) => {
    // if (qty >= 0) {
    const temptArr = usedIngredients.map((val) => {
      if (val.id === id) {
        return { ...val, qty: qty >= 0 ? qty : 0 }
      }
      return val
    })
    setUsedIngredients(temptArr)
    // }
  }


  const handleDeleteListIngredient = (id) => {
    setUsedIngredients(prevItems => prevItems.filter(item => item.id !== id))
  }


  const handleChooseIngredient = (e) => {
    let isAlreadyChoose = false
    const [id, name, unit, stockLeft] = e.target.value.split('@')
    usedIngredients.forEach((val) => {
      if (val.id == id) {
        toast.error('Bahan Baku Sudah Ditambahkan')
        isAlreadyChoose = true
      }
    })
    if (!isAlreadyChoose) {
      setUsedIngredients([...usedIngredients, { id: id, name: name, qty: 0, unit: unit, stock: stockLeft }])
    }
  }


  useEffect(() => {
    const handleGetProduct = async () => {
      setIsLoading(true)

      try {
        const res = await getProductDetail(id)
        setName(res.data.product.name)
        setPrice(res.data.product.price)
        setUnit(res.data.product.unit)
        setUsedIngredients(res.data.product.ingredients.map((val) => {
          return {
            id: val.ingredient_id,
            name: val.ingredient_name,
            qty: val.quantity,
            stock: val.stock
          }
        }))
        console.log(res)
      } catch (error) {
        toast.error(error.response.data.msg)
      } finally {
        setIsLoading(false)
      }
    }

    handleGetProduct()
  }, [id])

  useEffect(() => {
    const getIngredients = async () => {
      setScreenLoading(true)
      try {
        const res = await getAllIngredients()
        setIngredientsOpt(res.data.ingredients)
      } catch (error) {
        toast.error((error.response.data.msg))
      } finally {
        setScreenLoading(false)
      }
    }
    getIngredients()
  }, [])


  return (
    <div>
      <header className="flex items-center gap-5">
        <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
          navigate('/processed-product')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Edit Produk Olahan</h1>
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

          <div className="flex gap-8 items-center flex-wrap mb-3">
            <div className="min-w-[270px] flex-1">
              <label htmlFor={'ingredient'} className="block mb-2 text-sm font-medium text-dark">Bahan Baku<span className="text-red-500 inline-block ml-1">*</span></label>
              <select onChange={(e) => { handleChooseIngredient(e) }} name="ingredient" id="ingredient" className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all">
                <option value={''} >
                  Pilih
                </option>
                {
                  ingredientsOpt?.map((val) => {
                    return (
                      <>
                        <option value={`${val.id}@${val.name}@${val.unit}@${val.stock}`} className="">
                          {val.name}
                        </option>
                      </>
                    )
                  })
                }
              </select>
            </div>
          </div>

          <div className="mb-8 border rounded-3xl border-gray-300 overflow-hidden bg-gray-50/20">
            <div className="bg-gray-100 w-full px-8 py-3 text-center font-bold">
              List Bahan Baku Dipakai
            </div>
            <div className="p-8">
              {
                usedIngredients?.map((val, index) => {
                  return (
                    <>
                      <div key={val.id} className="flex gap-8 items-end flex-wrap mb-8 pb-2 border-b border-gray-300">
                        <div className="max-w-[40px] flex-1 bg-amber- font-bold">
                          {1 + index}.
                        </div>
                        <div className="min-w-[270px] flex-1 bg-red-">
                          {val.name}
                        </div>
                        <div className="max-w-xs flex-1">
                          <label htmlFor={'qty'} className="block mb-2 text-sm font-medium text-dark">
                            Sisa Stock ({val.stock})
                          </label>
                          <div className="relative flex items-center">
                            {val.qty}
                          </div>
                        </div>
                        <div className="relative flex items-center">
                          <button onClick={() => { handleQtyListIngredients(val.id, parseFloat(val.qty) - 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                            <IconMinus />
                          </button>

                          <input onChange={(e) => { handleQtyListIngredients(val.id, parseFloat(e.target.value)) }} type="text" id="counter-input" className="shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[10.5rem] text-center" value={val.qty} placeholder={val.unit} required />

                          <button onClick={() => { handleQtyListIngredients(val.id, parseFloat(val.qty) + 1) }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                            <IconPlus />
                          </button>
                        </div>
                        <div>
                          <button onClick={() => { handleDeleteListIngredient(val.id) }} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:cursor-pointer transition-all hover:border-rose-500">
                            <IconEraser className="group-hover:-translate-y-0.5 transition-all stroke-rose-500" stroke={1.2} size={22} />
                            Hapus
                          </button>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>
          </div>
          <div className="flex gap-5">
            <Button isExtend={true} buttonType="danger" onClickProp={() => { navigate('/processed-product') }} isLoading={isLoading}>
              Batal
            </Button>
            <Button isExtend={true} buttonType="primary" onClickProp={handleEditProduct} isLoading={isLoading}>
              Simpan
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}