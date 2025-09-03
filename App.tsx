
import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { AddTaskModal } from './components/AddTaskModal';
import { useTasks } from './hooks/useTasks';
import type { Task, Status, FilterType } from './types';
import { Icon } from './components/Icon';

export default function App() {
    const { tasks, addTask, updateTask, deleteTask, addMultipleTasks } = useTasks();
    const [filter, setFilter] = useState<FilterType>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTasks = useMemo(() => {
        return tasks
            .filter(task => {
                if (filter === 'all') return true;
                return task.status.toLowerCase().replace(' ', '-') === filter;
            })
            .filter(task => 
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [tasks, filter, searchTerm]);

    const handleAddTask = (task: Omit<Task, 'id'>) => {
        addTask(task);
        setIsModalOpen(false);
    };

    return (
        <div className="h-screen w-screen bg-black text-gray-200 flex overflow-hidden">
            <Sidebar currentFilter={filter} onFilterChange={setFilter} />
            <main className="flex-1 flex flex-col bg-[#121212] rounded-lg m-2 ml-0">
                <Header onNewTaskClick={() => setIsModalOpen(true)} onSearch={setSearchTerm} />
                <div className="flex-1 overflow-y-auto p-6">
                    {filteredTasks.length > 0 ? (
                        <TaskList
                            tasks={filteredTasks}
                            onUpdateTask={updateTask}
                            onDeleteTask={deleteTask}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                           <Icon name="folder" className="w-24 h-24 mb-4"/>
                           <h2 className="text-2xl font-bold">No tasks found</h2>
                           <p>Try changing your filter or adding a new task.</p>
                        </div>
                    )}
                </div>
            </main>
            {isModalOpen && (
                <AddTaskModal
                    onClose={() => setIsModalOpen(false)}
                    onAddTask={handleAddTask}
                    onAddMultipleTasks={addMultipleTasks}
                />
            )}
        </div>
    );
}
