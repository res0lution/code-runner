import { cellsStore } from "../stores/CellsStore";

import './add-cell.css';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  return (<div className={`add-cell ${forceVisible && 'force-visible'}`}>
    <div className="add-buttons">
      <button 
        className="button is-secondary is-small" 
        onClick={() => cellsStore.insertCellAfter(previousCellId, 'code')}
      >
        <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Code</span>
      </button>

      <button 
        className="button is-secondary is-small"  
        onClick={() => cellsStore.insertCellAfter(previousCellId, 'text')}
      >
         <span className="icon is-small">
          <i className="fas fa-plus"></i>
        </span>
        <span>Text</span>
      </button>
    </div>
    <div className="divider"></div>
  </div>)
}

export default AddCell;