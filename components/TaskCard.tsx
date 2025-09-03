
import React from 'react';
import type { Task } from '../types';
import { Status, Priority } from '../types';
import { Icon } from './Icon';

interface TaskCardProps {
    task: Task;
    onUpdateTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
}

const priorityColors: { [key in Priority]: string } = {
    [Priority.High]: 'bg-red-500',
    [Priority.Medium]: 'bg-yellow-500',
    [Priority.Low]: 'bg-green-500',
};

const statusOptions: Status[] = [Status.ToDo, Status.InProgress, Status.Done];

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateTask, onDeleteTask }) => {
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdateTask({ ...task, status: e.target.value as Status });
    };

    return (
        <div className="bg-[#181818] rounded-lg p-4 flex items-center justify-between hover:bg-[#282828] transition-colors duration-300 group">
            <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${priorityColors[task.priority]}`}></div>
                <div>
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="text-sm text-gray-400">{task.description}</p>
                    {task.dueDate && <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>}
                </div>
            </div>
            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <select
                    value={task.status}
                    onChange={handleStatusChange}
                    className="bg-[#333] text-white rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={(e) => e.stopPropagation()} // Prevent card click-through
                >
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
                <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete task"
                >
                    <Icon name="trash" className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
