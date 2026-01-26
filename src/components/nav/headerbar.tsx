import { useSidebar, SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../mode-toggle";
import ButtonLogOut from "../login/Buttonlogout";

export const Headerbar = () => {
  const { state, isMobile } = useSidebar();

  // Ya no usamos hideSidebar ni visibleMenus
  // const [hideSidebar, setHideSidebar] = useState(true);
  // const [, setShowShortcutInfo] = useState(false);

  // Solo puedes mantener un useEffect si quieres algo según la ruta
  // Pero si no manejas visibleMenus ni atajos, podemos eliminarlo todo

  return (
    <header
      className={`fixed top-0 left-0 z-20
        flex items-center justify-between
        h-14 px-6
        transition-all duration-300
        backdrop-blur-xl
        border-b border-slate-200 dark:border-slate-800
        bg-white/70 dark:bg-slate-900/70
        shadow-[0_2px_10px_rgba(0,0,0,0.05)]
        ${state === "expanded" && !isMobile ? "w-[calc(100vw-16rem)] left-64" : "w-full left-0"}
      `}
    >
      {/* Sidebar trigger siempre visible */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors" />
        <h1 className="hidden sm:block text-base font-semibold text-slate-700 dark:text-slate-100 tracking-tight">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <ButtonLogOut />
      </div>
    </header>
  );
};
