
import React, { useState } from 'react';
import type { Task } from '../types';
import { Status, Priority } from '../types';
import { generateTasksFromPrompt } from '../services/geminiService';
import { Icon } from './Icon';

interface AddTaskModalProps {
    onClose: () => void;
    onAddTask: (task: Omit<Task, 'id'>) => void;
    onAddMultipleTasks: (tasks: Omit<Task, 'id'>[]) => void;
}

type AIGeneratedTask = Omit<Task, 'id' | 'status'>;

export const AddTaskModal: React.FC<AddTaskModalProps> = ({ onClose, onAddTask, onAddMultipleTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<Priority>(Priority.Medium);
    const [dueDate, setDueDate] = useState('');

    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedTasks, setGeneratedTasks] = useState<AIGeneratedTask[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        onAddTask({
            title,
            description,
            status: Status.ToDo,
            priority,
            dueDate,
        });
    };

    const handleGenerateTasks = async () => {
        if (!aiPrompt) return;
        setIsGenerating(true);
        setError(null);
        setGeneratedTasks([]);
        try {
            const tasks = await generateTasksFromPrompt(aiPrompt);
            setGeneratedTasks(tasks);
        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
        } finally {
            setIsGenerating(false);
        }
    };
    
    const handleAddGeneratedTasks = () => {
        const tasksToAdd = generatedTasks.map(t => ({...t, status: Status.ToDo}));
        onAddMultipleTasks(tasksToAdd);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-[#181818] rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Create a New Task</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <Icon name="x" className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Manual Task Entry */}
                    <div className="border-r-0 md:border-r border-gray-700 pr-0 md:pr-8">
                        <h3 className="text-lg font-semibold mb-4 text-purple-400">Add Manually</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-[#282828] border-transparent rounded-md p-2 focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-[#282828] border-transparent rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
                            </div>
                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-300">Priority</label>
                                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="mt-1 block w-full bg-[#282828] border-transparent rounded-md p-2 focus:ring-purple-500 focus:border-purple-500">
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300">Due Date</label>
                                <input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full bg-[#282828] border-transparent rounded-md p-2 focus:ring-purple-500 focus:border-purple-500" />
                            </div>
                            <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-transform duration-200 hover:scale-105">Add Task</button>
                        </form>
                    </div>

                    {/* AI Task Generation */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-purple-400">Generate with AI</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="ai-prompt" className="block text-sm font-medium text-gray-300">Describe your goal</label>
                                <textarea id="ai-prompt" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} rows={3} placeholder="e.g., Launch a new marketing campaign" className="mt-1 block w-full bg-[#282828] border-transparent rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
                            </div>
                            <button onClick={handleGenerateTasks} disabled={isGenerating || !aiPrompt} className="w-full flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed">
                                <Icon name="sparkles" className="w-5 h-5"/>
                                {isGenerating ? 'Generating...' : 'Generate Tasks'}
                            </button>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {generatedTasks.length > 0 && (
                            <div className="mt-6">
                                <h4 className="font-semibold mb-2">Suggested Tasks:</h4>
                                <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                    {generatedTasks.map((task, index) => (
                                        <li key={index} className="bg-[#282828] p-2 rounded-md text-sm">
                                            <p className="font-bold">{task.title}</p>
                                            <p className="text-gray-400">{task.description}</p>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={handleAddGeneratedTasks} className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md">Add These Tasks</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
