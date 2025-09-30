import { useSelector } from "react-redux"

export default function RegisterConfirmSection() {
  const name = useSelector((state) => state.registerStoreSlice.name)
  const email = useSelector((state) => state.registerStoreSlice.email)
  const age = useSelector((state) => state.registerStoreSlice.age)
  const sex = useSelector((state) => state.registerStoreSlice.sex)
  const phone = useSelector((state) => state.registerStoreSlice.phone)


  const nameStore = useSelector((state) => state.registerStoreSlice.nameStore)
  const addressStore = useSelector((state) => state.registerStoreSlice.addressStore)
  const phoneStore = useSelector((state) => state.registerStoreSlice.phoneStore)
  const emojiDiscount = useSelector((state) => state.registerStoreSlice.emojiDiscount)

  return (
    <>
      <h2 className="mb-5 text-center">
        Konfirmasi Pendaftaran Toko ✅
      </h2>
      <div className="mb-5">
        <h3 className="mb-2 py-2 bg-yellow-50 text-center rounded-md font">
          Data Pemilik Toko
        </h3>
        <div className="flex gap-6 flex-wrap">
          <div className="min-w-[280px] flex-1">
            <b>Nama</b>
            <div>{name}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>Email</b>
            <div>{email}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>Umur</b>
            <div>{age ? age : 'tidak diisi'}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>Gender</b>
            <div>{sex == 'L' ? 'Laki - Laki' : sex == 'P' ? 'Perempuan' : 'Tidak diisi'}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>No. Hp</b>
            <div>{phone}</div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-2 py-2 bg-yellow-50 text-center rounded-md font">
          Data Toko
        </h3>
        <div className="flex gap-6 flex-wrap">
          <div className="min-w-[280px] flex-1">
            <b>Nama</b>
            <div>{nameStore}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>Alamat</b>
            <div>{addressStore}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>No. Hp</b>
            <div>{phoneStore}</div>
          </div>
          <div className="min-w-[280px] flex-1">
            <b>Maks. Emoji Diskon</b>
            <div>{emojiDiscount || 0}%</div>
          </div>
        </div>
      </div>
    </>
  )
}