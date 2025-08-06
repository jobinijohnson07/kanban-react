import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from './Column.tsx';
import AddTaskForm from './AddTaskForm.tsx';
import TaskModal from './TaskModal.tsx';
import { tasks as initialTasks } from '../../data/tasks';
import type { Task, Status } from '../../types/task';

const statuses: Status[] = ['Open', 'In Progress', 'Review', 'Done'];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showFormModal, setShowFormModal] = useState(false);
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

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
    setShowFormModal(false);
  };

  const handleCardClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  return (
    <div>
      <div className="header-section">
        <div className="kanban-heading">Kanban Board</div>
        <button onClick={() => setShowFormModal(true)} className="button-content">
          Add Task
        </button>
      </div>

      <div className="kanban-board">
        <DragDropContext onDragEnd={onDragEnd}>
          {statuses.map(status => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              onCardClick={handleCardClick}
            />
          ))}
        </DragDropContext>
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDeleteTask}
        />
      )}

      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="createtask-content">Create New Task</h3>
              <button
                className="btn-close-icon"
                onClick={() => setShowFormModal(false)}
              >
                ✕
              </button>
            </div>
            <div className="modal-content">
              <AddTaskForm onAdd={handleAddTask} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard; 