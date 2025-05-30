# 🧑‍💻 Smart Task Tracker - TinyMind

A full-stack task management web application designed to help users efficiently manage their daily activities. It offers smart features such as task creation, editing, priority tagging, deadline alerts, calendar integration, and a visually intuitive dashboard. The application is built with a responsive user interface, clean UI/UX design principles, and a robust backend for reliable data handling.


---

## 🚀 Tech Stack

- **Frontend**: HTML, CSS , JS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Netlify (Frontend), Render (Backend)

---

## 🛠️ Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/ankitadubey2004/Smart-Task-Tracker
cd "Smart Task Tracker"
```

2. Install frontend dependencies:
```bash
cd DashBoard
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create a .env file inside the novexus-backend folder:
```bash
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```


5. Start the backend:
```bash
cd backend
npm run dev
```
 

6. Start the frontend:
```bash
cd ../DashBoard
npm run dev
```

---


## 🔗 Live Site
[Live Site](https://tinymind-dash.netlify.app/)

---

## 🔐 MongoDB Note
- MongoDB credentials are stored securely in the .env file.
- .env is ignored in version control to keep your database secure.
- Example used in code: mongoose.connect(process.env.MONGO_URI)

--- 

## 📸 Screenshots

### 📝 Main DashBord 
![Form Screenshot](DashBoard/assests/images/Screenshot%202025-05-30%20091017.png)

### ✅Signup Page 
![Confirmation Screenshot](DashBoard/assests/images/Screenshot%202025-05-30%20091030.png)

### ✅Login Page 
![Confirmation Screenshot](DashBoard/assests/images/Screenshot%202025-05-30%20091042.png)


---

## ✅ Features
- 🔐User Authentication (Login/Signup)
- 📌Task Management (Add, Edit, Delete, Tag)
- ⚡Deadline Alerts & Visual Indicators
- 📅Calendar Integration (View tasks by date)
- 🔍Sort & Filter by Priority or Deadline
- 🔐MongoDB used for data persistence

--- 

## 🔁 Admin View

## 👩‍💻 Developer
- **Intern** : Ankita Dubey
-  **Start Date** : 26 May 2025
-  **Submission Date** : 02 June 2025
-  **Mentor** : Aryan Parashar





