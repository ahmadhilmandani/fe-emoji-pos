import { IconChevronLeft, IconDots, IconEraser, IconLoader2, IconMinus, IconPlug, IconPlus, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../components/Card";
import { postProduct } from "../../api/postProduct";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllIngredients } from "../../api/getAllIngredients";

export default function ProductAdd() {
  const [name, setName] = useState()
  const [typeProduct, setTypeProduct] = useState('produk_jadi')
  const [price, setPrice] = useState()
  const [stock, setStock] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [screenLoading, setScreenLoading] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const navigate = useNavigate()
  const userInfo = useSelector((state) => { return state.userInfoSlie })

  const submitProduct = async () => {
    setIsLoading(true)
    try {
      const payload = {
        store_id: userInfo.storeId,
        name: name,
        type: typeProduct,
        price: price,
        stock: stock,
        unit: unit
      }
      payload.ingredient = selectedIngredients ? selectedIngredients : null
      await postProduct(payload)
      toast.success('Berhasil Menambah Produk')
      navigate('/product')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQtyListIngredients = (id, qty) => {
    if (qty >= 0) {
      const temptArr = selectedIngredients.map((val) => {
        if (val.id === id) {
          return { id: id, name: val.name, qty: qty, unit: val.unit }
        }
        return val
      })
      setSelectedIngredients(temptArr)
    }
  }

  
  const handleDeleteListIngredient = (id) => {
    setSelectedIngredients(prevItems => prevItems.filter(item => item.id !== id))
  }

  const handleChooseIngredient = (e) => {
    let isAlreadyChoose = false
    const [id, name, unit] = e.target.value.split('@')
    selectedIngredients.forEach((val) => {
      if (val.id == id) {
        toast.error('Bahan Baku Sudah Ditambahkan')
        isAlreadyChoose = true
      }
    })
    if (!isAlreadyChoose) {
      setSelectedIngredients([...selectedIngredients, { id: id, name: name, qty: null, unit: unit }])
    }
  }



  useEffect(() => {
    if (typeProduct == 'produk_olahan' && ingredients.length <= 0) {
      const getIngredients = async () => {
        setScreenLoading(true)
        try {
          const res = await getAllIngredients(userInfo.storeId)
          setIngredients(res.data.ingredients)
        } catch (error) {
          toast.error((error.response.data.msg))
        } finally {
          setScreenLoading(false)
        }
      }
      getIngredients()
    }
  }, [typeProduct])

  return (
    <div>
      {
        screenLoading && <>
          <div className="w-full h-screen fixed top-0 bottom-0 left-0 right-0 z-[20000000000000] bg-white/30 backdrop-blur-2xl flex justify-center items-center">
            <IconLoader2 className="animate-spin stroke-yellow-300" size={80} />
        </div>
        </>
      }
      <header className="flex items-center gap-5">
        <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
          navigate('/product')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Tambah Produk</h1>
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
              <Input onChangeProp={setStock} valueProp={stock} labelProp={'Stock'} placeholderProp={'cth: 100'} typeProp={'number'} inputId={'email'} />
            </div>
          </div>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setUnit} valueProp={unit} labelProp={'Satuan'} placeholderProp={'cth: porsi, liter, gram'} typeProp={'text'} inputId={'email'} />
            </div>
            <div className="min-w-[270px] flex-1">
              <label htmlFor={'tipe'} className="block mb-2 text-sm font-medium text-dark">Tipe<span className="text-red-500 inline-block ml-1">*</span></label>
              <select onChange={(e) => { setTypeProduct(e.target.value) }} value={typeProduct} name="tipe" id="tipe" className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all">
                <option value="produk_jadi" className="">Jadi</option>
                <option value="produk_olahan" className="">Olahan</option>
                <option value="layanan" className="">Layanan</option>
              </select>
            </div>
          </div>
          {
            typeProduct == 'produk_olahan' && (
              <>
                <div className="flex gap-8 items-center flex-wrap mb-3">
                  <div className="min-w-[270px] flex-1">
                    <label htmlFor={'tipe'} className="block mb-2 text-sm font-medium text-dark">Bahan Baku<span className="text-red-500 inline-block ml-1">*</span></label>
                    <select onChange={(e) => { handleChooseIngredient(e) }} name="tipe" id="tipe" className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all">
                      <option value={''} >
                        Pilih
                      </option>
                      {
                        ingredients?.map((val) => {
                          return (
                            <>
                              <option value={`${val.id}@${val.name}@${val.unit}`} className="" disabled={val.stock <= val.min_stock}>
                                {val.name}
                                {val.stock <= val.min_stock ? <small className="text-[13px]"> (<span className="text-[13px] font-black">Stock</span> Kurang Dari <span className="text-[13px] font-black">Min. Stock</span>)</small> : ''}
                              </option>
                            </>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
              </>
            )
          }
          {typeProduct == 'produk_olahan' &&
            (<>
              <div className="mb-8 border rounded-3xl border-gray-300 overflow-hidden bg-gray-50/20">
                <div className="bg-gray-100 w-full px-8 py-3 text-center font-bold">
                  List Bahan Baku Dipakai
                </div>
                <div className="p-8">
                  {
                    selectedIngredients?.map((val, index) => {
                      return (
                        <>
                          <div className="flex gap-8 items-end flex-wrap mb-8 pb-2 border-b border-gray-300">
                            <div className="max-w-[40px] flex-1 bg-amber- font-bold">
                              {++index}.
                            </div>
                            <div className="min-w-[270px] flex-1 bg-red-">
                              {val.name}
                            </div>
                            <div className="max-w-xs flex-1">
                              <label htmlFor={'qty'} className="block mb-2 text-sm font-medium text-dark">
                                Kuantitas Pakai ({val.unit}) <span className="text-red-500">*</span>
                              </label>
                              <div className="relative flex items-center">
                                <button onClick={() => { handleQtyListIngredients(val.id, val.qty - 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                  <IconMinus />
                                </button>

                                <input onChange={(e) => { handleQtyListIngredients(val.id, e.target.value) }} type="text" id="counter-input" className="shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[10.5rem] text-center" value={val.qty} placeholder={val.unit} required />

                                <button onClick={() => { handleQtyListIngredients(val.id, val.qty + 1) }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                  <IconPlus />
                                </button>
                              </div>
                            </div>
                            <div className="max-w-xs flex-1">
                              <button onClick={()=>{handleDeleteListIngredient(val.id)}} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:cursor-pointer transition-all hover:border-rose-500">
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
            </>
            )
          }

          <Button isExtend={true} buttonType="primary" onClickProp={submitProduct} isLoading={isLoading}>
            Simpan
          </Button>
        </Card>
      </div>
    </div>
  )
}