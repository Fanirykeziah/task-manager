import create from 'zustand';

//Type of Tasks 
interface Task {
  id: number;
  title: string;
}

//Type of StateManager Task
interface TaskManagerState {
  tasks: Task[];
  searchTask: (searchQuery: string) => void;
  addTask: (newTask: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
}

//State Manager Tasks
const useTaskManager = create((set) => ({
  tasks: [],

  //For searching task title
  searchTask: (searchQuery: string) => {
    set((state : TaskManagerState) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  },

  //For new task
  addTask: (newTask:Task) => {
    set((state: TaskManagerState) => ({
      tasks: [...state.tasks, newTask],
    }));
  },

  //For updating task with taskId
  updateTask: (taskId: number, updatedTask:Partial<Task>) => {
    set((state: TaskManagerState) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    }));
  },

  //For delete task with taskId
  deleteTask: (taskId: number) => {
    set((state: TaskManagerState) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },
}));

export {
  useTaskManager
}