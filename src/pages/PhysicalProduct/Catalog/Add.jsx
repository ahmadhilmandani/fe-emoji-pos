import { IconChevronLeft } from "@tabler/icons-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../../components/Card";
import { postProduct } from "../../../api/postProduct";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import ErrorToastMsg from "../../../components/ErrorToastMsg";

export default function PhysicalProductAdd() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [minStock, setMinStock] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const userInfo = useSelector((state) => { return state.userInfoSlie })

  const submitProduct = async () => {
    if (!name || !price || !minStock || !unit) {
      return toast.error(<ErrorToastMsg />)
    }
    setIsLoading(true)
    try {
      const payload = {
        store_id: userInfo.storeId,
        name: name,
        type: 'produk_fisik',
        phys_prod_min_stock: minStock,
        price: price,
        unit: unit
      }
      await postProduct(payload)
      toast.success('Berhasil Menambah Produk')
      navigate('/physical-product')
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
          navigate('/physical-product')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Tambah Produk Fisik</h1>
      </header>
      <div>
        <Card isExtend={true}>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setName} labelProp={'Nama'} placeholderProp={'cth: Sepatu Lari'} typeProp={'text'} inputId={'name'} valueProp={name} />
            </div>
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setMinStock} labelProp={'Min. Stock'} placeholderProp={'cth: 500'} typeProp={'number'} inputId={'min_stock'} valueProp={minStock} />
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
          <Button isExtend={true} buttonType="primary" onClickProp={submitProduct} isLoading={isLoading}>
            Simpan
          </Button>
        </Card>
      </div>
    </div>
  )
}