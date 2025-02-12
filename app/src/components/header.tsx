import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function Header({ className, ...props }: HeaderProps) {
    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                className
            )}
            {...props}
        >
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-auto flex items-center gap-4">
                    <span className="font-bold">Advanced Todo App</span>
                </div>
                <div className="flex items-center gap-4">
                    <ModeToggle />
                </div>
            </div>
        </header>
    )
}