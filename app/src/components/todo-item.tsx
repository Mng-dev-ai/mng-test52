import { Todo } from "@/lib/types"
    import { useTodoStore } from "@/lib/store"
    import { Checkbox } from "@/components/ui/checkbox"
    import { Button } from "@/components/ui/button"
    import { Trash, Edit, Calendar as CalendarIcon } from "lucide-react"
    import { useSortable } from "@dnd-kit/sortable"
    import { CSS } from "@dnd-kit/utilities"
    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from "@/components/ui/dialog"
    import { Input } from "@/components/ui/input"
    import { Label } from "@/components/ui/label"
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import * as z from "zod";
    import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    } from "@/components/ui/form";
    import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    } from "@/components/ui/select";
    import { Calendar } from "@/components/ui/calendar"
    import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
    import { format } from "date-fns";
    import { cn } from "@/lib/utils";

    interface TodoItemProps {
    todo: Todo
    }

    const editFormSchema = z.object({
    title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
    }),
    dueDate: z.date().optional(),
    priority: z.enum(["high", "medium", "low"]),
    });

    export function TodoItem({ todo }: TodoItemProps) {
      const { toggleTodo, deleteTodo, updateTodo } = useTodoStore()

      const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id: todo.id });

      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };

      const editForm = useForm<z.infer<typeof editFormSchema>>({
        resolver: zodResolver(editFormSchema),
        defaultValues: {
          title: todo.title, // Initialize with current values
          dueDate: todo.dueDate,
          priority: todo.priority,
        },
      });

      function onEditSubmit(z.infer<typeof editFormSchema>) {
        updateTodo(todo.id, {
          title: data.title,
          dueDate: data.dueDate,
          priority: data.priority,
        });
        editForm.reset(); // Reset the form after successful update
      }

      return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleTodo(todo.id)}
            />
            <div className="grid gap-1">
              <span
                className={cn(
                  "p-0 leading-none",
                  todo.completed ? "line-through text-muted-foreground" : ""
                )}
              >
                {todo.title}
              </span>
              {todo.dueDate && (
                <span className="text-xs text-muted-foreground">
                  Due: {format(todo.dueDate, "PPP")}
                </span>
              )}
              {todo.priority && (
                <span className="text-xs text-muted-foreground">
                  Priority: {todo.priority}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Todo</DialogTitle>
                  <DialogDescription>
                    Make changes to your todo here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
                    <FormField
                      control={editForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Due Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={editForm.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </li>
      )
    }