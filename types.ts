
export enum Status {
    ToDo = 'To Do',
    InProgress = 'In Progress',
    Done = 'Done',
}

export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    dueDate?: string;
}

export type FilterType = 'all' | 'to-do' | 'in-progress' | 'done';
