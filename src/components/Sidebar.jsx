import { Link } from "react-router"
import LogoPos from "../assets/logo.png"
import { IconCashBanknote, IconChevronDown, IconCoin, IconLayoutDashboard, IconPackage, IconPackages, IconPhoneRinging, IconPoint, IconReport, IconUsers } from "@tabler/icons-react"

export default function Sidebar() {
  return (
    <aside className={`lg:w-[280px] xl:w-[320px] sticky h-screen z-10 left-0 top-0 bottom-0 bg-white border border-gray-200 p-4`}>
      <img src={LogoPos} alt="" className="h-20 mb-6" />
      <Link className="hover:bg-yellow-50 transition-all bg-yellow-300 flex gap-3 items-center p-3">
        <IconLayoutDashboard />
        Dashboard
      </Link>
      <Link to={'/product'} className="hover:bg-yellow-50 transition-all flex gap-3 items-center mt-6 p-3 text-gray-500">
        <IconPackage />
        Produk
      </Link>
      <Link to={'/ingredient'} className="hover:bg-yellow-50 transition-all flex gap-3 items-center mt-6 p-3 text-gray-500">
        <IconPackages />
        Bahan Baku
      </Link>
      <Link to={'/supplier'} className="hover:bg-yellow-50 transition-all flex gap-3 items-center mt-6 p-3 text-gray-500">
        <IconPhoneRinging />
        Supplier
      </Link>
      <Link className="hover:bg-yellow-50 transition-all flex gap-3 items-center mt-6 p-3 text-gray-500">
        <IconCoin />
        Penjualan
      </Link>
      <Link className="hover:bg-yellow-50 transition-all flex gap-3 items-center mt-6 p-3 text-gray-500">
        <IconCashBanknote />
        Pembelian
      </Link>
      <div className="mt-6">
        <div className="mb-3 p-3 flex items-center gap-3 text-gray-500">
          <IconReport />
          <div className="mr-auto">
            Laporan
          </div>
          <div className="">
            <IconChevronDown />
          </div>
        </div>
        <div className="flex gap-3 items-center py-3 px-3 mb-3 text-gray-500">
          <IconPoint />
          Penjualan
        </div>
        <div className="flex gap-3 items-center py-3 px-3 mb-3 text-gray-500">
          <IconPoint />
          Pembelian
        </div>
      </div>
      <Link to={'/employee'} className="hover:bg-yellow-50 transition-all flex gap-3 items-center mt-6 p-3 text-gray-500">
        <IconUsers />
        Pengguna
      </Link>
    </aside>
  )
}