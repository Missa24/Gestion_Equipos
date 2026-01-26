import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

function ButtonLogOut() {

    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        //                        onClick={logout}
                        className="
               self-center
              bg-neutral-100 dark:bg-neutral-800
              text-neutral-700 dark:text-neutral-200
              hover:bg-red-100 hover:text-red-600
              dark:hover:bg-red-900/30 dark:hover:text-red-400 shadow-sm transition-all duration-200
            "
                    >
                        <LogOut className="h-5 w-5" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="text-sm font-medium bg-neutral-800 text-white border border-neutral-700"
                >
                    <p>Salir</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export default ButtonLogOut;