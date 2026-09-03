import { Home, Compass, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function BottomNav() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: "Início", path: "/", icon: Home },
    { label: "Descobrir", path: "/discover", icon: Compass },
    { label: "Buscar", path: "/search", icon: Search },
    { label: "Minha RAW", path: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-surface/90 backdrop-blur-md border-t border-brand-border px-6 py-3 z-40 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-colors ${
                active ? "text-brand-accent" : "text-brand-muted hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}