
import React from 'react';
import type { FilterType } from '../types';
import { NAV_ITEMS } from '../constants';
import { Icon } from './Icon';

interface SidebarProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentFilter, onFilterChange }) => {
    return (
        <aside className="w-64 flex-shrink-0 p-2">
            <div className="h-full flex flex-col bg-[#121212] rounded-lg p-2">
                <div className="p-4 flex items-center gap-2">
                     <svg role="img" height="40" width="40" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M17.476 1.76a.75.75 0 0 0-1.06 0L1.76 16.416a.75.75 0 0 0 0 1.06L3.24 18.95c.142.14.33.22.53.22s.388-.08.53-.22L18.95 4.3a.75.75 0 0 0 0-1.06L17.476 1.76zM18.422.29a2.25 2.25 0 0 1 3.182 0l1.106 1.106a2.25 2.25 0 0 1 0 3.182L10.04 17.248a2.25 2.25 0 0 1-1.591.659H4.167a2.25 2.25 0 0 1-2.25-2.25v-4.28a2.25 2.25 0 0 1 .66-1.591L15.24.29h3.182z"></path></svg>
                    <h1 className="text-2xl font-bold">TaskFlow</h1>
                </div>
                <nav className="mt-4">
                    <ul>
                        {NAV_ITEMS.map(({ label, filter, icon }) => (
                            <li key={filter} className="px-2">
                                <button
                                    onClick={() => onFilterChange(filter)}
                                    className={`w-full flex items-center gap-4 px-4 py-2 rounded transition-colors duration-200 ${
                                        currentFilter === filter
                                            ? 'text-white bg-[#282828]'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <Icon name={icon} className="w-6 h-6" />
                                    <span className="font-semibold">{label}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};
