// Set current date and time dynamically
// Update and display current date and time
function updateDateTime() {
  const dateElem = document.getElementById('currentDate');
  const timeElem = document.getElementById('currentTime');

  const now = new Date();
  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

  if (dateElem) dateElem.textContent = now.toLocaleDateString('en-US', optionsDate);
  if (timeElem) timeElem.textContent = now.toLocaleTimeString('en-US', optionsTime);
}

function updateUserProfile() {
  const name = localStorage.getItem('name') || 'User';
  const role = localStorage.getItem('role') || 'Role';
  const image = localStorage.getItem('image') || 'assests/images/prfille_picture-removebg-preview.png';

  document.getElementById('navProfileName').textContent = name;
  document.getElementById('navProfileImg').src = image;


  const welcomeText = document.getElementById("welcome-text");
  if (welcomeText) {
    welcomeText.innerHTML = `Hi ${name},<br> Welcome Back!`;
  }

  const profileName = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");
  const profileImage = document.getElementById("profileImage");

  if (profileName) profileName.textContent = name;
  if (profileRole) profileRole.textContent = role;
  if (profileImage) {
    profileImage.src = image;
    profileImage.alt = name;
  }

  const navProfileName = document.getElementById("navProfileName");
  const navProfileImg = document.getElementById("navProfileImg");
  if (navProfileName) navProfileName.textContent = name;
  if (navProfileImg) {
    navProfileImg.src = image;
    navProfileImg.alt = name;
  }

  const welcomeName = document.getElementById("welcomeName");
  if (welcomeName) welcomeName.textContent = name;
}

window.onload = function () {
  updateDateTime();
  updateUserProfile();
};
const monthSelect = document.getElementById("month");
const yearSelect = document.getElementById("year");
const calendar = document.getElementById("calendar");

// Get today's date
const today = new Date();
const currentMonth = today.getMonth(); // 0-indexed
const currentYear = today.getFullYear();

// Set current month and year as selected in dropdowns
monthSelect.selectedIndex = currentMonth;
for (let i = 0; i < yearSelect.options.length; i++) {
  if (parseInt(yearSelect.options[i].value) === currentYear) {
    yearSelect.selectedIndex = i;
    break;
  }
}

function generateCalendar(month, year) {
  calendar.innerHTML = ""; // Clear previous calendar

  const firstDay = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
    const th = document.createElement("th");
    th.innerText = day;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.innerText = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.innerText = date;

        if (
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          cell.classList.add("today");
        }

        date++;
      }

      row.appendChild(cell);
    }

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  calendar.appendChild(table);
}

// Initialize calendar with today's month and year
generateCalendar(currentMonth, currentYear);

// Update calendar when month/year changes
monthSelect.addEventListener("change", () => {
  generateCalendar(monthSelect.selectedIndex, parseInt(yearSelect.value));
});
yearSelect.addEventListener("change", () => {
  generateCalendar(monthSelect.selectedIndex, parseInt(yearSelect.value));
});


document.addEventListener('DOMContentLoaded', function () {
  const createTaskBtn = document.querySelector(".create-task-btn");
  const modal = document.getElementById("task-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const form = document.getElementById("task-form");
  const taskListContainer = document.querySelector(".task-list");

  const priorityValue = { high: 1, medium: 2, low: 3 };
  let tasks = [];

  // Event listeners for modal open/close
  createTaskBtn?.addEventListener("click", () => modal?.classList.remove("hidden"));
  closeModalBtn?.addEventListener("click", () => modal?.classList.add("hidden"));
  window.addEventListener("click", e => {
    if (e.target === modal) modal?.classList.add("hidden");
  });

  // Load tasks from localStorage on page load
  function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority]);
    renderTasks();
  }

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render task rows
  function renderTasks() {
    taskListContainer.innerHTML = "";
    tasks.forEach((task, index) => {
      const row = document.createElement("div");
      row.classList.add("task-row");
      row.innerHTML = `
        <span><strong>• ${task.title}</strong></span>
        <span>${task.category}</span>
        <span>${task.deadline}</span>
        <span style="color:${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green'}">${task.priority}</span>
        <span><button data-index="${index}" class="delete-btn">Delete</button></span>
      `;
      row.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
      taskListContainer.appendChild(row);
    });
  }

  // Form submit handler
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("task-title").value.trim();
    const category = document.getElementById("task-category").value.trim();
    const deadline = document.getElementById("task-deadline").value;
    const priority = document.getElementById("task-priority").value;

    if (!title || !category || !deadline || !priority) {
      alert("Please fill in all fields.");
      return;
    }

    tasks.push({ title, category, deadline, priority });
    tasks.sort((a, b) => priorityValue[a.priority] - priorityValue[b.priority]);
    saveTasks();
    renderTasks();
    form.reset();
    modal.classList.add("hidden");
  });

  // Load on start
  loadTasks();

  // Profile dropdown logic
  const profileToggle = document.getElementById('profileMenuToggle');
  const profileDropdown = document.getElementById('profileDropdown');
  const profileNameElem = document.getElementById('navProfileName');
  const profileImgElem = document.getElementById('navProfileImg');
  const logoutBtn = document.getElementById('logoutBtn');

  function setProfileUI(name, image) {
    profileNameElem.textContent = name || 'User';
    profileImgElem.src = image || 'assests/images/prfille_picture-removebg-preview.png';
  }

  profileToggle?.addEventListener('click', () => {
    profileDropdown?.classList.toggle('hidden');
  });

  const token = localStorage.getItem('token');
  if (token) {
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    setProfileUI(name, image);
  } else {
    setProfileUI('User', 'assests/images/prfille_picture-removebg-preview.png');
  }

  logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('image');
    setProfileUI('User', 'assests/images/prfille_picture-removebg-preview.png');
    profileDropdown?.classList.add('hidden');
    window.location.href = 'login.html';
  });

  // Icon click to open popup
  document.querySelectorAll('.card .fa-square-plus').forEach(icon => {
    icon.addEventListener('click', () => {
      document.getElementById('taskPopup').style.display = 'block';
    });
  });

  function closePopup() {
    document.getElementById('taskPopup').style.display = 'none';
  }

  document.getElementById('taskForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const taskName = document.getElementById('taskName').value.trim();
    const taskCategory = document.getElementById('taskCategory').value.trim();
    const taskDeadline = document.getElementById('taskDeadline').value;

    if (!taskName || !taskCategory || !taskDeadline) {
      alert('Please fill in all fields');
      return;
    }

    const taskRow = document.createElement('div');
    taskRow.className = 'task-row';
    taskRow.innerHTML = `
      <span>${taskName}</span>
      <span>${taskCategory}</span>
      <span>${taskDeadline}</span>
      <span><button class="delete-btn">Delete</button></span>
    `;

    document.querySelector('.task-list').appendChild(taskRow);

    taskRow.querySelector('.delete-btn').addEventListener('click', () => {
      taskRow.remove();
    });

    this.reset();
    closePopup();
  });
});
const addNoteBtn = document.getElementById("add-note-btn");
const noteModal = document.getElementById("note-modal");
const closeNoteModalBtn = document.getElementById("close-note-modal");
const noteForm = document.getElementById("note-form");
const noteContentInput = document.getElementById("note-content");
const stickyNotesContainer = document.getElementById("sticky-notes-container");

addNoteBtn.addEventListener("click", () => {
  noteModal.classList.remove("hidden");
});

closeNoteModalBtn.addEventListener("click", () => {
  noteModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === noteModal) {
    noteModal.classList.add("hidden");
  }
});

function createNoteElement(content) {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  noteDiv.innerHTML = `
    <p><strong>Note:</strong></p>
    <hr class="bold-line" />
    <p>${content.replace(/\n/g, "<br>")}</p>
    <button class="delete-note-btn" style="
        margin-top: 10px;
        background-color:rgb(231, 76, 60);
        color: white;
        border: none;
        border-radius: 0.3rem;
        padding: 0.3rem 0.6rem;
        cursor: pointer;
        font-size: 0.9rem;
    ">Delete</button>
  `;

  const deleteBtn = noteDiv.querySelector(".delete-note-btn");
  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    removeNoteFromStorage(content);
  });

  return noteDiv;
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
  stickyNotesContainer.innerHTML = "";
  notes.forEach((noteContent) => {
    const noteElement = createNoteElement(noteContent);
    stickyNotesContainer.appendChild(noteElement);
  });
}

function saveNoteToStorage(content) {
  const notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
  notes.push(content);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function removeNoteFromStorage(content) {
  let notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
  notes = notes.filter((note) => note !== content);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const content = noteContentInput.value.trim();
  if (!content) {
    alert("Please enter some note content.");
    return;
  }

  const newNote = createNoteElement(content);
  stickyNotesContainer.appendChild(newNote);

  saveNoteToStorage(content);

  noteForm.reset();
  noteModal.classList.add("hidden");
});

loadNotes();
const addNotificationBtn = document.getElementById("add-notification-btn");
const notificationModal = document.getElementById("notification-modal");
const closeNotificationModal = document.getElementById("close-notification-modal");

addNotificationBtn.addEventListener("click", () => {
  notificationModal.classList.remove("hidden");
});

closeNotificationModal.addEventListener("click", () => {
  notificationModal.classList.add("hidden");
});

