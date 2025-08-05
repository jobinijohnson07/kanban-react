import type { Task } from "../types/task.ts";

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design Login Page',
    assignee: 'Ajay',
    dueDate: '10-08-2025',
    tag: 'Design',
    status: 'Open',
  },
  {
    id: '2',
    title: 'Setup CI/CD Pipeline',
    assignee: 'Beula',
    dueDate: '12-08-2025',
    tag: 'Backend',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Implement Frontend Flow',
    assignee: 'Vijay',
    dueDate: '15-08-2025',
    tag: 'Frontend',
    status: 'Review',
  },
  {
    id: '4',
    title: 'Review Frontend Code',
    assignee: 'Akash',
    dueDate: '14-08-2025',
    tag: 'Frontend',
    status: 'Done',
  },
  {
    id: '5',
    title: 'Design Systems',
    assignee: 'Reshma',
    dueDate: '11-08-2025',
    tag: 'Design',
    status: 'Open',
  },
];
