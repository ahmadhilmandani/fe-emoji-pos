import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { IconChevronLeft, IconPencil, IconPlus } from "@tabler/icons-react"
import { getStore } from "../../api/getStore"
import Button from "../../components/Button"
import Input from "../../components/Input"
import { updateStore } from "../../api/updateStore"



export default function StoreEdit() {
  const [isLoading, setIsLoading] = useState(true)
  const [storeName, setStoreName] = useState()
  const [storeAddress, setStoreAddress] = useState()
  const [storePhone, setStorePhone] = useState()
  const [storeMaxEmoji, setStoreMaxEmoji] = useState()

  const navigate = useNavigate()

  const handleGetStore = async () => {
    setIsLoading(true)
    try {
      const res = await getStore()
      setStoreName(res.data.store[0].name)
      setStoreAddress(res.data.store[0].address)
      setStorePhone(res.data.store[0].phone)
      setStoreMaxEmoji(res.data.store[0].percentage_max_emoji_disc)
      console.log(res)
    } catch (error) {
      toast.error(error.msg)
    } finally {
      setIsLoading(false)
    }
  }


  const submitStore = async () => {
    setIsLoading(true)
    try {
      await updateStore({
        name: storeName,
        address: storeAddress,
        phone: storePhone,
        percentage_max_emoji_disc: storeMaxEmoji
      })
      toast.success('Berhasil Mengubah Data Toko')
      navigate('/store')
    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    handleGetStore()
  }, [])


  return (
    <div>
      <header className="mb-8">
        <div className="items-center gap-5">
          <h1 className="mb-3">Edit Data Toko</h1>
        </div>
      </header>
      <div className="mb-5 bg-white p-5 rounded-lg border border-gray-200">
        <div className="flex gap-8 flex-wrap items-center">
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <Input valueProp={storeName} labelProp={'Nama Toko'} placeholderProp={'Isi Nama Toko'} typeProp={'text'} inputId={'nama'} onChangeProp={setStoreName} />
          </div>
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <Input valueProp={storeAddress} labelProp={'Alamat'} placeholderProp={'Isi Alamat'} typeProp={'text'} inputId={'alamat'} onChangeProp={setStoreAddress} />
          </div>
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <Input valueProp={storePhone} labelProp={'No. HP'} placeholderProp={'Isi No. HP'} typeProp={'text'} inputId={'no_hp'} onChangeProp={setStorePhone} />
          </div>
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <Input valueProp={storeMaxEmoji} labelProp={'Emoji maks. diskon Emoji'} placeholderProp={'Isi Emoji maks. diskon Emoji'} typeProp={'number'} inputId={'emoji_pos'} onChangeProp={setStoreMaxEmoji} />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button isLoading={isLoading} onClickProp={() => { submitStore() }} buttonType="primary">
          Simpan
        </Button>
      </div>
    </div>
  )
}