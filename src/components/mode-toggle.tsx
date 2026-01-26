import { useTheme } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
    )
}
