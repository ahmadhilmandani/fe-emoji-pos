import { IconPlus } from "@tabler/icons-react";
import Button from "../../../components/Button";
import { useNavigate } from "react-router";


export default function PhysicalProductIndexLoading() {
  const navigate = useNavigate()
  return (
    <div>
      <header className="flex justify-between items-center gap-5">
        <h1>Produk Fisik</h1>
        <Button buttonType={'primary'} onClickProp={() => {
          navigate('/product/add')
        }}>
          Tambah
          <IconPlus size={16} className="group-hover:translate-x-0.5 transition-all" />
        </Button>
      </header>
      <div>
        <div className="flex justify-between items-center gap-5 bg-white p-5 rounded-t-lg border border-b-2 border-b-yellow-300 border-gray-200">
          <div className="flex gap-1 items-stretch">
            <div className="w-[280px] h-[32px] bg-slate-100 animate-pulse rounded-full">

            </div>
            <div className="w-[32px] h-[32px] bg-slate-100 animate-pulse rounded-lg">

            </div>
          </div>
          <div className="flex items-center gap-3">
            <b>
              Tipe
            </b>
            <div className="w-[80px] h-[32px] bg-slate-100 animate-pulse rounded-full">

            </div>
            <div className="w-[80px] h-[32px] bg-slate-100 animate-pulse rounded-full">

            </div>
            <div className="w-[80px] h-[32px] bg-slate-100 animate-pulse rounded-full">

            </div>
            <div className="w-[80px] h-[32px] bg-slate-100 animate-pulse rounded-full">

            </div>
          </div>
        </div>
        <div className="w-full overflow-x-auto relative rounded-b-lg border border-gray-200 bg-white">
          <table className="min-w-[320px] w-full text-left rtl:text-right">
            <thead className="uppercase border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">
                  Nama
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Tipe
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Harga
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Stock
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Satuan
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="w-[320px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="w-[320px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  <div className="w-[320px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </th>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="w-[100px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
                <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                  <div className="w-[80px] h-[24px] bg-slate-100 animate-pulse rounded-full">
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}