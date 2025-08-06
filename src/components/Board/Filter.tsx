import { useState } from 'react';

const Filter = () => {
    const [filterAssignees, setFilterAssignees] = useState<string[]>([]);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [filterMode, setFilterMode] = useState<'AND' | 'OR' | 'NOT'>('AND');

}
export default Filter;