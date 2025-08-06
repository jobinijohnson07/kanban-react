import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import TaskModal from './TaskModal';
import { tasks as initialTasks } from '../../data/tasks';
import type { Task, Status } from '../../types/task';

const statuses: Status[] = ['Open', 'In Progress', 'Review', 'Done'];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    setTasks(prev =>
      prev.map(task =>
        task.id === draggableId
          ? { ...task, status: destination.droppableId as Status }
          : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setSelectedTask(null);
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
              onCardClick={setSelectedTask}
            />
          ))}
        </DragDropContext>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
