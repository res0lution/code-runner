import { cellsStore } from "../stores/CellsStore";

import './action-bar.css'

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  return <div className="action-bar">
    <button className="button is-secondary is-small" onClick={() => cellsStore.moveCell(id, 'up')}>
      <span className="icon">
        <i className="fas fa-arrow-up"></i>
      </span>
    </button>
    <button className="button is-secondary is-small" onClick={() => cellsStore.moveCell(id, 'down')}>
      <span className="icon">
        <i className="fas fa-arrow-down"></i>
      </span>
    </button>
    <button className="button is-secondary is-small" onClick={() => cellsStore.deleteCell(id)}>
      <span className="icon">
        <i className="fas fa-times"></i>
      </span>
    </button>
  </div>
}

export default ActionBar