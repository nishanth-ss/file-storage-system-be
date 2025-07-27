# 📦 File Upload Backend – Express + TypeScript + AWS S3

This project is a backend server built with **Express** and **TypeScript** that handles file uploads and stores them securely on **Amazon S3**. It provides a clean, modular API that can be integrated into any frontend or mobile application.

---

## 🚀 Project Setup

### 📁 Prerequisites
- Node.js (v16+ recommended)
- AWS account with an S3 bucket
- AWS access credentials (Access Key ID & Secret)
- `.env` file configured

### 🔧 Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/your-repo.git](https://github.com/nishanth-ss/file-storage-system-be.git)
cd file-storage-system-be

🧑‍💼 User Login
URL: http://localhost:8000/user/login
Method: POST
Headers: Content-Type: application/json

error: {"error":"Invalid credentials."}
success : {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODUyM2IyZGM5MDdiNDU0NGQ2ZWIyYiIsImVtYWlsIjoibmlzaGFudGhzZWthckBnbWFpbC5jb20iLCJpYXQiOjE3NTM2MDczMTYsImV4cCI6MTc1MzYxMDkxNn0.WbHO1dC7np1stTGXt-8nJW7UW0ady4nF5ilSCxOytUg"
}

🧑‍💼 user register
URL: http://localhost:8000/user/register
Method: POST
Headers: Content-Type: application/json

success: {"message":"User registered successfully."}

🧑‍💼 user get api for retrieve upload files
URL: http://localhost:8000/file
Method: GET
Headers: Content-Type: application/json

success: {
    "success": true,
    "files": [
        {
            "filename": "Nishanth_2year_experience.pdf",
            "url": "https://task-fileupload-demo.s3.ap-south-1.amazonaws.com/Nishanth_2year_experience.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVYV5ZUS36LOXKIU7%2F20250727%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250727T091127Z&X-Amz-Expires=3600&X-Amz-Signature=cc266641a7ad5377f061db26df7d350a7eb0b85259612635705101f72c5a8845&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
        }
    ]
}

🧑‍💼 user post api for upload files
URL: http://localhost:8000/file/upload
Method: POST
Headers: Content-Type: application/json

payload: file: [binary]
success:{
    "success": true,
    "filename": "Nishanth_frontend_resume (1).pdf",
    "url": "https://task-fileupload-demo.s3.ap-south-1.amazonaws.com/Nishanth_frontend_resume%20%281%29.pdf"
}

🧑‍💼 user delete api for files
URL: http://localhost:8000/file/upload](http://localhost:8000/file/Nishanth_frontend_resume%20(1).pdf)
Method: DELETE
Headers: Content-Type: application/json

success :{
    "success": true,
    "message": "File \"Nishanth_frontend_resume (1).pdf\" deleted successfully"
}

