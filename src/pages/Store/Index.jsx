/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import { IconChevronLeft, IconPencil, IconPlus } from "@tabler/icons-react"
import formatRupiah from "../../utils/formatRupiah"
import { getStore } from "../../api/getStore"
import Button from "../../components/Button"
import { useSelector } from "react-redux"


export default function StoreIndex() {
  const [isLoading, setIsLoading] = useState(true)
  const [storeData, setStoreData] = useState()

  const userInfoSlie = useSelector((state) => { return state.userInfoSlie })


  const { id } = useParams()
  const navigate = useNavigate()

  const handleGetStore = async () => {
    setIsLoading(true)
    try {
      const res = await getStore()
      setStoreData(res.data.store[0])
      console.log(res)
    } catch (error) {
      toast.error(error.msg)
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
          <h1 className="mb-3">{storeData?.name}</h1>
          <h4 className="mb-1 text-gray-400 font-normal">
            Sejak: {storeData?.created_at}
          </h4>
        </div>
      </header>
      <div className="mb-5 bg-white border border-gray-200 p-5 rounded-lg flex justify-between gap-5 flex-wrap">
        <div>
          <h4 className="mb-3 text-gray-400">Pemilik</h4>
          <h3>{storeData?.owner_name}</h3>
        </div>
      </div>
      <div className="mb-5 bg-white p-5 rounded-lg border border-gray-200">
        <h4 className="mb-3">Informasi Lainnya</h4>
        <div className="flex gap-8 flex-wrap items-center">
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <h4 className="mb-1 text-gray-400">Alamat</h4>
            <h4 className="mb-1">{storeData?.address}</h4>
          </div>
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <h4 className="mb-1 text-gray-400">No. Hp Toko</h4>
            <h4 className="mb-1">{storeData?.phone}</h4>
          </div>
          <div className="min-w-[240px] flex-1 border-b border-gray-200">
            <h4 className="mb-1 text-gray-400">Maks. Emoji POS Diskon (%) </h4>
            <h4 className="mb-1">{storeData?.percentage_max_emoji_disc}%</h4>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {userInfoSlie.role == 'owner' && (<>
          <Button onClickProp={() => { navigate('/store/edit') }} buttonType="secondary">
            <IconPencil className="group-hover:-translate-y-0.5 transition-all stroke-amber-800" stroke={1.6} size={19} />
            Edit
          </Button>
        </>)
        }
      </div>
    </div>
  )
}