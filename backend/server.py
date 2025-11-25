from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import datetime
import string

app = Flask(__name__)
# Cho phép Frontend (React) gọi vào Backend này
CORS(app)


# --- GIẢ LẬP DATABASE (HARDCODE) ---
DEPARTMENTS = ['Khoa Máy tính', 'Khoa Cơ khí', 'Khoa Điện', 'Khoa Xây dựng', 'Khoa Hóa']
HOMETOWN_DEFAULT = "TP. Hồ Chí Minh, Việt Nam"

# --- 1. KHỞI TẠO DANH SÁCH MENTORS (CỐ VẤN) ---
base_mentors = [
    {'id': '2001', 'username': 'mentor1', 'password': '123', 'name': 'TS. Nguyễn Văn Hùng', 'role': 'mentor', 'dept': 'Khoa Khoa học & Kỹ thuật Máy tính', 'rating': 4.9, 'location': 'Hà Nội, Việt Nam', 'hobby': 'AI, Machine Learning'},
    {'id': '2002', 'username': 'mentor2', 'password': '123', 'name': 'TS. Trần Thị Mai', 'role': 'mentor', 'dept': 'Khoa Cơ khí', 'rating': 4.6, 'location': 'Đà Nẵng, Việt Nam', 'hobby': 'Robotics, CAD'},
    {'id': '2003', 'username': 'mentor3', 'password': '123', 'name': 'ThS. Lê Hoàng Phúc', 'role': 'mentor', 'dept': 'Khoa Điện - Điện tử', 'rating': 3.8, 'location': 'TP. Hồ Chí Minh, Việt Nam', 'hobby': 'Điện tử, IoT'},
    {'id': '3004', 'username': 'mentor4', 'password': '123', 'name': 'Phạm Thị Hạnh', 'role': 'mentor', 'dept': 'Khoa Quản lý công nghiệp', 'rating': 4.2, 'location': 'Cần Thơ, Việt Nam', 'hobby': 'Quản trị, Logistics'},
    {'id': '3005', 'username': 'mentor5', 'password': '123', 'name': 'PGS.TS. Bùi Văn Khánh', 'role': 'mentor', 'dept': 'Khoa Khoa học ứng dụng', 'rating': 2.7, 'location': 'Hải Phòng, Việt Nam', 'hobby': 'Toán ứng dụng, Vật lý'},
    {'id': '3006', 'username': 'mentor6', 'password': '123', 'name': 'ThS. Đỗ Thị Ngọc', 'role': 'mentor', 'dept': 'Khoa Kỹ thuật xây dựng', 'rating': 4.3, 'location': 'Huế, Việt Nam', 'hobby': 'Kiến trúc, Xây dựng xanh'},
    {'id': '4007', 'username': 'mentor7', 'password': '123', 'name': 'Nguyễn Hoàng Long', 'role': 'mentor', 'dept': 'Khoa Kỹ thuật giao thông', 'rating': 5.0, 'location': 'Nha Trang, Việt Nam', 'hobby': 'Cầu đường, Giao thông thông minh'},
    {'id': '4008', 'username': 'mentor8', 'password': '123', 'name': 'ThS. Vũ Thị Thu Trang', 'role': 'mentor', 'dept': 'Khoa Địa chất & Dầu khí', 'rating': 4.1, 'location': 'Quảng Ngãi, Việt Nam', 'hobby': 'Địa chất, Khai thác dầu khí'},
    {'id': '4009', 'username': 'mentor9', 'password': '123', 'name': 'TS. Lê Minh Quân', 'role': 'mentor', 'dept': 'Khoa Cơ khí', 'rating': 3.9, 'location': 'Bình Dương, Việt Nam', 'hobby': 'Cơ khí chế tạo, Tự động hóa'},
    {'id': '4010', 'username': 'mentor10', 'password': '123', 'name': 'PGS.TS. Phan Thị Yến', 'role': 'mentor', 'dept': 'Khoa Khoa học & Kỹ thuật Máy tính', 'rating': 4.5, 'location': 'TP. Hồ Chí Minh, Việt Nam', 'hobby': 'Khoa học dữ liệu, Hệ thống thông tin'},
]


# Bổ sung thông tin chung cho Mentor
for m in base_mentors:
    m['email'] = f"{m['username']}@hcmut.edu.vn"
    m['hometown'] = HOMETOWN_DEFAULT
    m['teaching_courses'] = [] # Sẽ được điền tự động sau khi tạo khóa học

# --- 2. KHỞI TẠO DANH SÁCH MENTEES (SINH VIÊN) ---
base_mentees = [
    {'id': 'u1', 'username': 'mentee1', 'password': '123', 'name': 'Nguyễn Văn A', 'dept': 'Khoa Máy tính', 'gpa': 8.5},
    {'id': 'u2', 'username': 'mentee2', 'password': '123', 'name': 'Trần Thị B', 'dept': 'Khoa Cơ khí', 'gpa': 7.2},
    {'id': 'u3', 'username': 'mentee3', 'password': '123', 'name': 'Lê Văn C', 'dept': 'Khoa Điện', 'gpa': 6.8},
]

# Sinh thêm mentee cho đủ 40 người
first_names = ["Tuấn", "Hùng", "Dũng", "Long", "Giang", "Phượng", "Mai", "Hương"]
last_names = ["Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng"]

for i in range(1, 999):
    dept = DEPARTMENTS[i % len(DEPARTMENTS)]
    # chọn ngẫu nhiên một chữ cái từ A-Z
    letter = random.choice(string.ascii_uppercase)
    name = f"{random.choice(last_names)} {random.choice(first_names)} {letter}"
    base_mentees.append({
        'id': f'2310{i}',
        'username': f'mentee{i}',
        'password': '123',
        'name': name,
        'dept': dept,
        'gpa': round(random.uniform(5.0, 9.5), 1)
    })


# Bổ sung thông tin chung cho Mentee
for u in base_mentees:
    u['role'] = 'mentee'
    u['email'] = f"{u['username']}@hcmut.edu.vn"
    u['hometown'] = HOMETOWN_DEFAULT
    u['enrolled_courses'] = [] # Sẽ được điền tự động

# --- 3. KHỞI TẠO KHÓA HỌC (COURSES) ---
progress_distribution = [60, 60, 60, 70, 70, 70, 70, 70, 80, 80]

courses = []
for i in range(1, 11):
    progress = progress_distribution[i-1]
    mentor = base_mentors[(i-1) % len(base_mentors)]
    
    class_students = []
    enrolled_mentees = random.sample(base_mentees, k=random.randint(10, 15))
    
    total_sessions_planned = 15 
    sessions_conducted = int((progress / 100) * total_sessions_planned)
    
    for mentee in enrolled_mentees:
        attended = random.randint(int(sessions_conducted * 0.7), sessions_conducted)
        class_students.append({
            'student_id': mentee['id'],
            'name': mentee['name'],
            'attended_sessions': attended
        })

    course = {
        'id': f'L_{i}',
        'code': f'MH{100+i:03d}',
        'name': f'Môn học {i}',
        'dept': mentor['dept'],
        'schedule': f'Thứ {random.randint(2,7)}, Tiết {random.choice(["1-2", "3-4", "5-6", "7-8", "9-10"])}, Phòng {random.choice(["H1-", "H2-", "H3-", "H6-"])}{random.randint(101, 610)}',
        'mentor_id': mentor['id'],
        'mentor_name': mentor['name'],
        'total_sessions_conducted': sessions_conducted,
        'total_sessions_planned': total_sessions_planned,
        'sessions_changed': random.randint(0, 2),
        'sessions_cancelled': random.randint(0, 1),
        'progress': progress,
        'students': class_students
    }
    courses.append(course)

# --- 4. ĐỒNG BỘ DỮ LIỆU NGƯỢC LẠI CHO USERS ---
# Map students to courses
for course in courses:
    # Cập nhật cho Mentor
    mentor = next((m for m in base_mentors if m['id'] == course['mentor_id']), None)
    if mentor:
        mentor['teaching_courses'].append({
            'id': course['id'],
            'name': course['name'],
            'code': course['code']
        })
    
    # Cập nhật cho Mentee
    for stud in course['students']:
        mentee = next((u for u in base_mentees if u['id'] == stud['student_id']), None)
        if mentee:
            mentee['enrolled_courses'].append({
                'id': course['id'],
                'name': course['name'],
                'progress': course['progress']
            })

# --- 5. TỔNG HỢP USER LIST CUỐI CÙNG ---
other_users = [
    {'id': 'c1', 'username': 'coord', 'password': '123', 'name': 'Trần Văn Điều Phối', 'role': 'coordinator', 'dept': 'P. Đào tạo', 'email': 'coord@hcmut.edu.vn', 'hometown': HOMETOWN_DEFAULT},
    {'id': 'o1', 'username': 'admin', 'password': '123', 'name': 'Nguyễn Thị Cán Bộ', 'role': 'officer', 'dept': 'P. Khảo thí', 'email': 'admin@hcmut.edu.vn', 'hometown': HOMETOWN_DEFAULT},
]

# Gộp tất cả lại thành list users chính
users = base_mentees + base_mentors + other_users

# --- KẾT THÚC KHỞI TẠO CÁC ĐỐI TƯỢNG NGƯỜI DÙNG VÀ LỚP HỌC ---

complaints = [
    {
        'id': "CMP0001",
        'name': "Sự cố thiết bị",
        'reason': "Máy chiếu phòng H3-201 không hoạt động trong buổi học ngày 15/10.",
        'status': "Solved"
    },
    {
        'id': "CMP0002",
        'name': "Vấn đề dịch vụ",
        'reason': "Phòng H6-802 thiếu thiết mạch chạy mô phỏng.",
        'status': "Pending"
    },
    {
        'id': "CMP0003",
        'name': "Yêu cầu hỗ trợ",
        'reason': "Cần được hỗ trợ cài đặt phần mềm nghiên cứu từ Khoa Máy tính.",
        'status': "Pending"
    },
    {
        'id': "CMP0004",
        'name': "Cải tạo CSVC",
        'reason': "Cửa phòng Lab H6-601 mất tín hiệu điện, gây kẹt cửa.",
        'status': "Solved"
    },
    {
        'id': "CMP0005",
        'name': "Vấn đề khác",
        'reason': "Có tiếng ồn lớn từ công trình xây dựng gần phòng H6-109.",
        'status': "Rejected"
    },
    {
        'id': "CMP0006",
        'name': "Sự cố thiết bị",
        'reason': "Lỗi kết nối mạng trong khoảng thời gian tiết 7-8 ngày 1/12.",
        'status': "Solved"
    },
    {
        'id': "CMP0007",
        'name': "Yêu cầu hỗ trợ",
        'reason': "Chấp nhận ghép lớp đối với học viên X vì lý do Y.",
        'status': "Solved"
    },
    {
        'id': "CMP0008",
        'name': "Yêu cầu hỗ trợ",
        'reason': "Chuyển đổi hình thức buổi học Môn học 1 tiết 3-4 ngày 12/11 từ trực tiếp sang trực tuyến.",
        'status': "Solved"
    },
        {
        'id': "CMP0009",
        'name': "Yêu cầu hỗ trợ",
        'reason': "Gia hạn thời gian nộp đề thi do thay đổi hình thức thi.",
        'status': "Pending"
    },
]


# --- HELPER FUNCTIONS ĐỂ TƯƠNG TÁC VỚI DỮ LIỆU ---
def get_all_users():
    return users

def get_user_by_id(user_id):
    return next((u for u in users if u['id'] == user_id), None)

def get_user_by_username(username):
    return next((u for u in users if u['username'] == username), None)

def get_all_courses():
    return courses

def get_course_by_id(course_id):
    return next((c for c in courses if c['id'] == course_id), None)

# Phương thức đặc biệt cho Coordinator/Officer: Lấy thống kê tổng quan
def get_system_stats():
    total_students = len([u for u in users if u['role'] == 'mentee'])
    total_mentors = len([u for u in users if u['role'] == 'mentor'])
    total_courses = len(courses)
    
    # Tính trung bình tiến độ
    avg_progress = sum(c['progress'] for c in courses) / total_courses if total_courses > 0 else 0
    
    return {
        'total_students': total_students,
        'total_mentors': total_mentors,
        'total_courses': total_courses,
        'avg_progress': round(avg_progress, 2)
    }



# --- API ENDPOINTS (CÁC CHỨC NĂNG) ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = get_user_by_username(username)

    if user and user['password'] == password:

        user_info = user.copy()
        user_info.pop('password', None) 
        
        return jsonify({'success': True, 'user': user_info})
    
    return jsonify({'success': False, 'message': 'Sai thông tin đăng nhập'}), 401

# --- API CHO QUẢN LÝ TỔNG QUAN (COORDINATOR/OFFICER) ---

@app.route('/api/users', methods=['GET'])
def list_users():
    """Lấy danh sách tất cả người dùng (Có thể lọc role ở Frontend)"""
    users_data = []
    for u in get_all_users():
        user_copy = u.copy()
        user_copy.pop('password', None)
        users_data.append(user_copy)
        
    return jsonify(users_data)

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user_details(user_id):
    """Lấy thông tin chi tiết của một người dùng"""
    user = get_user_by_id(user_id)
    if user:
        user_copy = user.copy()
        user_copy.pop('password', None)
        return jsonify(user_copy)
    return jsonify({'message': 'Người dùng không tồn tại'}), 404

@app.route('/api/courses', methods=['GET'])
def list_courses():
    """Lấy danh sách tất cả khóa học"""
    return jsonify(get_all_courses())

@app.route('/api/courses/<course_id>', methods=['GET'])
def get_course_details(course_id):
    """Lấy thông tin chi tiết của một khóa học, bao gồm danh sách sinh viên"""
    course = get_course_by_id(course_id)
    if course:
        return jsonify(course)
    return jsonify({'message': 'Khóa học không tồn tại'}), 404

@app.route('/api/stats', methods=['GET'])
def get_overall_stats():
    """Lấy báo cáo tổng quan (Dùng cho Trang chủ của Coordinator/Officer)"""
    return jsonify(get_system_stats())

@app.route('/api/my_teaching_courses/<mentor_id>', methods=['GET'])
def get_mentor_courses(mentor_id):
    """Lấy danh sách lớp phụ trách của một Mentor"""
    mentor = get_user_by_id(mentor_id)
    if mentor and mentor['role'] == 'mentor':
        return jsonify(mentor.get('teaching_courses', []))
    return jsonify({'message': 'Không tìm thấy Mentor hoặc không có lớp'}), 404

@app.route('/api/my_enrolled_courses/<mentee_id>', methods=['GET'])
def get_mentee_courses(mentee_id):
    """Lấy danh sách lớp đã đăng ký của một Mentee"""
    mentee = get_user_by_id(mentee_id)
    if mentee and mentee['role'] == 'mentee':
        return jsonify(mentee.get('enrolled_courses', []))
    return jsonify({'message': 'Không tìm thấy Mentee hoặc chưa đăng ký lớp nào'}), 404

@app.route('/api/mentor_teaching_course_details/<mentor_id>', methods=['GET'])
def get_mentor_teaching_course_details(mentor_id):
    """Lấy chi tiết (bao gồm tiến độ) của tất cả lớp Mentor đang phụ trách"""
    mentor = get_user_by_id(mentor_id)
    if not mentor or mentor['role'] != 'mentor':
        return jsonify({'message': 'Không tìm thấy Mentor hoặc không có lớp'}), 404
        
    teaching_courses_simple = mentor.get('teaching_courses', [])
    detailed_courses = []
    
    for simple_course in teaching_courses_simple:
        course_detail = get_course_by_id(simple_course['course_id'])
        if course_detail:
            detailed_courses.append({
                'id': course_detail['id'],
                'code': course_detail['code'],
                'name': course_detail['name'],
                'progress': course_detail['progress'],
                'schedule': course_detail['schedule']
            })
            
    return jsonify(detailed_courses)

@app.route('/api/mentor_info/<mentor_id>', methods=['GET'])
def get_mentor_info(mentor_id):
    """Lấy thông tin chi tiết Mentor (có thể mở rộng thêm các chỉ số hiệu suất sau này)"""
    user = get_user_by_id(mentor_id)
    if user and user['role'] == 'mentor':
        user_copy = user.copy()
        user_copy.pop('password', None)
        # Thêm thông tin hiệu suất giả lập
        user_copy['total_classes'] = len(user.get('teaching_courses', []))
        user_copy['avg_student_gpa'] = round(random.uniform(7.0, 9.0), 1)
        user_copy['complaint_rate'] = f"{random.randint(0, 5)}%"
        return jsonify(user_copy)
    return jsonify({'message': 'Mentor không tồn tại'}), 404


@app.route('/api/complaints', methods=['GET'])
def get_complaints():
    """Endpoint trả về danh sách khiếu nại."""
    return jsonify(complaints)



if __name__ == '__main__':
    print("Server đang chạy tại http://localhost:5000")
    # Đảm bảo bạn đã import 'app' và 'CORS'
    app.run(debug=True, port=5000)