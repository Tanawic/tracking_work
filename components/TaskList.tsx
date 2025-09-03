
import React from 'react';
import { TaskCard } from './TaskCard';
import type { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdateTask, onDeleteTask }) => {
    return (
        <div className="space-y-4">
            {tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onDeleteTask={onDeleteTask}
                />
            ))}
        </div>
    );
};
