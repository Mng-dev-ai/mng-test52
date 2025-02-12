import { Header } from "@/components/header"
import { TodoList } from "@/components/todo-list"
import { TodoForm } from "@/components/todo-form"
import { TodoFilter } from "@/components/todo-filter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function App() {
    return (
        <>
            <Header />
            <main className="container relative flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[280px_minmax(0,1fr)]">
                <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                    <Card className="h-full overflow-hidden">
                        <CardHeader>
                            <CardTitle>Filter</CardTitle>
                        </CardHeader>
                        <CardContent className="h-full">
                            <TodoFilter />
                        </CardContent>
                    </Card>
                </aside>
                <section className="w-full py-6 lg:py-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TodoForm />
                            <TodoList />
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    )
}

export default App