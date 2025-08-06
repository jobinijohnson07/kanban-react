import { useState } from 'react';
import type { Task, Status } from '../../types/task';

interface AddTaskFormProps {
  onAdd: (task: Task) => void;
}

const defaultStatus: Status = 'Open';

const getTodayFormatted = (): string => {
  const today = new Date();
  return today.toLocaleDateString('en-GB').split('/').join('-');
};

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    tag: '',
    createdAt: getTodayFormatted(),
    createdBy: '',
    assignee: '',
    dueDate: '',
    estimation: '',
    status: defaultStatus,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.tag.trim()) newErrors.tag = 'Tag is required';
    if (!formData.createdBy.trim()) newErrors.createdBy = 'Created By is required';
    if (!formData.assignee.trim()) newErrors.assignee = 'Assignee is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due Date is required';

    if (!formData.estimation.trim()) newErrors.estimation = 'Estimation is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formattedDueDate = new Date(formData.dueDate)
      .toLocaleDateString('en-GB')
      .split('/')
      .join('-');

    const newTask: Task = {
      id: Date.now().toString(),
      ...formData,
      dueDate: formattedDueDate,
      createdAt: getTodayFormatted(),
    };

    onAdd(newTask);

    setFormData({
      title: '',
      description: '',
      tag: '',
      createdAt: getTodayFormatted(),
      createdBy: '',
      assignee: '',
      dueDate: '',
      estimation: '',
      status: defaultStatus,
    });

    setErrors({});
  };

  return (
    <div className="modal-content">
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Title</label>
          <input name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <small className="error">{errors.title}</small>}
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} />
          {errors.description && <small className="error">{errors.description}</small>}
        </div>

        <div className="form-row">
          <label>Tag</label>
          <input name="tag" value={formData.tag} onChange={handleChange} />
          {errors.tag && <small className="error">{errors.tag}</small>}
        </div>

        <div className="form-row">
          <label>Created By</label>
          <input name="createdBy" value={formData.createdBy} onChange={handleChange} />
          {errors.createdBy && <small className="error">{errors.createdBy}</small>}
        </div>

        <div className="form-row">
          <label>Assignee</label>
          <input name="assignee" value={formData.assignee} onChange={handleChange} />
          {errors.assignee && <small className="error">{errors.assignee}</small>}
        </div>

        <div className="form-row">
          <label>Due Date</label>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          {errors.dueDate && <small className="error">{errors.dueDate}</small>}
        </div>

        <div className="form-row">
          <label>Estimation</label>
          <input name="estimation" value={formData.estimation} onChange={handleChange} />
          {errors.estimation && <small className="error">{errors.estimation}</small>}
        </div>

        <div className="form-row">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Create Task</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
