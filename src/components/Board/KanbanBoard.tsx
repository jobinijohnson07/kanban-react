import { useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import Column from './Column.tsx';
import AddTaskForm from './AddTaskForm.tsx';
import TaskModal from './TaskModal.tsx';
import Filter from './Filter.tsx';
import { tasks as initialTasks } from '../../data/tasks';
import type { Task, Status } from '../../types/task';

const statuses: Status[] = ['Open', 'In Progress', 'Review', 'Done'];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [filters, setFilters] = useState({
    assignees: [] as string[],
    assigneeNot: false,
    tags: [] as string[],
    tagNot: false,
    mode: null as 'AND' | 'OR' | null,
  });

  const filteredTasks = tasks.filter(task => {
  const assigneeMatch = filters.assigneeNot
      ? !filters.assignees.includes(task.assignee)
      : filters.assignees.length === 0 || filters.assignees.includes(task.assignee);

  const tagMatch = filters.tagNot
      ? !filters.tags.includes(task.tag)
      : filters.tags.length === 0 || filters.tags.includes(task.tag);

    if (filters.mode === 'AND') {
      return assigneeMatch && tagMatch;
    } else if (filters.mode === 'OR') {
      return assigneeMatch || tagMatch;
    } else {
      if (filters.assignees.length > 0 && filters.tags.length > 0) {
        return assigneeMatch && tagMatch; 
      } else if (filters.assignees.length > 0) {
        return assigneeMatch;
      } else if (filters.tags.length > 0) {
        return tagMatch;
      } else {
        return true; 
      }
    }
  });


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

  const assigneeOptions = [...new Set(tasks.map(task => task.assignee))];
  const tagOptions = [...new Set(tasks.map(task => task.tag))];

  return (
    <div>
      <div className="kanban-heading">Kanban Board</div>

      <div className="header-section">
        <Filter
          assigneeOptions={assigneeOptions}
          tagOptions={tagOptions}
          onFilterChange={setFilters}
        />

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
              tasks={filteredTasks.filter(task => task.status === status)}
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
