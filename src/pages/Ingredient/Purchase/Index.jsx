import { IconEraser, IconEye, IconPencil, IconPlus, IconSearch } from "@tabler/icons-react";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getPurchase } from "../../../api/getPurchase";

export default function PurchaseIngredientIndex() {
  const navigate = useNavigate()
  const [purchaseData, setPurchaseData] = useState()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const handleGetPurchase = async () => {
      setIsLoading(true)

      try {
        const res = await getPurchase('type=ingredient')
        setPurchaseData(res.data.purchases)
        return res
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    handleGetPurchase()
  }, [])


  return (
    <div>
      <header className="flex justify-between items-center gap-5">
        <h1>Pembelian Bahan Baku</h1>
        <Button buttonType={'primary'} onClickProp={() => {
          navigate('/purchase-ingredient/add')
        }}>
          Tambah
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
                <th scope="col" className="px-6 py-4 font-bold">
                  No. Invoice
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Tipe
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Nama Supplier
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  No. Hp Supplier
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  Total
                </th>
                <th scope="col" className="px-6 py-4 font-bold">
                  {/* <span className="sr-only">Edit</span> */}
                </th>
              </tr>
            </thead>
            <tbody>
              {purchaseData?.map((val) => {
                return (
                  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50/50">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {val.purchase_code}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Bahan Baku
                    </th>
                    <td className="px-6 py-4">
                      {val.supplier_name}
                    </td>
                    <td className="px-6 py-4">
                      {val.supplier_phone}
                    </td>
                    <td className="px-6 py-4">
                      Rp. {val.total_amount}
                    </td>
                    <td className="px-6 py-4 text-right relative flex items-center gap-3 flex-wrap">
                      <button onClick={()=>{navigate(`/purchase-ingredient/${val.id}`)}} className="px-3 py-2 border border-gray-300 rounded-xl flex gap-1.5 items-center group hover:bg-amber-50 hover:cursor-pointer transition-all hover:border-amber-500">
                        <IconEye className="group-hover:-translate-y-0.5 transition-all stroke-amber-500" stroke={1.2} size={22} />
                        Detail
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