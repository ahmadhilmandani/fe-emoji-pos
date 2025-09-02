import { IconDots, IconPlus, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";

export default function ProductIndex() {
  const navigate = useNavigate()

  return (
    <div>
      <header className="flex justify-between items-center gap-5">
        <h1>Produk</h1>
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
            <Input
              valueProp={''} placeholderProp={'cari berdasarkan nama'} typeProp={'text'} inputId={'cari'} onChangeProp={() => {
              }} isRequired={false}
            />
            <div className="p-2.5 flex justify-center items-center aspect-square rounded-lg bg-yellow-300">
              <IconSearch size={16} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <b>
              Tipe
            </b>
            <Badge>
              Semua Produk
            </Badge>
            <Badge>
              Produk Jadi
            </Badge>
            <Badge>
              Produk Olahan
            </Badge>
            <Badge badgeType={'primary'} >
              Layanan
            </Badge>
          </div>
        </div>
        <div className="relative overflow-x-auto rounded-b-lg border border-gray-200">
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-gray-700 uppercase bg-white border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 text-gray-500">
                  Nama
                </th>
                <th scope="col" className="px-6 py-4 text-gray-500">
                  Tipe
                </th>
                <th scope="col" className="px-6 py-4 text-gray-500">
                  Harga
                </th>
                <th scope="col" className="px-6 py-4 text-gray-500">
                  Stock
                </th>
                <th scope="col" className="px-6 py-4 text-gray-500">
                  Satuan
                </th>
                <th scope="col" className="px-6 py-4 text-gray-500">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                  Silver
                </td>
                <td className="px-6 py-4">
                  Laptop
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
                <td className="px-6 py-4">
                  $2999
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="w-10 p-2.5 flex justify-center items-center aspect-square rounded-lg border border-gray-300 bg-gray-50">
                    <IconDots size={16} />
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