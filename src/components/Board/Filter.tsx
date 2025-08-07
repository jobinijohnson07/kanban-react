import { useState } from 'react';
import Select, { type MultiValue, type ActionMeta } from 'react-select';
import styles from '../../Filter.module.css';

interface Option {
  label: string;
  value: string;
}

interface FilterProps {
  assigneeOptions: string[];
  tagOptions: string[];
  onFilterChange: (filters: {
    assignees: string[];
    assigneeNot: boolean;
    tags: string[];
    tagNot: boolean;
    mode: 'AND' | 'OR' | null;
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ assigneeOptions, tagOptions, onFilterChange }) => {
  const [selectedAssignees, setSelectedAssignees] = useState<Option[]>([]);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [assigneeNot, setAssigneeNot] = useState(false);
  const [tagNot, setTagNot] = useState(false);
  const [mode, setMode] = useState<'AND' | 'OR' | null>(null);

  const toOptions = (arr: string[]): Option[] =>
    arr.map(item => ({ label: item, value: item }));

  const handleFilterChange = (
    assignees = selectedAssignees,
    assigneeNotFlag = assigneeNot,
    tags = selectedTags,
    tagNotFlag = tagNot,
    filterMode = mode
  ) => {
    onFilterChange({
      assignees: assignees.map(a => a.value),
      assigneeNot: assigneeNotFlag,
      tags: tags.map(t => t.value),
      tagNot: tagNotFlag,
      mode: filterMode,
    });
  };

  const toggleAssigneeNot = () => {
    const newVal = !assigneeNot;
    setAssigneeNot(newVal);
    handleFilterChange(selectedAssignees, newVal, selectedTags, tagNot, mode);
  };

  const toggleTagNot = () => {
    const newVal = !tagNot;
    setTagNot(newVal);
    handleFilterChange(selectedAssignees, assigneeNot, selectedTags, newVal, mode);
  };

  const handleModeChange = (newMode: 'AND' | 'OR') => {
    const updatedMode = mode === newMode ? null : newMode;
    setMode(updatedMode);
    handleFilterChange(selectedAssignees, assigneeNot, selectedTags, tagNot, updatedMode);
  };

  const handleAssigneeChange = (
    options: MultiValue<Option>,
    _: ActionMeta<Option>
  ) => {
    const safeOptions = [...options];
    setSelectedAssignees(safeOptions);
    handleFilterChange(safeOptions, assigneeNot, selectedTags, tagNot, mode);
  };

  const handleTagChange = (
    options: MultiValue<Option>,
    _: ActionMeta<Option>
  ) => {
    const safeOptions = [...options];
    setSelectedTags(safeOptions);
    handleFilterChange(selectedAssignees, assigneeNot, safeOptions, tagNot, mode);
  };

  const handleClear = () => {
    setSelectedAssignees([]);
    setSelectedTags([]);
    setAssigneeNot(false);
    setTagNot(false);
    setMode(null);
    handleFilterChange([], false, [], false, null);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={toggleAssigneeNot}
        className={`${styles.filterbutton} ${assigneeNot ? styles.active : ''}`}
      >
        NOT
      </button>

      <div className={styles.selectWrapper}>
        <Select
          isMulti
          options={toOptions(assigneeOptions)}
          value={selectedAssignees}
          onChange={handleAssigneeChange}
          placeholder="Assignee"
        />
      </div>

      <button
        type="button"
        onClick={() => handleModeChange('AND')}
        className={`${styles.filterbutton} ${mode === 'AND' ? styles.active : ''}`}
      >
        AND
      </button>

      <button
        type="button"
        onClick={() => handleModeChange('OR')}
        className={`${styles.filterbutton} ${mode === 'OR' ? styles.active : ''}`}
      >
        OR
      </button>

      <button
        type="button"
        onClick={toggleTagNot}
        className={`${styles.filterbutton} ${tagNot ? styles.active : ''}`}
      >
        NOT
      </button>

      <div className={styles.selectWrapper}>
        <Select
          isMulti
          options={toOptions(tagOptions)}
          value={selectedTags}
          onChange={handleTagChange}
          placeholder="Tags"
        />
      </div>

      <button
        type="button"
        onClick={handleClear}
        className={styles.clearButton}
      >
        Clear
      </button>
    </div>
  );
};

export default Filter;
