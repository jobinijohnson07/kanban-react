export type Status = 'Open' | 'In Progress' | 'Review' | 'Done';

export interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  tag: string;
  status: Status;
}
