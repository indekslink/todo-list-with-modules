import { todoList } from "./domElements.js";
import { getTodosFromLocalStorage } from "./storage.js";
import { toggleCompleteTask, removeTask } from "./todoUtils.js";

// Fungsi untuk membuat elemen tugas
export const createTodoItem = (task, index) => {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  if (task.completed) {
    li.classList.add("completed");
  }

  li.innerHTML = `
        <div>
            <input type="checkbox" ${task.completed ? "checked" : ""} />
            <span>${task.text}</span>
        </div>
        <button class="remove-btn">Remove</button>
    `;

  // Event listener untuk checkbox (centang tugas)
  li.querySelector('input[type="checkbox"]').addEventListener("change", () => {
    toggleCompleteTask(index);
  });

  // Event listener untuk tombol "Remove" dengan SweetAlert konfirmasi
  li.querySelector(".remove-btn").addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeTask(index);
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  });

  return li;
};

// Fungsi untuk memperbarui tampilan daftar tugas berdasarkan filter
export const renderTodos = (filter = "all") => {
  todoList.innerHTML = ""; // Kosongkan daftar
  const todos = getTodosFromLocalStorage(); // Ambil data dari localStorage

  todos.forEach((task, index) => {
    if (
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "active" && !task.completed)
    ) {
      todoList.appendChild(createTodoItem(task, index));
    }
  });
};
