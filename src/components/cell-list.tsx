import { useContext } from "react";
import { observer } from "mobx-react"

import { CellsStoreContext } from "../stores/CellsStore";
import CellListItem from "./cell-list-item";

const CellList: React.FC = observer(() => {
  const { order, data } = useContext(CellsStoreContext)
  const cells = order.map((id) => data[id])
  const renderedCells = cells.map((cell) => <CellListItem key={cell.id} cell={cell} />)

  return <div>{renderedCells}</div>
})

export default CellList