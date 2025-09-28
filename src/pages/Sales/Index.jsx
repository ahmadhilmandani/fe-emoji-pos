import { IconEraser, IconEye, IconInfoCircle, IconPencil, IconPlus, IconSearch } from "@tabler/icons-react";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { getHistorySale } from "../../api/getHistorySale";
import formatRupiah from "../../utils/formatRupiah";

export default function HistorySaleIndex() {
  const navigate = useNavigate()
  const [historySales, setHistorySales] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const handleGetHistorySale = async () => {
    setIsLoading(true)

    try {
      const res = await getHistorySale()
      console.log(res)
      setHistorySales(res.data.sales)
      return res
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetHistorySale()
  }, [])

  return (
    <div>
      <header className="flex justify-between items-center gap-5">
        <h1>Riwayat Penjualan</h1>
        <Button buttonType={'primary'} onClickProp={() => {
          navigate('/sales')
        }}>
          Tambah Penjualan
          <IconPlus size={16} className="group-hover:translate-x-0.5 transition-all" />
        </Button>
      </header>
      <div>
        <div className="flex justify-between items-center gap-5 bg-white p-5 rounded-t-lg border border-b-2 border-b-yellow-300 border-gray-200">
          <div className="flex gap-1 items-stretch">
            <Input
              valueProp={''} placeholderProp={'cari berdasarkan nama'} typeProp={'text'} inputId={'cari'} onChangeProp={() => {
              }} isRequired={false}
            />
            <div className="p-2.5 flex justify-center items-center aspect-square rounded-lg bg-yellow-300">
              <IconSearch size={16} />
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto relative rounded-b-lg border border-gray-200 bg-white">
          <table className="min-w-[320px] w-full text-left rtl:text-right">
            <thead className="uppercase border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  No. Invoice
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  Diskon
                  <IconInfoCircle className="inline-block ml-1.5" size={16} />
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  Emoji POS Diskon
                  <IconInfoCircle className="inline-block ml-1.5" size={16} />
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  Pembayaran
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  Kembalian
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  Total Sebelum Diskon
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  Total
                </th>
                <th scope="col" className="px-6 py-4 font-bold whitespace-nowrap">
                  {/* <span className="sr-only">Edit</span> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {historySales?.map((val) => {
                return (
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.invoice_number}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.reguler_discount ? formatRupiah(parseFloat(val.reguler_discount)) : 0}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.emoji_discount ? formatRupiah(parseFloat(val.emoji_discount)) : 0}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.paid_amount ? formatRupiah(parseFloat(val.paid_amount)) : 0}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.change_amount ? formatRupiah(parseFloat(val.change_amount)) : 0}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.undiscount_total_amount ? formatRupiah(parseFloat(val.undiscount_total_amount)) : 0}
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.final_total_amount ? formatRupiah(parseFloat(val.final_total_amount)) : 0}
                    </td>
                    <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                      <button className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-amber-50 hover:cursor-pointer transition-all hover:border-amber-500">
                        <IconEye className="group-hover:-translate-y-0.5 transition-all stroke-amber-500" stroke={1.2} size={22} />
                        Detail
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-rose-50 hover:cursor-pointer transition-all hover:border-rose-500">
                        <IconEraser className="group-hover:-translate-y-0.5 transition-all stroke-rose-500" stroke={1.2} size={22} />
                        Hapus
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}