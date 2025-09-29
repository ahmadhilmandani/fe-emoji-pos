/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { IconChevronLeft, IconPlus } from "@tabler/icons-react"
import { getDetailSale } from "../../../api/getDetailSale"
import formatRupiah from "../../../utils/formatRupiah"
import { getPurchaseDetail } from "../../../api/getPurchaseDetail"

export default function PhysicalProductPurchaseDetail() {
  const [isLoading, setIsLoading] = useState(true)
  const [dataPurchase, setDataPurchase] = useState()

  const { id } = useParams()
  const navigate = useNavigate()

  const handleGetDetailSale = async () => {
    setIsLoading(true)
    try {
      const res = await getPurchaseDetail(id, 'produk_fisik')
      setDataPurchase(res.data.purchase)
      console.log(res)
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
            navigate('/history-sales')
          }}>
            <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
          </div>
          <h1 className="mb-3">Detail Pembeliaan Produk Fisik</h1>
        </div>
      </header>
      <div className="mb-5 bg-gray-100 border border-gray-200 p-5 rounded-lg flex justify-between gap-5 flex-wrap">
        <div>
          <h3 className="mb-3">Invoice</h3>
          <div className="text-gray-500/70">
            No. Invoice : {dataPurchase?.[0]?.purchase_code}
          </div>
          <div className="text-gray-500/70">
            Tgl. Pembelian : {dataPurchase?.[0]?.created_at}
          </div>
        </div>
      </div>
      <div className="mb-5 bg-white p-5 rounded-lg border border-gray-200">
        <h3 className="mb-1">Produk </h3>
        <div className="text-gray-500/70 mb-3">
          Detail produk yang terjual
        </div>

        <div className="w-full overflow-x-auto relative">
          <table className="min-w-[320px] w-full text-left rtl:text-right">
            <thead className="uppercase border-b border-gray-200">
              <tr>
                <th scope="col" className="pr-6 py-4 font-semibold text-gray-500/70">
                  Nama
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-500/70">
                  Harga
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-500/70">
                  quantity
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-gray-500/70">
                  subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPurchase?.map((val) => {
                return (
                  <>
                    <tr className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                      <td scope="row" className="pr-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {val.item_name}
                      </td>
                      <td className="px-6 py-4">
                        Rp. {formatRupiah(parseFloat(val.price))}
                      </td>
                      <td className="px-6 py-4">
                        {parseFloat(val.quantity)}
                      </td>
                      <td className="px-6 py-4">
                        {formatRupiah(parseFloat(val.subtotal))}
                      </td>
                    </tr>
                  </>
                )
              })}

              <tr className="bg-white border-b border-gray-200">
                <td colSpan={2} className="pr-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                </td>

                <td colSpan={1} className="px-6 py-4 font-semibold border-t border-gray-300">
                  Total
                </td>
                <td colSpan={1} className="px-6 py-4 font-semibold border-t border-gray-300">
                  Rp. {formatRupiah(parseFloat(dataPurchase?.[0]?.total_amount || 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}