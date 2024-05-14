import { makeAutoObservable } from "mobx";

const bundlesStore = () => {
  return makeAutoObservable({
    list: [] as { title: string; id: number }[],
  });
};

export default bundlesStore;