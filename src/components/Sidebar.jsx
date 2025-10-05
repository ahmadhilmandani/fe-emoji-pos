import { Link, NavLink } from "react-router"
import LogoPos from "../assets/logo.png"
import { IconBuildingStore, IconChevronDown, IconCoin, IconCup, IconHeartSpark, IconLayoutDashboard, IconLemon, IconPhoneRinging, IconShirt, IconUsers } from "@tabler/icons-react"
import { useState } from "react"

const SIDEBAR_LIST = {
  'PRODUK_FISIK': 'produk_fisik',
  'PRODUK_OLAHAN': 'produk_olahan',
  'PRODUK_LAYANAN': 'produk_layanan',
  'PENJUALAN': 'penjualan',
}

export default function Sidebar() {
  const [clickedState, setClickedState] = useState(null)

  return (
    <aside className={`lg:w-[280px] sticky h-screen z-10 left-0 top-0 bottom-0 bg-white border border-gray-200 p-4`}>
      <img src={LogoPos} alt="" className="h-20 mb-3" />
      {/* dashboard */}
      <NavLink to={'/'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center p-3" : "rounded-xl flex gap-3 items-center p-3 transition-all hover:bg-gray-100 text-gray-500")}>
        <IconLayoutDashboard />
        Dashboard
      </NavLink>
      <div className="mt-3">
        <div className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all" onClick={() => {
          setClickedState(clickedState == SIDEBAR_LIST.PRODUK_FISIK ? null : SIDEBAR_LIST.PRODUK_FISIK)
        }}>
          <IconShirt />
          <div className="mr-auto text-gray-500">
            Produk Fisik
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PRODUK_FISIK ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <div className={`ml-6 border-l-4 border-gray-300 ${clickedState == SIDEBAR_LIST.PRODUK_FISIK ? 'h-[86.788px]' : 'h-0'} overflow-hidden transition-all`}>
          <NavLink to={'/physical-product'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}
          >
            Katalog
          </NavLink>
          <NavLink to={'/purchase-physical-product'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}>
            Pembelian
          </NavLink>
        </div>
      </div>
      {/* produk olahan */}
      <div className="mt-3">
        <div className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all" onClick={() => {
          setClickedState(clickedState == SIDEBAR_LIST.PRODUK_OLAHAN ? null : SIDEBAR_LIST.PRODUK_OLAHAN)
        }}>
          <IconCup />
          <div className="mr-auto text-gray-500">
            Produk Olahan
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PRODUK_OLAHAN ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <div className={`ml-6 border-l-4 border-gray-300 ${clickedState == SIDEBAR_LIST.PRODUK_OLAHAN ? 'h-[175.182px]' : 'h-0'} overflow-hidden transition-all`}>
          <NavLink to={'/processed-product'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}>
            Katalog
          </NavLink>
          <div>
            <div className="flex gap-3 items-center pl-8 pr-3 py-3 text-gray-500">
              <IconLemon />
              <div className="mr-auto text-gray-500">
                Bahan Baku
              </div>
            </div>
            <div className="ml-12 border-l-4 border-gray-300">
              <NavLink to={'/ingredient'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}>
                Katalog
              </NavLink>
              <NavLink to={'/purchase-ingredient'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}>
                Pembelian
              </NavLink>
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
          <div className="mr-auto text-gray-500">
            Produk Layanan
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PRODUK_LAYANAN ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <NavLink to={'/service-product'}
          className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3 ml-6 border-l-4 border-gray-300" : `flex gap-3 items-center ml-6 border-l-4 border-gray-300 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500 ${clickedState == SIDEBAR_LIST.PRODUK_LAYANAN ? 'h-[43.39px] px-8 py-3' : 'h-0 px-0 py-0'} overflow-hidden transition-all`)}
        >
          Katalog
        </NavLink>
      </div>
      {/* supplier */}
      <NavLink to={'/supplier'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center p-3" : "rounded-xl flex gap-3 items-center p-3 transition-all hover:bg-gray-100 text-gray-500")}>
        <IconPhoneRinging />
        Supplier
      </NavLink>
      {/* Penjualan */}
      <div className="mt-3">
        <div className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all" onClick={() => {
          setClickedState(clickedState == SIDEBAR_LIST.PENJUALAN ? null : SIDEBAR_LIST.PENJUALAN)
        }}>
          <IconCoin />
          <div className="mr-auto text-gray-500">
            Penjualan
          </div>
          <div>
            <IconChevronDown className={`${clickedState == SIDEBAR_LIST.PENJUALAN ? 'rotate-[0deg]' : 'rotate-[-90deg]'} transition-all`} />
          </div>
        </div>
        <div className={`ml-6 border-l-4 border-gray-300 ${clickedState == SIDEBAR_LIST.PENJUALAN ? 'h-[86.788px]' : 'h-0'} overflow-hidden transition-all`}>
          <NavLink to={'/sales'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}
          >
            Jual
          </NavLink>
          <NavLink to={'/history-sales'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3" : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 hover:cursor-pointer transition-all text-gray-500")}>
            Riwayat
          </NavLink>
        </div>
      </div>
      {/* pengguna */}
      <NavLink to={'/employee'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center p-3" : "rounded-xl flex gap-3 items-center p-3 transition-all hover:bg-gray-100 text-gray-500")}>
        <IconUsers />
        Pengguna
      </NavLink>
      <NavLink to={'/store'} className={({ isActive }) => (isActive ? "font-black text-yellow-600 flex gap-3 items-center p-3" : "rounded-xl flex gap-3 items-center p-3 transition-all hover:bg-gray-100 text-gray-500")}>
        <IconBuildingStore />
        Toko
      </NavLink>
    </aside>
  )
}