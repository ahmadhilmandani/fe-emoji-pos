import { IconChevronLeft, IconMinus, IconPlus, IconPointFilled } from "@tabler/icons-react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ErrorToastMsg from "../../../components/ErrorToastMsg";
import { getProduct } from "../../../api/getProduct";
import { getSupplier } from "../../../api/getSupplier";
import { postPurchase } from "../../../api/postPurchae";

export default function PurchasePhysicalProductAdd() {
  const [isLoading, setIsLoading] = useState(false)
  const [dataProducts, setDataProducts] = useState()
  const [listPurchaseProd, setListPurchaseProd] = useState([])
  const [supplierData, setSupplierData] = useState()
  const [selectedSupplier, setSelectedSupplier] = useState()
  const [totalAmount, setTotalAmmount] = useState(0)

  const navigate = useNavigate()

  const getAllSupplier = async () => {
    try {
      const res = await getSupplier()
      setSupplierData(res.data.supplier)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  const getProducts = async () => {
    try {
      const res = await getProduct(`?type=produk_fisik`)
      setDataProducts(res.data.products)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQtyList = (id, quantity) => {
    if (quantity >= 1) {
      setListPurchaseProd(prevVal =>
        prevVal.map(val =>
          val.id === id ? { ...val, quantity: quantity, subtotal: (quantity * val.price) - val.discount } : val
        )
      )
    }
  }

  const handleDiscount = (id, discount) => {
    setListPurchaseProd(prevVal =>
      prevVal.map(val =>
        val.id === id ? { ...val, discount: discount, subtotal: (val.quantity * val.price) - discount } : val
      )
    )
  }

  const addListPurchaseProd = (id, price, current_qty, name) => {
    setListPurchaseProd((prev) => {
      const alreadyAdded = prev.some((prod) => prod.id === id)

      if (alreadyAdded) return prev.map(val =>
        val.id === id ? { ...val, quantity: val.quantity + 1, subtotal: ((val.quantity + 1) * val.price) - val.discount } : val
      )

      return [
        ...prev,
        {
          name: name,
          id: id,
          price,
          current_qty,
          quantity: 1,
          subtotal: price * 1,
          discount: 0
        },
      ]
    })
  }


  const submitProduct = async () => {
    if (!selectedSupplier) {
      return toast.error(<ErrorToastMsg />)
    }
    setIsLoading(true)

    try {
      const payload = {
        supplier_id: selectedSupplier,
        total_amount: totalAmount,
        type: 'phys_prod',
        purchase_detail: []
      }

      listPurchaseProd.forEach(val => {
        payload.purchase_detail.push({
          phys_product_id: val.id,
          price: val.price,
          current_qty: val.current_qty,
          quantity: val.quantity,
          discount: val.discount,
          subtotal: val.subtotal
        })
      })
      await postPurchase(payload)
      toast.success('Berhasil Membeli Produk')
      navigate('/purchase-physical-product')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let temptSubTotal = 0
    listPurchaseProd.forEach(val => {
      temptSubTotal = temptSubTotal + val.subtotal
    })
    setTotalAmmount(temptSubTotal)
  }, [listPurchaseProd])

  useEffect(() => {
    getAllSupplier()
    getProducts()
  }, [])



  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center gap-5">
          <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
            navigate('/purchase-physical-product')
          }}>
            <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
          </div>
          <h1 className="mb-3">Beli Produk Fisik</h1>
        </div>
        <div className="flex gap-5 max-w-[800px]">
          <div className="size-10"></div>
          <div>
            <div className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, perspiciatis. Recusandae earum explicabo sit id consectetur quidem repellendus sequi expedita! Veniam numquam a doloremque placeat laboriosam pariatur corrupti ullam obcaecati.
            </div>
          </div>
        </div>
      </header>

      <div className="flex gap-4">
        <div className="min-w-[75%] flex-1">
          <div className="flex justify-between items-center gap-5 bg-white p-5 rounded-t-lg border border-b-2 border-b-yellow-300 border-gray-200">
            <div className="flex gap-1 items-stretch font-bold text-xl text-yellow-500">
              Daftar Produk
            </div>
          </div>
          <div className="w-full overflow-x-auto relative rounded-b-lg border border-gray-200 bg-white">
            <table className="min-w-[320px] w-full text-left rtl:text-right">
              <thead className="uppercase border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-400">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-400">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-400">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-400">
                    Min. Stock
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-400">
                    Satuan
                  </th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-400">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataProducts?.map((val) => {
                  return (
                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                      <td className="px-6 py-4">
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
                        <button onClick={() => { addListPurchaseProd(val.id, val.price, val.stock, val.name) }} className="p-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-amber-50 hover:cursor-pointer transition-all hover:border-amber-500">
                          <IconPlus className="group-hover:-translate-y-0.5 transition-all stroke-amber-500" stroke={1.2} size={22} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="flex justify-between items-center gap-5 bg-white p-5 rounded-t-lg border border-b-2 border-b-yellow-300 border-gray-200">
            <div className="flex gap-1 items-stretch font-bold text-xl text-yellow-500">
              Daftar Pembelian Produk
            </div>
          </div>
          <div className="w-full overflow-x-auto relative border border-b-0 border-gray-200 bg-white p-5">
            <div className="min-w-[270px] flex-1 pb-8 border-b border-gray-300">
              <label htmlFor={'ingredient'} className="block mb-2 text-sm font-medium text-dark">Supplier<span className="text-red-500 inline-block ml-1">*</span></label>
              <select onChange={(e) => { setSelectedSupplier(e.target.value) }} value={selectedSupplier} name="ingredient" id="ingredient" className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all">
                <option value={''} >
                  Pilih
                </option>
                {
                  supplierData?.map((val) => {
                    return (
                      <>
                        <option key={val.id} value={`${val.id}`}>
                          {val.name}
                        </option>
                      </>
                    )
                  })
                }
              </select>
            </div>

            {listPurchaseProd?.map((val, index) => {
              return (
                <>
                  <div key={val.id} className="flex gap-1 pt-6 pb-8 mb-5 border-b border-gray-300">
                    <div className="font-bold mb-1">
                      <span>{1 + index}. </span>
                    </div>
                    <div>
                      <div className="font-bold mb-3">
                        {val.name}
                      </div>
                      <div className="mb-3">
                        <div className="flex gap-5">
                          <div className="min-w-[100px] grow-[2]">
                            <small className="text-gray-400 mb-1 inline-block">Harga</small>
                            <div>
                              Rp. {val.price}
                            </div>
                          </div>
                          <div className="min-w-[30px] flex-1">
                            <small className="text-gray-400 mb-1 inline-block"> Qty <span className="text-red-500">*</span></small>

                            <div className="relative flex gap-5 items-center">
                              <button onClick={() => { handleQtyList(val.id, val.quantity - 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                <IconMinus />
                              </button>

                              <input onChange={(e) => { handleQtyList(val.id, e.target.value) }} value={val.quantity} type="text" id="counter-input" className="shrink-0 text-gray-900 border-0 border-b border-gray-400 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 w-[40px] text-center" required />

                              <button onClick={() => { handleQtyList(val.id, val.quantity + 1) }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                <IconPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <small className="text-gray-400 mb-1">Diskon</small>
                        <input value={val.discount} onChange={(e) => {
                          handleDiscount(val.id, e.target.value)
                        }} placeholder={"placeholderProp"} type={"number"} id={"inputId"} className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all" />
                      </div>
                      <div className="mb-3">
                        <small className="text-gray-400 mb-1">Sub. Total</small>
                        <div className="font-semibold">Rp {val.subtotal}</div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
            <div className="pb-5 border-b border-gray-300 flex flex-col items-center">
              <div className="font-bold">Total</div>
              <div className="font-bold text-yellow-500">Rp. {totalAmount}</div>
            </div>
          </div>
          <div className="bg-white p-5 border border-gray-200 rounded-b-lg sticky bottom-0 left-0 right-0">
            <Button buttonType={'primary'} isExtend={true} onClickProp={submitProduct} isLoading={isLoading}>
              Beli
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}