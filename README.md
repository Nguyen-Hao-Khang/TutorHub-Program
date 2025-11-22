# TutorHub-Program

Dự án demo hệ thống **Learning Management System (LMS)** đơn giản, gồm **Backend (Flask - Python)** và **Frontend (ReactJS + TailwindCSS)**.  
Mục tiêu: giúp người mới dễ dàng chạy thử một hệ thống fullstack cơ bản.

---

## 📂 Cấu trúc thư mục
```
MyLMSProject/
├── backend/
│   ├── server.py
│   └── venv/
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx
        ├── main.jsx
        └── index.css
```

## ⚙️ Cài đặt & Chạy

### 1. Backend (Flask)
cd MyLMSProject/backend
**Tạo môi trường ảo (Khuyên dùng):**
```bash
python -m venv venv
```
**Kích hoạt môi trường ảo:**
```bash
.\venv\Scripts\activate
```
**Cài thư viện Flask và Flask-CORS:**
```bash
pip install flask flask-cors
```
**Chạy Server:**
```bash
python server.py
```
Khi thấy dòng chữ "Running on [http://127.0.0.1:5000](http://127.0.0.1:5000)" là thành công. **Đừng tắt cửa sổ này**, hãy để nó chạy ngầm.*

👉 Server chạy tại: http://127.0.0.1:5000

2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

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
