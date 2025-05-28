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

// Update profile info from localStorage
function updateUserProfile() {
  const name = localStorage.getItem('name') || 'User';
  const role = localStorage.getItem('role') || 'Role';
  const image = localStorage.getItem('image') || 'assets/images/default-profile.jpg';

  // Welcome message (if exists)
  const welcomeText = document.getElementById("welcome-text");
  if (welcomeText) {
    welcomeText.innerHTML = `Hi ${name},<br> Welcome Back!`;
  }

  // Profile card info
  const profileName = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");
  const profileImage = document.getElementById("profileImage");

  if (profileName) profileName.textContent = name;
  if (profileRole) profileRole.textContent = role;
  if (profileImage) {
    profileImage.src = image;
    profileImage.alt = name;
  }

  // Nav bar profile (if used)
  const navProfileName = document.getElementById("navProfileName");
  const navProfileImg = document.getElementById("navProfileImg");
  if (navProfileName) navProfileName.textContent = name;
  if (navProfileImg) {
    navProfileImg.src = image;
    navProfileImg.alt = name;
  }

  // Dashboard welcome name (if used)
  const welcomeName = document.getElementById("welcomeName");
  if (welcomeName) welcomeName.textContent = name;
}

// Run everything on page load
window.onload = function () {
  updateDateTime();
  updateUserProfile();
};
// Call functions on page load
window.onload = function () {
  updateDateTime();
  updateUserProfile();
};


// Action-cards popUP of add task
// Open popup when plus icon is clicked
document.querySelectorAll('.card .fa-square-plus').forEach(icon => {
  icon.addEventListener('click', () => {
    document.getElementById('taskPopup').style.display = 'block';
  });
});

// Close popup
function closePopup() {
  document.getElementById('taskPopup').style.display = 'none';
}

// Handle task form submission
document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const taskName = document.getElementById('taskName').value.trim();
  const taskCategory = document.getElementById('taskCategory').value.trim();

  if (!taskName || !taskCategory) {
    alert('Please fill in all fields');
    return;
  }

  // Create new task row with delete button
  const taskRow = document.createElement('div');
  taskRow.className = 'task-row';
  taskRow.innerHTML = `
    <span>${taskName}</span>
    <span>${taskCategory}</span>
    <span><button class="delete-btn">Delete</button></span>
  `;

  // Append to task list
  document.querySelector('.task-list').appendChild(taskRow);

  // Add delete functionality
  taskRow.querySelector('.delete-btn').addEventListener('click', () => {
    taskRow.remove();
  });

  // Clear form and close popup
  document.getElementById('taskForm').reset();
  closePopup();
});

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

// Elements for task modal and task list
// Get DOM elements
const createTaskBtn = document.querySelector(".create-task-btn");
const modal = document.getElementById("task-modal");
const closeModalBtn = document.getElementById("close-modal");
const taskForm = document.getElementById("task-form");
const taskList = document.querySelector(".task-list");

// Show modal when clicking 'Create new task'
createTaskBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal when clicking the close icon
closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal if clicking outside modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Function to create task row element
function createTaskRow(title, category) {
  const taskRow = document.createElement("div");
  taskRow.classList.add("task-row");

  const titleSpan = document.createElement("span");
  titleSpan.textContent = "• " + title;

  const categorySpan = document.createElement("span");
  categorySpan.textContent = category;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "1rem";
  deleteBtn.style.backgroundColor = "#e74c3c";
  deleteBtn.style.color = "white";
  deleteBtn.style.border = "none";
  deleteBtn.style.borderRadius = "0.3rem";
  deleteBtn.style.cursor = "pointer";
  deleteBtn.style.padding = "0.2rem 0.5rem";
  deleteBtn.style.fontSize = "0.8rem";

  // Delete task event
  deleteBtn.addEventListener("click", () => {
    taskRow.remove();
    removeTaskFromStorage(title, category);
  });

  taskRow.appendChild(titleSpan);
  taskRow.appendChild(categorySpan);
  taskRow.appendChild(deleteBtn);

  return taskRow;
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach(({ title, category }) => {
    const taskRow = createTaskRow(title, category);
    taskList.appendChild(taskRow);
  });
}

// Save task list on addition
function saveTaskToStorage(title, category) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ title, category });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTaskFromStorage(title, category) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(
    (task) => !(task.title === title && task.category === category)
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Handle form submit to add new task
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("task-title");
  const categoryInput = document.getElementById("task-category");

  const title = titleInput.value.trim();
  const category = categoryInput.value.trim();

  if (!title || !category) {
    alert("Please fill in both Task and Category.");
    return;
  }

  // Create and append task row
  const newTaskRow = createTaskRow(title, category);
  taskList.appendChild(newTaskRow);

  // Save task
  saveTaskToStorage(title, category);

  // Reset form and hide modal
  taskForm.reset();
  modal.classList.add("hidden");
});

// Load existing tasks when page loads
loadTasks();

// Get DOM elements
const addNoteBtn = document.getElementById("add-note-btn");
const noteModal = document.getElementById("note-modal");
const closeNoteModalBtn = document.getElementById("close-note-modal");
const noteForm = document.getElementById("note-form");
const noteContentInput = document.getElementById("note-content");
const stickyNotesContainer = document.getElementById("sticky-notes-container");

// Show modal on clicking + icon
addNoteBtn.addEventListener("click", () => {
  noteModal.classList.remove("hidden");
});

// Close modal on clicking X
closeNoteModalBtn.addEventListener("click", () => {
  noteModal.classList.add("hidden");
});

// Close modal if clicked outside modal content
window.addEventListener("click", (e) => {
  if (e.target === noteModal) {
    noteModal.classList.add("hidden");
  }
});

// Function to create a note element
function createNoteElement(content) {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  // Inner HTML structure of the note
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

  // Delete note event
  const deleteBtn = noteDiv.querySelector(".delete-note-btn");
  deleteBtn.addEventListener("click", () => {
    noteDiv.remove();
    removeNoteFromStorage(content);
  });

  return noteDiv;
}

// Load notes from localStorage and render
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
  stickyNotesContainer.innerHTML = "";
  notes.forEach((noteContent) => {
    const noteElement = createNoteElement(noteContent);
    stickyNotesContainer.appendChild(noteElement);
  });
}

// Save new note in localStorage
function saveNoteToStorage(content) {
  const notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
  notes.push(content);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

// Remove note from localStorage
function removeNoteFromStorage(content) {
  let notes = JSON.parse(localStorage.getItem("stickyNotes")) || [];
  notes = notes.filter((note) => note !== content);
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

// Handle form submit - add new note
noteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const content = noteContentInput.value.trim();
  if (!content) {
    alert("Please enter some note content.");
    return;
  }

  // Create note element and add to container
  const newNote = createNoteElement(content);
  stickyNotesContainer.appendChild(newNote);

  // Save in storage
  saveNoteToStorage(content);

  // Reset form and hide modal
  noteForm.reset();
  noteModal.classList.add("hidden");
});

// Load notes on page load
loadNotes();
// Show/Hide Modal
const addNotificationBtn = document.getElementById("add-notification-btn");
const notificationModal = document.getElementById("notification-modal");
const closeNotificationModal = document.getElementById("close-notification-modal");

addNotificationBtn.addEventListener("click", () => {
    notificationModal.classList.remove("hidden");
});

closeNotificationModal.addEventListener("click", () => {
    notificationModal.classList.add("hidden");
});

// Add Notification
const notificationForm = document.getElementById("notification-form");
const notificationTextInput = document.getElementById("notification-text");
const notificationsList = document.getElementById("notifications-list");

notificationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = notificationTextInput.value.trim();
    if (text !== "") {
        const li = document.createElement("li");
        li.innerHTML = `${text} <span class="remove-btn">✖</span>`;
        notificationsList.appendChild(li);
        notificationTextInput.value = "";
        notificationModal.classList.add("hidden");
    }
});

// Remove Notification
notificationsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        e.target.parentElement.remove();
    }
});
