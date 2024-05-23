import { makeAutoObservable } from "mobx"
import { createContext } from "react";

// type CellType = 'code' | 'text';

// export interface Cell {
//   id: string;
//   type: CellType;
//   content: string;
// }

class BundlesStore {
  loading = false
  error: string | null = null
  order: string[] = []
  // data: { [key: string]: Cell } = {}

  constructor() {
    makeAutoObservable(this)
  }

  bundleStart (id: string) {

  }

  bundleComplete (id: string) {

  }
}

export const bundlesStore = new BundlesStore();
export const BundlesStoreContext = createContext(bundlesStore);