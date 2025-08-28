import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input";
import { setAddressStore, setNameStore, setPhoneStore } from "../../../redux/slice/registerStoreSlice";

export default function RegisterStoreSection() {

  const dispatch = useDispatch()

  const nameStore = useSelector((state) => state.registerStoreSlice.nameStore)
  const addressStore = useSelector((state) => state.registerStoreSlice.addressStore)
  const phoneStore = useSelector((state) => state.registerStoreSlice.phoneStore)


  return (
    <>
      <h2 className="mb-5 text-center">
        Pengisian Informasi Toko 🏪
      </h2>
      <div className="flex gap-6 flex-wrap">
        <div className="min-w-[280px] flex-1">
          <Input valueProp={nameStore} labelProp='Nama Toko' placeholderProp='Nama Toko' typeProp='text' inputId='name' onChangeProp={(e) => { dispatch(setNameStore(e)) }} />
        </div>
        <div className="min-w-[280px] flex-1">
          <Input valueProp={addressStore} labelProp='Alamat Toko' placeholderProp='Alamat Toko' typeProp='text' inputId='address' onChangeProp={(e) => { dispatch(setAddressStore(e)) }} />
        </div>
        <div className="min-w-[280px] shrink-0 w-full">
          <Input valueProp={phoneStore} labelProp='No. Hp Toko' placeholderProp='No. Hp Toko' typeProp='text' inputId='phone_store' onChangeProp={(e) => { dispatch(setPhoneStore(e)) }} />
        </div>
      </div>
    </>
  )
}