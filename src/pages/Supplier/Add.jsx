import { IconChevronLeft, IconDots, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../components/Card";
import { useState } from "react";
import { postSupplier } from "../../api/postSupplier";
import { toast } from "react-toastify";
import ErrorToastMsg from "../../components/ErrorToastMsg";

export default function SupplierAdd() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()

  const handleSubmitSupplier = async () => {
    if (!name || !phone || !address) {
      return toast.error(<ErrorToastMsg />)
    }
    setIsLoading(true)
    try {
      await postSupplier({name, phone, address})
      toast.success("Berhasil Menambah Supplier")
      navigate("/supplier")
    } catch (error) {
      console.log(error)
      toast.error(`Gagal : ${error.response.data.msg}`)
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
        <h1>Tambah Supplier</h1>
      </header>
      <div>
        <Card isExtend={true}>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setName} valueProp={name} labelProp={'Nama'} placeholderProp={'cth: PT. Dangklek Dunia'} typeProp={'text'} inputId={'name'} />
            </div>
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setPhone} valueProp={phone} labelProp={"No. Hp"} placeholderProp={'cth: 0128123100012'} typeProp={'text'} inputId={'phone'} />
            </div>
          </div>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={setAddress} valueProp={address} labelProp={"Alamat"} placeholderProp={'cth: jl. Kejora No. 1 Perumahan Bulan Kabupaten Sumenep'} typeProp={'text'} inputId={'address'} />
            </div>
          </div>
          <Button isExtend={true} buttonType="primary" isLoading={isLoading} onClickProp={handleSubmitSupplier}>
            Simpan
          </Button>
        </Card>
      </div>
    </div>
  )
}