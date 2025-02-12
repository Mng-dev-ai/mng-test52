import { useTodoStore } from "@/lib/store"
import { TodoItem } from "@/components/todo-item"

export function TodoList() {
    const { filteredTodos } = useTodoStore()

    return (
        <ul>
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}