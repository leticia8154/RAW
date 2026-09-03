import React from "react";
import { Home, Compass, Search, Library, ShieldAlert, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function BottomNav() {
  const navItems = [
    { to: "/", icon: Home, label: "Início" },
    { to: "/discover", icon: Compass, label: "Descobrir" },
    { to: "/search", icon: Search, label: "Busca" },
    { to: "/collections", icon: Library, label: "Coleções" },
    { to: "/raw-plus", icon: ShieldAlert, label: "RAW+" },
    { to: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#050507]/95 backdrop-blur-lg border-t border-[#1F1F28] px-2 py-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[9px] transition ${
                  isActive ? "text-[#A78BFA] font-semibold" : "text-gray-400 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}