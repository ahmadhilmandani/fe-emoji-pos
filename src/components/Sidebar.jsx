import { Link } from "react-router"
import LogoPos from "../assets/logo.png"
import { IconChevronDown, IconCoin, IconCup, IconHeartSpark, IconLayoutDashboard, IconLemon, IconShirt, IconUsers } from "@tabler/icons-react"
import { useState } from "react"

const SIDEBAR_LIST = {
  'PRODUK_FISIK': 'produk_fisik',
  'PRODUK_OLAHAN': 'produk_olahan',
  'PRODUK_LAYANAN': 'produk_layanan',
}

export default function Sidebar() {
  const [clickedState, setClickedState] = useState(null)

  return (
    <aside className={`lg:w-[280px] xl:w-[320px] sticky h-screen z-10 left-0 top-0 bottom-0 bg-white border border-gray-200 p-4`}>
      <img src={LogoPos} alt="" className="h-20 mb-3" />
      {/* dashboard */}
      <Link className="hover:bg-yellow-50 transition-all bg-yellow-100 font-bold rounded-xl flex gap-3 items-center p-3">
        <IconLayoutDashboard />
        Dashboard
      </Link>
      {/* produk fisik */}
      <div className="mt-3">
        <div className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all" onClick={() => {
        setClickedState(clickedState == SIDEBAR_LIST.PRODUK_FISIK ? null : SIDEBAR_LIST.PRODUK_FISIK)
      }}>
          <IconShirt />
          <div className="mr-auto">
            Produk Fisik
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PRODUK_FISIK ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <div className={`ml-6 border-l-4 border-gray-300 ${clickedState == SIDEBAR_LIST.PRODUK_FISIK ? 'h-[86.788px]' : 'h-0'} overflow-hidden transition-all`}>
          <Link to={'/physical-product'} className="flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500">
            Katalog
          </Link>
          <div className="flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500">
            Pembelian
          </div>
        </div>
      </div>
      {/* produk olahan */}
      <div className="mt-3">
        <div className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all" onClick={() => {
          setClickedState(clickedState == SIDEBAR_LIST.PRODUK_OLAHAN ? null : SIDEBAR_LIST.PRODUK_OLAHAN)
        }}>
          <IconCup />
          <div className="mr-auto">
            Produk Olahan
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PRODUK_OLAHAN ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <div className={`ml-6 border-l-4 border-gray-300 ${clickedState == SIDEBAR_LIST.PRODUK_OLAHAN ? 'h-[175.182px]' : 'h-0'} overflow-hidden transition-all`}>
          <Link to={'/processed-product'} className="flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500">
            Katalog
          </Link>
          <div>
            <div className="flex gap-3 items-center pl-8 pr-3 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500">
              <IconLemon />
              <div className="mr-auto">
                Bahan Baku
              </div>
            </div>
            <div className="ml-12 border-l-4 border-gray-300">
              <div className="flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500">
                Katalog
              </div>
              <div className="flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500">
                Pembelian
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* produk layanan */}
      <div className="mt-3">
        <div className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all" onClick={() => {
          setClickedState(clickedState == SIDEBAR_LIST.PRODUK_LAYANAN ? null : SIDEBAR_LIST.PRODUK_LAYANAN)
        }}>
          <IconHeartSpark />
          <div className="mr-auto">
            Produk Layanan
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PRODUK_LAYANAN ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <div className={`flex gap-3 items-center ml-6 border-l-4 border-gray-300 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500 ${clickedState == SIDEBAR_LIST.PRODUK_LAYANAN ? 'h-[43.39px] px-8 py-3' : 'h-0 px-0 py-0'} overflow-hidden transition-all`}>
          Katalog
        </div>
      </div>
      {/* Penjualan */}
      <Link className="hover:bg-gray-100 transition-all flex gap-3 items-center mt-3 p-3 text-gray-500">
        <IconCoin />
        Penjualan
      </Link>
      {/* pengguna */}
      <Link to={'/employee'} className="hover:bg-gray-100 transition-all flex gap-3 items-center mt-3 p-3 text-gray-500">
        <IconUsers />
        Pengguna
      </Link>
    </aside>
  )
}