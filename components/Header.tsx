
import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
    onNewTaskClick: () => void;
    onSearch: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewTaskClick, onSearch }) => {
    return (
        <header className="flex-shrink-0 p-4 px-6 flex items-center justify-between bg-black bg-opacity-30">
            <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="search" className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search for tasks..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full bg-[#282828] rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
            <button
                onClick={onNewTaskClick}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-transform duration-200 hover:scale-105"
            >
                <Icon name="plus" className="w-5 h-5" />
                <span>New Task</span>
            </button>
        </header>
    );
};
