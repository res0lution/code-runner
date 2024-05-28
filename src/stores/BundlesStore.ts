import { makeAutoObservable } from "mobx"
import { createContext } from "react";
import bundle from "../bundler";

type BundleType = {
  loading: boolean;
  code: string;
  err: string;
} | undefined;

export interface Bundles {
  [key: string]: BundleType
}

class BundlesStore {
  bundles: Bundles = {}

  constructor() {
    makeAutoObservable(this)
  }

  async createBundle (id: string, input: string) {
    this.bundleStart(id)

    const result = await bundle(input)

    this.bundleComplete(id, { code: result.code, err: result.err })
  }

  bundleStart (id: string) {
    this.bundles[id] = {
      loading: true,
      code: '',
      err: ''
    }
  }

  bundleComplete (id: string, { code = '', err =  ''}) {
    this.bundles[id] = {
      loading: false,
      code,
      err,
    }
  }
}

export const bundlesStore = new BundlesStore();
export const BundlesStoreContext = createContext(bundlesStore);