## ✅ `backend/README.md`

```markdown
# 🛠️ Hackathon Registration Backend

This is the backend server for the Innovatex Hackathon registration platform. It provides RESTful APIs to register teams, handle admin verification, upload payment screenshots to Cloudinary, and render confirmation slips using EJS.

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (for image uploads)
- EJS (confirmation slip rendering)
- dotenv
- morgan
- cors

---

## 📁 Folder Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB connection
│   └── cloudinary.js         # Cloudinary configuration
├── controllers/
│   ├── teamController.js     # Team registration and retrieval
│   └── adminController.js    # Admin routes (verification, etc.)
├── models/
│   └── teamModel.js          # Mongoose schema for Team
├── routes/
│   ├── teamRoutes.js         # Public routes for team
│   └── adminRoutes.js        # Admin-only routes
├── views/
│   └── confirmation.ejs      # Confirmation slip template
├── public/                   # Static files (if needed)
├── server.js                 # Entry point
└── .env                      # Environment variables
```

---

## 🌐 API Base URL

```
http://localhost:8000/api/
```

---

## 📦 Installation

```bash
cd backend
npm install
```

---

## 🔐 Environment Variables (`.env`)

Create a `.env` file in the root with the following:

```env
PORT=8000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🚀 Running the Server

```bash
npm run dev
```

Make sure MongoDB and environment variables are set up properly.

---

## 🔁 API Endpoints

### 📌 Team Routes (`/api/team`)
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/register`           | Register a new team                  |
| GET    | `/all`                | Get all registered teams             |
| GET    | `/:teamName`          | Get team details by team name        |

### 📌 Admin Routes (`/api/admin`)
| Method | Endpoint              | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/verify/:id`         | Verify a team & assign sequential ID |
| GET    | `/teams`              | Get all teams (admin view)           |

### 📌 Confirmation Route
| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/confirmation/:id`     | Renders EJS slip for verified team  |

---

## 📄 Features

- ✅ Register team with up to 5 members
- 📷 Upload and store payment screenshot on Cloudinary
- 🧾 Render confirmation slip using EJS after admin verification
- 🔐 Admin verification flow with sequential `teamId` (e.g., team1, team2...)
- 📁 View all teams and specific team details

---

## 🧪 Sample Registration Payload

```json
{
  "teamName": "CodeCrafters",
  "track": "Web Development",
  "collegeName": "GIET University",
  "members": [
    {
      "name": "Alice",
      "email": "alice@example.com",
      "contactNo": "9999999999",
      "gender": "Female"
    },
    {
      "name": "Bob",
      "email": "bob@example.com",
      "contactNo": "8888888888",
      "gender": "Male"
    }
  ]
}
```
*(Send `members` as a JSON string in form-data with a `paymentScreenshot` file.)*

---

## 📬 Contact

For queries or contributions:

**Durga Prasad Dalai**  
📧 [durgaprasaddalai10@gmail.com](mailto:durgaprasaddalai10@gmail.com)

---

```