import {
  getTodosFromLocalStorage,
  saveTodosToLocalStorage,
} from "./storage.js";
import { renderTodos } from "./render.js";

// Fungsi untuk menambahkan tugas baru
export const addTask = (taskText) => {
  const todos = getTodosFromLocalStorage();
  todos.push({ text: taskText, completed: false });
  saveTodosToLocalStorage(todos);
  renderTodos();

  // SweetAlert notifikasi setelah tugas berhasil ditambahkan
  Swal.fire({
    title: "Task Added!",
    text: `Your task "${taskText}" has been successfully added to the list.`,
    icon: "success",
    confirmButtonText: "OK",
  });
};

// Fungsi untuk menandai tugas sebagai selesai atau belum selesai
export const toggleCompleteTask = (index) => {
  const todos = getTodosFromLocalStorage();
  todos[index].completed = !todos[index].completed;
  saveTodosToLocalStorage(todos);
  renderTodos(); // Refresh daftar tugas setelah status berubah
};

// Fungsi untuk menghapus tugas
export const removeTask = (index) => {
  const todos = getTodosFromLocalStorage();
  todos.splice(index, 1);
  saveTodosToLocalStorage(todos);
  renderTodos();
};
