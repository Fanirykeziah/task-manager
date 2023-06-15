import create from 'zustand';

export type Value = {
  id: number;
  title: string;
  setValues: (values: { id: number; title: string }) => void;
};

const useLocalStorage = create<Value>((set) => ({
  id: parseInt(localStorage.getItem('id') ?? '0', 10),
  title: localStorage.getItem('title') ?? '',
  setValues: (values) => {
    set(values);
    localStorage.setItem('id', values.id.toString());
    localStorage.setItem('title', values.title);
  },
}));

export {
  useLocalStorage
}
