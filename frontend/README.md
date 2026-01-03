# Contact Management Application

A full-stack Contact Management web application built using the **MERN stack**.  
This application allows users to **add, view, update, delete, sort, and paginate contacts** without page reloads, following modern UI/UX and best development practices.

---

## Live Demo

- **Frontend:** https://contact-manager-kappa-kohl.vercel.app 


---

## Tech Stack

### Frontend
- React.js (Vite)
- Context API (Global State Management)
- Axios
- CSS (Responsive, Mobile-first)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful APIs

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **MongoDB Atlas**

---

##  Features

- Add new contacts with validation
- View contacts in a paginated table
- Edit existing contact details
- Delete contacts with confirmation
- Real-time UI updates (no page reload)
- Correct serial numbering with pagination
- Created & last updated timestamps
- Sort contacts by **Latest** or **Name**
- Fully responsive (mobile, tablet, desktop)
- Success & error notifications

---

##  UI/UX Highlights

- Clean and minimal interface
- Sticky table headers
- Mobile-friendly layout
- Disabled buttons on invalid input
- Clear validation messages
- Optimized spacing and alignment


---

##  Project Structure

contact-manager/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── utils/
│ │ └── styles/
│ ├── vite.config.js
│ └── .env
│
└── README.md


Running Locally:
1.Clone the repository
   git clone https://github.com/SahilKumar-projects/contact-manager.git
   cd contact-manager

2.Start Backend
   cd backend
   npm install
   npm start

3.Start Frontend
   cd frontend
   npm install
    npm run dev

API Endpoints:
  Method	Endpoint	Description:
   GET	/api/contacts?page=1	Fetch paginated contacts
   POST	/api/contacts	Add new contact
  PUT	/api/contacts/:id	Update contact
DELETE	/api/contacts/:id	Delete contact

 Validations Implemented:

   1.Name: Minimum 3 characters

   2.Email: Valid email format

   3.Phone: Minimum 10 digits

   4.Submit disabled until form is valid

Pagination Logic:

    1.Backend-controlled pagination

    2.Dynamic total pages

    3.Correct serial numbering across pages

    4.Works correctly with sorting

Security & Best Practices:

    1.Environment variables for sensitive data

    2.No hardcoded URLs

    3.CORS configured properly

    4.Clean separation of concerns

Developer:

  Sahil Kumar
  Aspiring Full-Stack / MERN Developer

