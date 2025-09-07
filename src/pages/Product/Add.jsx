import { IconChevronLeft, IconDots, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../components/Card";
import { postProduct } from "../../api/postProduct";
import { toast } from "react-toastify";
import { useState } from "react";

export default function ProductAdd() {
  const [storeId, setStoreId] = useState()
  const [name, setName] = useState()
  const [typeProduct, setTypeProduct] = useState()
  const [price, setPrice] = useState()
  const [stock, setStock] = useState()
  const [unit, setUnit] = useState()

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const submitProduct = async () => {
    setIsLoading(true)
    try {
      const payload = {
        store_id: storeId,
        name: name,
        type: typeProduct,
        price: price,
        stock: stock,
        unit: unit
      }
      // return console.log(payload)
      await postProduct(payload)
      toast.success('Berhasil Menambah Produk')
      navigate('/product')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
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
              <select onChange={(e)=>{setTypeProduct(e.target.value)}} value={typeProduct} name="tipe" id="tipe" className="block w-full p-2 text-dark rounded-lg bg-gray-50 outline outline-gray-300 text-sm focus:outline-amber-500 transition-all">
                <option value="produk_jadi" className="">Jadi</option>
                <option value="produk_olahan" className="">Olahan</option>
                <option value="layanan" className="">Layanan</option>
              </select>
            </div>
            {/* <div className="min-w-[270px] flex-1">
              <Input onChangeProp={() => { }} labelProp={'Supplier'} placeholderProp={'cth: '} typeProp={'text'} inputId={'email'} />
            </div> */}
          </div>
          <Button isExtend={true} buttonType="primary" onClickProp={submitProduct} isLoading={isLoading}>
            Simpan
          </Button>
        </Card>
      </div>
    </div>
  )
}