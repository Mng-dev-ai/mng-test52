import { create } from "zustand"
    import { Todo } from "@/lib/types"
    import { v4 as uuidv4 } from "uuid"
    import { persist } from 'zustand/middleware'
    import { toast } from "@/hooks/use-toast"

    type FilterType = "all" | "active" | "completed"

    interface TodoState {
      todos: Todo[]
      filter: FilterType;
      priorityFilter: "all" | "high" | "medium" | "low"; // Add priority filter
      addTodo: (title: string, dueDate?: Date, priority?: "high" | "medium" | "low") => void; // Add dueDate and priority
      deleteTodo: (id: string) => void;
      toggleTodo: (id: string) => void;
      updateTodo: (id: string, updatedTodo: Partial<Todo>) => void; // Add updateTodo
      setFilter: (filter: FilterType) => void;
      setPriorityFilter: (filter: "all" | "high" | "medium" | "low") => void; // Add setPriorityFilter
      setTodos: (todos: Todo[]) => void;
      filteredTodos: Todo[]
    }

    export const useTodoStore = create<TodoState>()(
      persist(
        (set, get) => ({
          todos: [
            { id: uuidv4(), title: "Learn Zustand", completed: true, priority: "medium" },
            { id: uuidv4(), title: "Build a todo app", completed: false, priority: "high" },
          ],
          filter: "all",
          priorityFilter: "all", // Initialize priority filter
          addTodo: (title, dueDate, priority = "medium") => { // Add dueDate and priority, default priority to medium
            const newTodo: Todo = { id: uuidv4(), title, completed: false, dueDate, priority };
            set((state) => ({
              todos: [...state.todos, newTodo],
            }));
            toast({
              title: "Todo added",
              description: `Added "${title}" to your list.`,
            });
          },
          deleteTodo: (id) => {
            set((state) => {
              const deletedTodo = state.todos.find(todo => todo.id === id);
              const updatedTodos = state.todos.filter((todo) => todo.id !== id);
              if (deletedTodo) {
                toast({
                  title: "Todo deleted",
                  description: `Removed "${deletedTodo.title}" from your list.`,
                });
              }
              return { todos: updatedTodos };
            });
          },
          toggleTodo: (id) => {
            set((state) => {
              const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              );

              const toggledTodo = updatedTodos.find(todo => todo.id === id);
              if (toggledTodo) {
                toast({
                  title: "Todo updated",
                  description: `Marked "${toggledTodo.title}" as ${toggledTodo.completed ? 'completed' : 'active'}.`,
                });
              }

              return { todos: updatedTodos };
            });
          },
          updateTodo: (id, updatedTodo) => {
            set((state) => ({
              todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, ...updatedTodo } : todo
              ),
            }));
            toast({
              title: "Todo updated",
              description: `Updated "${updatedTodo.title}"`,
            });
          },
          setFilter: (filter) => set({ filter }),
          setPriorityFilter: (filter) => set({ priorityFilter: filter }), // Add setPriorityFilter
          setTodos: (todos) => set({ todos }),
          filteredTodos: [],
          get filteredTodos() {
            const filter = get().filter;
            const priorityFilter = get().priorityFilter; // Get priority filter
            let todos = get().todos;

            // Apply priority filter first
            if (priorityFilter !== "all") {
              todos = todos.filter((todo) => todo.priority === priorityFilter);
            }

            // Then apply status filter
            switch (filter) {
              case "active":
                return todos.filter((todo) => !todo.completed);
              case "completed":
                return todos.filter((todo) => todo.completed);
              default:
                return todos;
            }
          },
        }),
        {
          name: 'todo-storage', // unique name
        }
      )
    )