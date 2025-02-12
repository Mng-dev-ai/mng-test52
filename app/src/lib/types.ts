export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: Date; // Make dueDate optional
    priority: "high" | "medium" | "low";
    }