import React from 'react';
import type { Task } from '../../types/task';
import { X, Trash2 } from 'lucide-react'; 

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onDelete }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose} className="btn-close-icon" aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-header">
          <h2 className="title-content">{task.title}</h2>
        </div>

        <div className="modal-content">
          <p><strong>Description:</strong> {task.description || 'No description provided.'}</p>
          <p><strong>Tag:</strong> {task.tag}</p>
          <p><strong>Created At:</strong> {task.createdAt}</p>
          <p><strong>Created By:</strong> {task.createdBy}</p>
          <p><strong>Assignee:</strong> {task.assignee}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <p><strong>Estimation:</strong> {task.estimation || 'N/A'}</p>
        </div>

        <div className="modal-actions">
          <button onClick={() => onDelete(task.id)} className="btn-delete-icon" aria-label="Delete Task">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
