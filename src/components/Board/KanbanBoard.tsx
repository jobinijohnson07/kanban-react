import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from './Column.tsx';
import { tasks as initialTasks } from '../../data/tasks';
import type { Task, Status } from '../../types/task';

const statuses: Status[] = ['Open', 'In Progress', 'Review', 'Done'];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === draggableId
          ? { ...task, status: destination.droppableId as Status }
          : task
      )
    );
  };

  return (
    <div>
      <div className="kanban-heading">Kanban Board</div>
      <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        {statuses.map(status => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter(task => task.status === status)}
          />
        ))}
      </DragDropContext>
    </div>
    </div>
    
  );
};

export default KanbanBoard;
