import { makeAutoObservable } from "mobx"
import { createContext } from "react";

type CellType = 'code' | 'text';

export interface Cell {
  id: string;
  type: CellType;
  content: string;
}

class CellsStore {
  loading = false
  error: string | null = null
  order: string[] = []
  data: { [key: string]: Cell } = {}

  constructor() {
    makeAutoObservable(this)
  }

  updateCell (id: string, content: string) {
    this.data = { ...this.data, [id]: { ...this.data[id], content }}
  }

  deleteCell (id: string) {
    delete this.data[id]
    this.order = this.order.filter(c => c !== id)
  }

  moveCell (id: string, direction: 'up' | 'down') {
    const index = this.order.findIndex(c => c === id)
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex > this.order.length - 1) {
      return
    }

    this.order[index] = this.order[targetIndex]
    this.order[targetIndex] = id
  }

  insertCellAfter (id: string | null, type: CellType) {
    const cell: Cell = {
      content: '',
      type,
      id: Math.random().toString(36).substr(2, 5)
    }

    this.data[cell.id] = cell

    const foundIndex = this.order.findIndex(c => c === id)

    if (foundIndex < 0) {
      this.order.unshift(cell.id)
    } else {
      this.order.splice(foundIndex + 1, 0, cell.id)
    }
  }

  getCumulativeCode (id: string) {
    const orderedCells= this.order.map(id => this.data[id])

    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root')
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value)
          }
        } else {
          root.innerHTML = value
        }
      }
    `

    const showFuncNoop = 'var show = () => {}'
    const cumulativeCode = []
    
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === id) {
          cumulativeCode.push(showFunc)
        } else {
          cumulativeCode.push(showFuncNoop)
        }
        cumulativeCode.push(c.content)
      }

      if (c.id === id) {
        break
      }
    }

    return cumulativeCode.join('\n')
  }
}

export const cellsStore = new CellsStore();
export const CellsStoreContext = createContext(cellsStore);