
import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import { Status, Priority } from '../types';

const defaultTasks: Task[] = [
    { id: '1', title: 'Design the new logo', description: 'Create a modern and sleek logo for the project.', status: Status.InProgress, priority: Priority.High, dueDate: '2024-08-15' },
    { id: '2', title: 'Develop the landing page', description: 'Code the main landing page using React and Tailwind CSS.', status: Status.ToDo, priority: Priority.High, dueDate: '2024-08-20' },
    { id: '3', title: 'Set up CI/CD pipeline', description: 'Configure GitHub Actions for continuous integration and deployment.', status: Status.ToDo, priority: Priority.Medium },
    { id: '4', title: 'User authentication feature', description: 'Implement login and registration functionality.', status: Status.Done, priority: Priority.High, dueDate: '2024-07-30' },
    { id: '5', title: 'Write documentation', description: 'Document the API endpoints and component library.', status: Status.ToDo, priority: Priority.Low },
];

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        try {
            const storedTasks = localStorage.getItem('tasks');
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            } else {
                setTasks(defaultTasks);
            }
        } catch (error) {
            console.error("Failed to load tasks from localStorage", error);
            setTasks(defaultTasks);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Failed to save tasks to localStorage", error);
        }
    }, [tasks]);

    const addTask = useCallback((task: Omit<Task, 'id'>) => {
        const newTask: Task = { ...task, id: crypto.randomUUID() };
        setTasks(prevTasks => [newTask, ...prevTasks]);
    }, []);
    
    const addMultipleTasks = useCallback((newTasks: Omit<Task, 'id'>[]) => {
        const tasksWithIds: Task[] = newTasks.map(task => ({ ...task, id: crypto.randomUUID() }));
        setTasks(prevTasks => [...tasksWithIds, ...prevTasks]);
    }, []);

    const updateTask = useCallback((updatedTask: Task) => {
        setTasks(prevTasks =>
            prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
        );
    }, []);

    const deleteTask = useCallback((taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, []);

    return { tasks, addTask, updateTask, deleteTask, addMultipleTasks };
};
