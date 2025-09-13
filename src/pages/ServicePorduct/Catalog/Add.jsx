import { IconChevronLeft } from "@tabler/icons-react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../../components/Card";
import { postProduct } from "../../../api/postProduct";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ServiceProductAdd() {
  const [name, setName] = useState()
  const [price, setPrice] = useState()
  const [unit, setUnit] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const userInfo = useSelector((state) => { return state.userInfoSlie })

  const submitProduct = async () => {
    setIsLoading(true)
    try {
      const payload = {
        store_id: userInfo.storeId,
        name: name,
        type: 'layanan',
        price: price,
        unit: unit
      }
      await postProduct(payload)
      toast.success('Berhasil Menambah Produk')
      navigate('/service-product')
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
          navigate('/service-product')
        }}>
          <IconChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-all" />
        </div>
        <h1>Tambah Produk Layanan</h1>
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
              <Input onChangeProp={setUnit} valueProp={unit} labelProp={'Satuan'} placeholderProp={'cth: 1 jam, 1 hari, perawatan'} typeProp={'text'} inputId={'email'} />
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