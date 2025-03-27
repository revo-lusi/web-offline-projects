const addTaskBtn = document.getElementById("add-task-button"),
  inputTask = document.getElementById("input-task"),
  containerTask = document.getElementById("container-task");

// Pengecekan Local Storage:
// jika user sudah pernah buat task, tambahkan task-task tsb ke tampilan)
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", "[]");
} else {
  JSON.parse(localStorage.getItem("tasks")).forEach((el) => {
    const newTaskBox = addTask(el.task);

    if (el.isChecked) {
      newTaskBox.firstChild.checked = true;
      newTaskBox.classList.add("checked");
    }
  });
}

// Ketika tombol "Tambahkan" di klik
addTaskBtn.addEventListener("click", function (e) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (inputTask.value !== "") {
    addTask(inputTask.value);
    tasks.push({ task: inputTask.value, isChecked: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    inputTask.value = "";
  }
});

// Ketika tombol check & hapus task di klik
containerTask.addEventListener("click", (e) => {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  // Ketika tombol delete diklik
  if (e.target.classList.contains("delete-task")) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      localStorage.setItem(
        "tasks",
        JSON.stringify(
          tasks.filter(
            (el) => el.task !== e.target.previousElementSibling.innerText
          )
        )
      );
      e.target.parentNode.remove();
    }
  } else if (e.target.classList.contains("check-task")) {
    // Ketika checkbox di klik
    if (!e.target.checked) {
      e.target.parentNode.classList.remove("checked");
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      e.target.parentNode.classList.add("checked");
      tasks.forEach((el) => {
        if (e.target.nextElementSibling.innerText == el.task) {
          el.isChecked = true;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});

// Functions
function addTask(task) {
  const taskBox = document.createElement("li");
  taskBox.classList.add("task");
  taskBox.innerHTML = `<input type="checkbox" class="check-task" />
        <span>${task}</span>
        <a class="delete-task">x</a>`;
  containerTask.appendChild(taskBox);

  return taskBox;
}
