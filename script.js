import {
  todoForm,
  newTaskInput,
  filterButtons,
} from "./modules/domElements.js";

import { addTask } from "./modules/todoUtils.js";
import { renderTodos } from "./modules/render.js";

// Event listener untuk form submit (menambahkan tugas)
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    newTaskInput.value = ""; // Kosongkan input setelah menambahkan
  }
});

// Event listeners untuk tombol filter
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");
    renderTodos(filter);

    // Tambahkan class active pada tombol yang dipilih
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Render tugas saat halaman dimuat
window.addEventListener("load", () => renderTodos());
