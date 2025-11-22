from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

app = Flask(__name__)
# Cho phép Frontend (React) gọi vào Backend này
CORS(app)

# --- GIẢ LẬP DATABASE (HARDCODE) ---
# Trong thực tế, dữ liệu này nằm trong SQL hoặc MongoDB

users = [
    {'id': 'u1', 'username': 'mentee1', 'password': '123', 'name': 'Nguyễn Văn A', 'role': 'mentee', 'dept': 'Khoa Máy tính'},
    {'id': 'u2', 'username': 'mentee2', 'password': '123', 'name': 'Trần Thị B', 'role': 'mentee', 'dept': 'Khoa Cơ khí'},
    {'id': 'u3', 'username': 'mentee3', 'password': '123', 'name': 'Lê Văn C', 'role': 'mentee', 'dept': 'Khoa Điện'},
    {'id': 'm1', 'username': 'mentor1', 'password': '123', 'name': 'Thầy Giáo X', 'role': 'mentor', 'dept': 'Khoa Máy tính'},
    {'id': 'm2', 'username': 'mentor2', 'password': '123', 'name': 'Cô Giáo Y', 'role': 'mentor', 'dept': 'Khoa Cơ khí'},
    {'id': 'c1', 'username': 'coord', 'password': '123', 'name': 'Điều Phối Viên', 'role': 'coordinator', 'dept': 'P. Đào tạo'},
    {'id': 'o1', 'username': 'admin', 'password': '123', 'name': 'Cán Bộ Phòng Ban', 'role': 'officer', 'dept': 'P. Khảo thí'},
]

courses = [
    {'id': 'course_1', 'code': 'IT001', 'name': 'Lập trình Python cơ bản', 'dept': 'Khoa Máy tính'},
    {'id': 'course_2', 'code': 'ME001', 'name': 'Cơ học đại cương', 'dept': 'Khoa Cơ khí'},
]

# Lớp học (Classes) - Kết quả của việc ghép lớp
classes = [
    {
        'id': 'class_1', 'course_id': 'course_1', 'mentor_id': 'm1', 
        'mentee_ids': ['u1'], 'schedule': 'T2-T4 (7h-9h)', 
        'status': 'active', 'materials': ['Slide_bai_1.pdf']
    }
]

complaints = [
    {'id': 'cp1', 'sender_id': 'u1', 'title': 'Mentor trễ giờ', 'status': 'pending', 'reason': 'Đến trễ 15p'}
]

ratings = [
    {'id': 'r1', 'mentor_id': 'm1', 'mentee_id': 'u1', 'class_id': 'class_1', 'score': 4.5, 'comment': 'Dạy tốt'}
]

# --- API ENDPOINTS (CÁC CHỨC NĂNG) ---

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = next((u for u in users if u['username'] == data.get('username') and u['password'] == data.get('password')), None)
    if user:
        return jsonify({'success': True, 'user': user})
    return jsonify({'success': False, 'message': 'Sai thông tin đăng nhập'}), 401

# API lấy dữ liệu tổng quát (Tùy theo role mà frontend sẽ lọc hiển thị)
@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        'users': users,
        'courses': courses,
        'classes': classes,
        'complaints': complaints,
        'ratings': ratings
    })

# Chức năng: Mentor upload tài liệu
@app.route('/api/mentor/upload', methods=['POST'])
def upload_material():
    data = request.json
    class_id = data.get('class_id')
    filename = data.get('filename')
    
    for c in classes:
        if c['id'] == class_id:
            c['materials'].append(filename)
            return jsonify({'success': True, 'materials': c['materials']})
    return jsonify({'success': False}), 400

# Chức năng: Điều phối viên ghép lớp
@app.route('/api/coordinator/match', methods=['POST'])
def match_class():
    data = request.json
    action = data.get('action') # 'approve' hoặc 'reject'
    
    if action == 'reject':
        # Logic từ chối (có thể lưu log, ở đây demo chỉ trả về ok)
        return jsonify({'success': True, 'message': 'Đã hủy ghép lớp'})
        
    # Logic tạo lớp mới
    new_class = {
        'id': f"class_{len(classes) + 1}",
        'course_id': 'course_1', # Demo hardcode môn học
        'mentor_id': data.get('mentor_id'),
        'mentee_ids': data.get('mentee_ids'),
        'schedule': 'Chưa xếp lịch',
        'status': 'active',
        'materials': []
    }
    classes.append(new_class)
    return jsonify({'success': True, 'new_class': new_class})

# Chức năng: Cán bộ xem báo cáo (Filter)
@app.route('/api/officer/report', methods=['POST'])
def get_report():
    data = request.json
    scope = data.get('scope') # Năm 2024, K241...
    
    # Demo: Trả về số liệu giả lập dựa trên scope gửi lên
    report_data = {
        'scope': scope,
        'total_mentees': len([u for u in users if u['role'] == 'mentee']),
        'total_mentors': len([u for u in users if u['role'] == 'mentor']),
        'total_classes': len(classes),
        'avg_rating': 4.2 # Giả lập tính toán
    }
    return jsonify(report_data)

if __name__ == '__main__':
    print("Server đang chạy tại http://localhost:5000")
    app.run(debug=True, port=5000)