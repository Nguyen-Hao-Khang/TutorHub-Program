# MyLMSProject

Dự án demo hệ thống **Learning Management System (LMS)** đơn giản, gồm **Backend (Flask - Python)** và **Frontend (ReactJS + TailwindCSS)**.  
Mục tiêu: giúp người mới dễ dàng chạy thử một hệ thống fullstack cơ bản.

---

## 📂 Cấu trúc thư mục
MyLMSProject/ │── backend/ │   ├── server.py        # Flask backend (API giả lập) │   └── venv/            # Virtual environment (Python) │ │── frontend/ │   ├── index.html │   ├── package.json │   └── src/ │       ├── App.jsx      # React frontend (UI demo) │       ├── main.jsx │       └── index.css    # TailwindCSS config

---

## ⚙️ Cài đặt & Chạy

### 1. Backend (Flask)
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install flask flask-cors
python server.py


👉 Server chạy tại: http://127.0.0.1:5000

2. Frontend (React + Vite)
cd frontend
npm install
npm run dev


👉 Mở trình duyệt tại: http://localhost:5173

🛠️ Công nghệ sử dụng
- Backend: Python, Flask, Flask-CORS
- Frontend: ReactJS (Vite), TailwindCSS
- Dev Environment: Node.js, Virtualenv

🎯 Mục tiêu
- Demo hệ thống LMS cơ bản với API backend và giao diện frontend.
- Giúp người mới học dễ dàng copy-paste và chạy thử ngay.

📌 Ghi chú
- Đây chỉ là bản demo, dữ liệu được hardcode trong server.py.
