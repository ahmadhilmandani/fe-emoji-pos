import { IconChevronLeft, IconDots, IconSearch } from "@tabler/icons-react";
import Badge from "../../components/Badge";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import Card from "../../components/Card";

export default function ProductAdd() {
  const navigate = useNavigate()

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
              <Input onChangeProp={() => { }} labelProp={'Nama'} placeholderProp={'cth: Sepatu Lari'} typeProp={'text'} inputId={'email'} />
            </div>
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={() => { }} labelProp={'Tipe'} placeholderProp={'cth: username; user@mail.test'} typeProp={'text'} inputId={'email'} />
            </div>
          </div>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={() => { }} labelProp={'Harga'} placeholderProp={'cth: 20000'} typeProp={'number'} inputId={'email'} />
            </div>
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={() => { }} labelProp={'Stock'} placeholderProp={'cth: 100'} typeProp={'number'} inputId={'email'} />
            </div>
          </div>
          <div className="flex gap-8 items-center flex-wrap mb-8">
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={() => { }} labelProp={'Satuan'} placeholderProp={'cth: porsi, liter, gram'} typeProp={'text'} inputId={'email'} />
            </div>
            <div className="min-w-[270px] flex-1">
              <Input onChangeProp={() => { }} labelProp={'Supplier'} placeholderProp={'cth: '} typeProp={'text'} inputId={'email'} />
            </div>
          </div>
          <Button isExtend={true} buttonType="primary">
            Simpan
          </Button>
        </Card>
      </div>
    </div>
  )
}