import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard.tsx';
import type { Task, Status } from '../../types/task';

interface ColumnProps {
  status: Status;
  tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ status, tasks }) => {
  return (
    <div className="column">
      <h3>{status}</h3>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
