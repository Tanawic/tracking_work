
import type { FilterType } from './types';

interface NavItem {
    label: string;
    filter: FilterType;
    icon: 'home' | 'clock' | 'play' | 'check';
}

export const NAV_ITEMS: NavItem[] = [
    { label: 'All Tasks', filter: 'all', icon: 'home' },
    { label: 'To Do', filter: 'to-do', icon: 'clock' },
    { label: 'In Progress', filter: 'in-progress', icon: 'play' },
    { label: 'Completed', filter: 'done', icon: 'check' },
];
