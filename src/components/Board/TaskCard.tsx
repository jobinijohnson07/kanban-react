import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../../types/task.ts';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{task.title}</h4>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Assignee:</strong> {task.assignee}</p>
          <span className="tag">{task.tag}</span>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
