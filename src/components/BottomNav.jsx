import React from "react";
import { Home, Compass, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function BottomNav() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/discover", icon: Compass, label: "Descobrir" },
    { to: "/search", icon: Search, label: "Busca" },
    { to: "/profile", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0A0A0D]/95 backdrop-blur-lg border-t border-brand-border px-6 py-2 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 text-[10px] transition ${
                  isActive ? "text-brand-accent font-semibold" : "text-brand-muted hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}