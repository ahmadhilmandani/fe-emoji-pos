import { IconCamera, IconChevronLeft, IconChevronRight, IconEye, IconInfoCircle, IconMinus, IconPlus, IconPointFilled, IconReportSearch } from "@tabler/icons-react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { getProductOnSale } from "../../api/getProductOnSale";
import ErrorToastMsg from "../../components/ErrorToastMsg";
import { postSale } from "../../api/postSale";

export default function SaleAdd() {
  const [isLoading, setIsLoading] = useState(false)
  const [dataProducts, setDataProducts] = useState()
  const [listSaleProd, setListSaleProd] = useState([])
  const [undiscountTotal, setUndiscountTotal] = useState(0)
  const [totalAmount, setTotalAmmount] = useState(0)
  const [regulerDiscount, setRegulerDiscount] = useState(0)
  const [paidAmount, setPaidAmount] = useState(0)
  const [changeAmount, setChangeAmount] = useState(0)
  const [isBtnSaleShow, setIsBtnSaleShow] = useState(false)
  const [msgBtnHide, setMsgBtnHide] = useState('')

  const navigate = useNavigate()

  function togleSaleBtn(isShow, msg = '') {
    setIsBtnSaleShow(isShow)
    setMsgBtnHide(msg)

  }
  function formatRupiah(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const getProducts = async () => {
    try {
      const res = await getProductOnSale()

      res.data.products.forEach((val, index) => {
        if (val.type == 'produk_fisik') {
          if (val.stock < val.phys_prod_min_stock) {
            res.data.products[index].is_can_sale = false
          } else {
            res.data.products[index].is_can_sale = true
          }
        } else if (val.type == 'produk_olahan') {
          let isCanSale = true
          val.ingredients.forEach((valIngdt) => {
            if (valIngdt.stock < valIngdt.min_stock) {
              isCanSale = false
            }
          })
          res.data.products[index].is_can_sale = isCanSale
        } else {
          res.data.products[index].is_can_sale = true
        }
      })
      setDataProducts(res.data.products)
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }


  const handleQtyList = (id, type, used_product_qty) => {
    if (used_product_qty >= 1) {
      setListSaleProd((prevState) => {

        if (type === "produk_fisik") {
          return prevState.map((val) => {
            if (val.id == id && (val.current_stock - used_product_qty) > val.min_stock) {
              return { ...val, used_product_qty: used_product_qty }
            } else if (val.id == id && (val.current_stock - used_product_qty) < val.min_stock) {
              toast.error(`Gagal, Menjual ${used_product_qty} ${val.name} Membuat Stock Kurang Dari Batas Minimal`)
            }
            return val
          })
        } else if (type === "produk_olahan") {
          return prevState.map((val) => {
            if (val.id == id) {
              let isStockEnough = true

              val.ingredients.forEach(rowIngredient => {
                if ((rowIngredient.stock - (rowIngredient.quantity * (used_product_qty))) < rowIngredient.min_stock) {
                  toast.error(`Bahan Baku ${rowIngredient.ingredient_name} kurang untuk membuat ${used_product_qty} ${val.name}`)
                  isStockEnough = false
                }
              })

              if (isStockEnough) {
                return {
                  ...val,
                  used_product_qty: used_product_qty,
                }
              }
              return val
            }
            return val
          })
        }
        return prevState.map((val) => {
          if (val.id == id) {
            return { ...val, used_product_qty: used_product_qty }
          }
          return val
        })
      }
      )
    }
  }


  const addListSalesProd = (id, type, price, current_stock, min_stock, ingredient, name, is_can_sale) => {
    if (is_can_sale) {
      setListSaleProd((prevState) => {
        const alreadyAdded = prevState.some((val) => val.id === id);

        if (!alreadyAdded) {
          return [
            ...prevState,
            {
              id: id,
              type: type,
              price: price,
              current_stock: current_stock,
              min_stock: min_stock,
              used_product_qty: 1,
              name: name,
              ingredients: ingredient || null
            }
          ]
        }


        if (type === "produk_fisik") {
          return prevState.map((val) => {
            if (val.id == id && (val.current_stock - (val.used_product_qty + 1)) > val.min_stock) {
              return { ...val, used_product_qty: val.used_product_qty + 1 }
            } else if (val.id == id && (val.current_stock - (val.used_product_qty + 1)) < val.min_stock) {
              toast.error(`Gagal, Menjual ${val.used_product_qty + 1} ${val.name} Membuat Stock Kurang Dari Batas Minimal`)
            }
            return val
          })
        } else if (type === "produk_olahan") {
          return prevState.map((val) => {
            if (val.id == id) {
              let isStockEnough = true

              val.ingredients.forEach(rowIngredient => {
                if ((rowIngredient.stock - (rowIngredient.quantity * (val.used_product_qty + 1))) < rowIngredient.min_stock) {
                  toast.error(`Bahan Baku ${rowIngredient.ingredient_name} kurang untuk membuat ${val.used_product_qty + 1} ${name}`)
                  isStockEnough = false
                }
              })

              if (isStockEnough) {
                return {
                  ...val,
                  used_product_qty: val.used_product_qty + 1,
                }
              }
              return val
            }
            return val
          })
        }
        return prevState.map((val) => {
          if (val.id == id) {
            return { ...val, used_product_qty: val.used_product_qty + 1 }
          }
          return val
        })
      }
      )
    }
  }




  const handleDiscount = (discount) => {
    setRegulerDiscount(discount)
  }


  const submitProduct = async () => {
    setIsLoading(true)

    try {
      const payload = {
        final_total_amount: totalAmount,
        reguler_discount: regulerDiscount,
        undiscount_total_amount: undiscountTotal,
        sales: listSaleProd,
        paid_amount: paidAmount,
        change_amount: changeAmount,
      }

      await postSale(payload)

      toast.success('Berhasil Menjual Produk')
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let temptUndiscountTotal = 0
    listSaleProd.forEach(val => {
      temptUndiscountTotal = temptUndiscountTotal + (val.price * val.used_product_qty)
    })
    setUndiscountTotal(temptUndiscountTotal)
  }, [listSaleProd])

  useEffect(() => {
    const totalAmountTemp = undiscountTotal - regulerDiscount
    if (totalAmountTemp < 0) {
      togleSaleBtn(false, 'Diskon Melebihi Total')
      setTotalAmmount(0)
    } else {
      setTotalAmmount(totalAmountTemp)
      togleSaleBtn(true)
    }

  }, [undiscountTotal, regulerDiscount])

  useEffect(() => {
    if (totalAmount - paidAmount <= 0 && (totalAmount != 0)) {
      setChangeAmount(Math.abs(totalAmount - paidAmount))
      togleSaleBtn(true)
    } else {
      setChangeAmount(0)
      togleSaleBtn(false, 'Pilih 1 produk dan pembayaran harus Sama atau lebih dari total')
    }
  }, [totalAmount, paidAmount])

  useEffect(() => {
    getProducts()
  }, [])



  return (
    <div>
      <div className="flex gap-4">
        <div className="min-w-[70%] flex-1 ">
          <header className="mb-8">
            <div className="flex items-center gap-5">
              <div className="w-10 h-fit p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-white hover:cursor-pointer hover:bg-gray-50 transition-all group" onClick={() => {
                navigate('/Sale-physical-product')
              }}>
                <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
              </div>
              <h1 className="mb-3">Penjualan</h1>
            </div>
            <div className="flex gap-5 max-w-[800px]">
              <div className="size-24"></div>
              <div>
                <div className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, perspiciatis. Recusandae earum explicabo sit id consectetur quidem repellendus sequi expedita! Veniam numquam a doloremque placeat laboriosam pariatur corrupti ullam obcaecati.
                </div>
              </div>
            </div>
          </header>
          <div>
            <div className="flex flex-wrap gap-5">
              {dataProducts?.map((val) => {
                return (
                  <>
                    <div className={`${val.is_can_sale ? 'bg-white ' : 'bg-white/80'} rounded-t-3xl rounded-b-3xl xl w-[280px] p-7 border border-gray-200 items-start h-fit`}>
                      {
                        val.type == "produk_fisik" ?
                          <>
                            <small className={`inline-block mb-2.5 bg-lime-50/65 border border-lime-500 py-0.5 px-2 text-lime-500 rounded-full text-[10px]`}>
                              Produk Fisik
                            </small>
                          </>
                          :
                          val.type == "produk_olahan" ?
                            <>
                              <small className={`inline-block mb-2.5 bg-fuchsia-50 border border-fuchsia-400 py-0.5 px-2 text-fuchsia-400 rounded-full text-[10px]`}>
                                Olahan
                              </small>
                            </>
                            :
                            val.type == "layanan" ?
                              <>
                                <small className={`inline-block mb-2.5 bg-sky-50 border border-sky-400 py-0.5 px-2 text-sky-400 rounded-full text-[10px]`}>
                                  Layanan
                                </small>
                              </>
                              :
                              ''
                      }

                      <div className="flex justify-between gap-6 mb-5">
                        <div>
                          <b className={`${val.is_can_sale ? '' : 'text-gray-400/70'} block font-semibold text-2xl mb-2 capitalize transition-all`}>
                            {val.name}
                          </b>
                          <div className={`${val.is_can_sale ? '' : 'text-gray-400/70'} font-medium text-xl mb-3 transition-all`}>
                            Rp. {val.price}
                          </div>
                          {(val.stock || val.stock == 0) && <>
                            <div className="min-w-[100px] flex gap-2">
                              <small className={`${val.is_can_sale ? 'text-gray-500/70' : 'text-red-300'} transition-all inline-block`}>
                                Stok :
                              </small>
                              <div className={`${val.is_can_sale ? 'text-gray-500/70' : 'text-red-300'} transition-all`}>
                                {val.stock}
                              </div>
                            </div>
                          </>
                          }
                          {val.phys_prod_min_stock && <>
                            <div className="min-w-[100px] flex gap-2 mb-5">
                              <small className={`${val.is_can_sale ? 'text-gray-500/70' : 'text-red-300'} transition-all inline-block`}>Min. Stok :</small>
                              <div className={`${val.is_can_sale ? 'text-gray-500/70' : 'text-red-300'} transition-all`}>
                                {val.phys_prod_min_stock}
                              </div>
                            </div>
                          </>
                          }
                        </div>

                        <div className="relative flex flex-col gap-5 items-center">
                          <button onClick={() => {
                            addListSalesProd(val.id, val.type, val.price, val.stock, val.phys_prod_min_stock, val.ingredients, val.name, val.is_can_sale)
                          }} className={`${val.is_can_sale ? 'hover:bg-gray-50 hover:cursor-pointer hover:border-gray-400 opacity-100' : 'opacity-50 hover:cursor-not-allowed'} p-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group transition-all`}>
                            <IconPlus className={`${val.is_can_sale ? 'text-gray-500/70' : 'text-rose-300'} group-hover:-translate-y-0.5 transition-all stroke-gray-500`} stroke={1.2} size={22} />
                          </button>
                        </div>
                      </div>

                      {val.ingredients && <>
                        <div className="pt-5 border-t border-dashed border-gray-400 w-full">
                          <div className="mb-1">
                            Bahan Baku
                          </div>
                          <ul className="list-decimal list-inside">
                            {val.ingredients.map((valIngredient) => {
                              return (
                                <>
                                  <li className="mb-2">
                                    {valIngredient.ingredient_name} : {valIngredient.quantity} {valIngredient.unit}
                                    <div className="min-w-[100px] flex gap-2">

                                      <small className={`${valIngredient.stock < valIngredient.min_stock ? 'text-red-300' : 'text-gray-500/70'} inline-block transition-all`}>
                                        Stok :
                                      </small>
                                      <div className={`${valIngredient.stock < valIngredient.min_stock ? 'text-red-300' : 'text-gray-500/70'} transition-all`}>
                                        {valIngredient.stock} {valIngredient.unit}
                                      </div>
                                    </div>
                                    <div className="min-w-[100px] flex gap-2">
                                      <small className={`${valIngredient.stock < valIngredient.min_stock ? 'text-red-300' : 'text-gray-500/70'} inline-block transition-all`}>
                                        Min. Stok :
                                      </small>
                                      <div className={`${valIngredient.stock < valIngredient.min_stock ? 'text-red-300' : 'text-gray-500/70'} transition-all`}>
                                        {valIngredient.min_stock} {valIngredient.unit}
                                      </div>
                                    </div>
                                  </li>
                                </>
                              )
                            })
                            }
                          </ul>
                        </div>
                      </>
                      }
                    </div>
                  </>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-2xl">
          <div className="flex justify-between items-center gap-5 bg-white p-5 border border-b-2 border-b-yellow-300 border-gray-200">
            <div className="flex gap-1 items-stretch font-bold text-xl text-yellow-500">
              Daftar Penjualan Produk
            </div>
          </div>
          <div className="w-full border border-gray-200 bg-white p-5">
            {listSaleProd?.map((val, index) => {
              return (
                <>
                  <div key={val.id} className="flex gap-1 py-3">
                    <div className="font-bold mb-1">
                      <span>{1 + index}. </span>
                    </div>
                    <div className="w-full">
                      <div className="font-bold mb-1 text-lg">
                        {val.name}

                        {
                          val.type == "produk_fisik" ?
                            <>
                              <small className={`inline-block ml-2 bg-lime-50/65 border border-lime-500 py-0.5 px-2 text-lime-500 rounded-full text-[10px]`}>
                                Produk Fisik
                              </small>
                            </>
                            :
                            val.type == "produk_olahan" ?
                              <>
                                <small className={`inline-block ml-2 bg-fuchsia-50 border border-fuchsia-400 py-0.5 px-2 text-fuchsia-400 rounded-full text-[10px]`}>
                                  Olahan
                                </small>
                              </>
                              :
                              val.type == "layanan" ?
                                <>
                                  <small className={`inline-block ml-2 bg-sky-50 border border-sky-400 py-0.5 px-2 text-sky-400 rounded-full text-[10px]`}>
                                    Layanan
                                  </small>
                                </>
                                :
                                ''
                        }

                      </div>
                      <div className="mb-3">
                        <div className="flex gap-5 justify-between">
                          <div className="min-w-[80px] flex-1">
                            <small className="text-gray-400 mb-1 inline-block">Harga</small>
                            <div>
                              Rp. {val.price}
                            </div>
                          </div>
                          <div className="min-w-[10px]">
                            <small className="text-gray-400 mb-1 inline-block"> Qty <span className="text-red-500">*</span></small>
                            <div className="relative flex gap-5 items-center">
                              <button onClick={() => { handleQtyList(val.id, val.type, val.used_product_qty - 1) }} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                <IconMinus />
                              </button>

                              <input onChange={(e) => { handleQtyList(val.id, val.type, e.target.value) }} value={val.used_product_qty} type="text" id="counter-input" className="shrink-0 border-x-0 border-t-0 border-b border-gray-300 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 w-[40px] text-center" required />

                              <button onClick={() => { handleQtyList(val.id, val.type, val.used_product_qty + 1) }} type="button" id="increment-button" data-input-counter-increment="counter-input" className="shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                <IconPlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
            <div className="sticky bottom-0 left-0 right-0 bg-white rounded-b-lg pt-3 pb-5 border-t border-gray-200 border-dashed">
              <div className="mb-5">
                <small className="text-gray-400 mb-1 inline-block">Diskon</small>
                <input value={regulerDiscount} onChange={(e) => {
                  handleDiscount(e.target.value)
                }} placeholder={"placeholderProp"} type={"number"} id={"inputId"} className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all" />
              </div>
              <div className="mb-5">
                <small className="text-gray-400 mb-1 inline-block">Pembayaran</small>
                <input value={paidAmount} onChange={(e) => {
                  setPaidAmount(e.target.value)
                }} placeholder={"placeholderProp"} type={"number"} id={"inputId"} className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all" />
              </div>
              <div className="p-5 mb-5 bg-gray-100/70 rounded-xl">
                <div className="border-b border-dashed border-gray-400 pb-4">
                  <div className="flex justify-between gap-3 mb-3">
                    <div className="text-gray-500/70">Total Sblm. Diskon</div>
                    <div className="font-bold text-gray-500/70">Rp.  {formatRupiah(undiscountTotal)}</div>
                  </div>
                  <div className="flex justify-between gap-3 mb-3">
                    <div className="text-gray-500/70">
                      Diskon
                      <IconInfoCircle className="inline-block ml-1.5" size={16} />
                    </div>
                    <div className="font-bold text-gray-500/70">Rp. {formatRupiah(regulerDiscount)}</div>
                  </div>
                  <div className="flex justify-between gap-3 mb-3">
                    <div className=" gap-2 items-center">
                      <div className="text-gray-500/70 mb-1.5">
                        Emoji POS Diskon
                        <IconInfoCircle className="inline-block ml-1.5" size={16} />
                      </div>
                    </div>
                    <div className="font-bold text-gray-500/70">
                      Rp. 0
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-3 pt-4">
                  <div className="text-lg">Total</div>
                  <div className="font-bold text-lg">Rp. {formatRupiah(totalAmount)}</div>
                </div>
                <div className="flex justify-between gap-3 pt-4">
                  <div className="text-lg">Pembayaran</div>
                  <div className="font-bold text-lg">Rp. {formatRupiah(paidAmount)}</div>
                </div>
                <div className="flex justify-between gap-3 pt-4">
                  <div className="text-lg">Kembalian</div>
                  <div className="font-bold text-lg">Rp. {formatRupiah(changeAmount)}</div>
                </div>
              </div>
              <div>
                <div className="mb-5">
                  <div className="flex gap-5 items-center">
                    <button className="flex-1 px-3 py-2 border border-gray-300 rounded-xl flex justify-center gap-1.5 items-center group hover:bg-purple-50 hover:cursor-pointer transition-all hover:border-purple-500">
                      <IconReportSearch className="group-hover:-translate-y-0.5 transition-all stroke-purple-500" stroke={1.2} size={22} />
                      Hasil Emoji
                    </button>
                    <button className="flex-1 px-3 py-2 border border-gray-300 rounded-xl flex justify-center gap-1.5 items-center group hover:bg-amber-50 hover:cursor-pointer transition-all hover:border-amber-500">
                      <IconCamera className="group-hover:-translate-y-0.5 transition-all stroke-amber-500" stroke={1.2} size={22} />
                      Ulang Emoji
                    </button>
                  </div>
                </div>
                {isBtnSaleShow ? <>
                  <Button buttonType={'primary'} isExtend={true} onClickProp={submitProduct} isLoading={isLoading}>
                    Jual
                  </Button>
                </> : <>
                  <div className="text-rose-500 text-center">
                    {msgBtnHide}
                  </div>
                </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}