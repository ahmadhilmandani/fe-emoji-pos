import { useState } from "react";
import { NavLink } from "react-router";
import { useSelector } from "react-redux"; // ambil role dari redux
import {
  IconLayoutDashboard,
  IconShirt,
  IconChevronDown,
  IconCup,
  IconLemon,
  IconHeartSpark,
  IconPhoneRinging,
  IconCoin,
  IconUsers,
  IconBuildingStore,
} from "@tabler/icons-react";
import LogoPos from "../assets/logo.png";

export default function Sidebar() {
  const [clickedState, setClickedState] = useState(null);
  const userRole = useSelector((state) => state.userInfoSlie.role); // contoh: "owner" | "admin" | "kasir"

  // helper: cek apakah role ada dalam allowedRoles
  const canAccess = (roles) => roles.includes(userRole)


  return (
    <aside className={`lg:w-[280px] sticky h-screen z-10 left-0 top-0 bottom-0 bg-white border border-gray-200 p-4`}>
      <img src={LogoPos} alt="" className="h-20 mb-3" />

      {/* Produk Fisik */}
      <div className="mt-3">
        <div
          className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all"
          onClick={() =>
            setClickedState(clickedState === "produk_fisik" ? null : "produk_fisik")
          }
        >
          <IconShirt />
          <div className="mr-auto text-gray-500">Produk Fisik</div>
          <IconChevronDown
            className={`${clickedState === "produk_fisik" ? "rotate-[0deg]" : "rotate-[-90deg]"
              } transition-all`}
          />
        </div>
        <div
          className={`ml-6 border-l-4 border-gray-300 ${clickedState === "produk_fisik" ? "" : "h-0"
            } overflow-hidden transition-all`}
        >
          <NavLink
            to={"/physical-product"}
            className={({ isActive }) =>
              isActive
                ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
            }
          >
            Katalog
          </NavLink>
          {/* Pembelian hanya owner+admin */}
          {canAccess(["owner", "admin"]) && (
            <NavLink
              to={"/purchase-physical-product"}
              className={({ isActive }) =>
                isActive
                  ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                  : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
              }
            >
              Pembelian
            </NavLink>
          )}
        </div>
      </div>

      {/* Produk Olahan */}
      <div className="mt-3">
        <div
          className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all"
          onClick={() =>
            setClickedState(clickedState === "produk_olahan" ? null : "produk_olahan")
          }
        >
          <IconCup />
          <div className="mr-auto text-gray-500">Produk Olahan</div>
          <IconChevronDown
            className={`${clickedState === "produk_olahan" ? "rotate-[0deg]" : "rotate-[-90deg]"
              } transition-all`}
          />
        </div>
        <div
          className={`ml-6 border-l-4 border-gray-300 ${clickedState === "produk_olahan" ? "" : "h-0"
            } overflow-hidden transition-all`}
        >
          <NavLink
            to={"/processed-product"}
            className={({ isActive }) =>
              isActive
                ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
            }
          >
            Katalog
          </NavLink>

          {/* Bahan Baku */}
          <div>
            <div className="flex gap-3 items-center pl-8 pr-3 py-3 text-gray-500">
              <IconLemon />
              <div className="mr-auto text-gray-500">Bahan Baku</div>
            </div>
            <div className="ml-12 border-l-4 border-gray-300">
              <NavLink
                to={"/ingredient"}
                className={({ isActive }) =>
                  isActive
                    ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                    : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
                }
              >
                Katalog
              </NavLink>
              {/* Pembelian hanya owner+admin */}
              {canAccess(["owner", "admin"]) && (
                <NavLink
                  to={"/purchase-ingredient"}
                  className={({ isActive }) =>
                    isActive
                      ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                      : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
                  }
                >
                  Pembelian
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Produk Layanan */}
      <div className="mt-3">
        <div
          className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all"
          onClick={() =>
            setClickedState(clickedState === "produk_layanan" ? null : "produk_layanan")
          }
        >
          <IconHeartSpark />
          <div className="mr-auto text-gray-500">Produk Layanan</div>
          <IconChevronDown
            className={`${clickedState === "produk_layanan" ? "rotate-[0deg]" : "rotate-[-90deg]"
              } transition-all`}
          />
        </div>
        <NavLink
          to={"/service-product"}
          className={({ isActive }) =>
            isActive
              ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3 ml-6 border-l-4 border-gray-300"
              : `flex gap-3 items-center ml-6 border-l-4 border-gray-300 hover:bg-gray-100 text-gray-500 ${clickedState === "produk_layanan"
                ? "px-8 py-3"
                : "h-0 px-0 py-0"
              } overflow-hidden transition-all`
          }
        >
          Katalog
        </NavLink>
      </div>

      {/* Supplier (owner only) */}
      {canAccess(["owner"]) && (
        <NavLink
          to={"/supplier"}
          className={({ isActive }) =>
            isActive
              ? "font-black text-yellow-600 flex gap-3 items-center p-3"
              : "rounded-xl flex gap-3 items-center p-3 hover:bg-gray-100 text-gray-500"
          }
        >
          <IconPhoneRinging />
          Supplier
        </NavLink>
      )}

      {/* Penjualan (semua role bisa) */}
      <div className="mt-3">
        <div
          className="p-3 flex items-center gap-3 text-gray-500 group hover:bg-gray-100 hover:cursor-pointer transition-all"
          onClick={() =>
            setClickedState(clickedState === "penjualan" ? null : "penjualan")
          }
        >
          <IconCoin />
          <div className="mr-auto text-gray-500">Penjualan</div>
          <IconChevronDown
            className={`${clickedState === "penjualan" ? "rotate-[0deg]" : "rotate-[-90deg]"
              } transition-all`}
          />
        </div>
        <div
          className={`ml-6 border-l-4 border-gray-300 ${clickedState === "penjualan" ? "" : "h-0"
            } overflow-hidden transition-all`}
        >
          <NavLink
            to={"/sales"}
            className={({ isActive }) =>
              isActive
                ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
            }
          >
            Jual
          </NavLink>
          <NavLink
            to={"/history-sales"}
            className={({ isActive }) =>
              isActive
                ? "font-black text-yellow-600 flex gap-3 items-center px-8 py-3"
                : "flex gap-3 items-center px-8 py-3 hover:bg-gray-100 text-gray-500"
            }
          >
            Riwayat
          </NavLink>
        </div>
      </div>

      {/* Pengguna (employee) hanya owner */}
      {canAccess(["owner"]) && (
        <NavLink
          to={"/employee"}
          className={({ isActive }) =>
            isActive
              ? "font-black text-yellow-600 flex gap-3 items-center p-3"
              : "rounded-xl flex gap-3 items-center p-3 hover:bg-gray-100 text-gray-500"
          }
        >
          <IconUsers />
          Pengguna
        </NavLink>
      )}

      {/* Store hanya owner */}
      {canAccess(["owner"]) && (
        <NavLink
          to={"/store"}
          className={({ isActive }) =>
            isActive
              ? "font-black text-yellow-600 flex gap-3 items-center p-3"
              : "rounded-xl flex gap-3 items-center p-3 hover:bg-gray-100 text-gray-500"
          }
        >
          <IconBuildingStore />
          Toko
        </NavLink>
      )}
    </aside>
  );
}
