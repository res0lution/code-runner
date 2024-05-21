import { Fragment, useContext } from "react";
import { observer } from "mobx-react"

import { CellsStoreContext } from "../stores/CellsStore";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = observer(() => {
  const { order, data } = useContext(CellsStoreContext)
  const cells = order.map((id) => data[id])
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </Fragment>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  )
})

export default CellList