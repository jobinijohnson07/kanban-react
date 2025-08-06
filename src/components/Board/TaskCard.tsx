import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task)}
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
