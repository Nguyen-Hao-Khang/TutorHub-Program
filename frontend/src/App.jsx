import React, { useState, useEffect } from 'react';

// Cấu hình địa chỉ Backend (Flask)
const API_URL = 'http://localhost:5000/api';

export default function App() {
  const [user, setUser] = useState(null); // Lưu thông tin user đang đăng nhập
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Lưu dữ liệu lấy từ backend về
  const [appData, setAppData] = useState({
    users: [], courses: [], classes: [], complaints: [], ratings: []
  });
  const [loading, setLoading] = useState(false);

  // Hàm gọi API lấy dữ liệu chung sau khi login
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/data`);
      const data = await res.json();
      setAppData(data);
    } catch (err) {
      console.error("Lỗi kết nối Backend:", err);
      alert("Không kết nối được với Server Python!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        fetchData(); // Load dữ liệu ngay khi login thành công
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Lỗi hệ thống, kiểm tra lại Backend!");
    }
    setLoading(false);
  };

  // --- MÀN HÌNH ROLE: MENTEE ---
  const MenteeView = () => {
    const myClasses = appData.classes.filter(c => c.mentee_ids.includes(user.id));
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Mentee: {user.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded shadow">
            <h3 className="font-bold text-blue-600">Lớp học của tôi</h3>
            {myClasses.length === 0 ? <p>Chưa đăng ký lớp nào.</p> : (
              myClasses.map(c => (
                <div key={c.id} className="mt-2 p-2 bg-gray-50 rounded">
                  <p><strong>Lớp:</strong> {c.id}</p>
                  <p>Lịch: {c.schedule}</p>
                  <p>Tài liệu: {c.materials.join(', ') || 'Chưa có'}</p>
                  {/* Logic liên kết: Đánh giá mentor */}
                  <button className="mt-2 text-sm bg-green-500 text-white px-2 py-1 rounded">Đánh giá Mentor</button>
                </div>
              ))
            )}
          </div>
          <div className="border p-4 rounded shadow">
            <h3 className="font-bold text-blue-600">Đăng ký lớp học</h3>
            <p className="text-sm text-gray-500">Danh sách các khóa học đang mở...</p>
            {appData.courses.map(co => (
               <div key={co.id} className="flex justify-between border-b py-2">
                 <span>{co.name}</span>
                 <button className="text-blue-500 text-sm">Đăng ký ngay</button>
               </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // --- MÀN HÌNH ROLE: MENTOR ---
  const MentorView = () => {
    const myClasses = appData.classes.filter(c => c.mentor_id === user.id);
    
    const handleUpload = async (classId) => {
      const filename = prompt("Nhập tên file (giả lập upload):");
      if (!filename) return;
      
      const res = await fetch(`${API_URL}/mentor/upload`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ class_id: classId, filename })
      });
      if(res.ok) {
        alert("Upload thành công!");
        fetchData(); // Reload lại dữ liệu mới
      }
    };

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Mentor: {user.name}</h2>
        <div className="border p-4 rounded shadow bg-white">
           <h3 className="font-bold text-purple-600 mb-4">Lớp Phụ Trách</h3>
           {myClasses.map(c => (
             <div key={c.id} className="mb-4 p-4 border rounded bg-purple-50">
               <h4 className="font-bold">Mã lớp: {c.id} - {c.schedule}</h4>
               <p>Số lượng Mentee: {c.mentee_ids.length}</p>
               <div className="mt-2">
                 <p className="text-sm font-semibold">Tài liệu:</p>
                 <ul className="list-disc ml-5 text-sm">{c.materials.map((m, i) => <li key={i}>{m}</li>)}</ul>
               </div>
               <button onClick={() => handleUpload(c.id)} className="mt-3 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                 + Đăng tải tài liệu
               </button>
             </div>
           ))}
        </div>
      </div>
    );
  };

  // --- MÀN HÌNH ROLE: COORDINATOR (ĐIỀU PHỐI VIÊN) ---
  const CoordinatorView = () => {
    const [selectedMentees, setSelectedMentees] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');
    
    // Lọc danh sách theo Khoa (Demo hardcode lọc khoa Máy tính)
    const mentees = appData.users.filter(u => u.role === 'mentee' && u.dept === 'Khoa Máy tính');
    const mentors = appData.users.filter(u => u.role === 'mentor' && u.dept === 'Khoa Máy tính');

    const handleMatch = async () => {
       if(!selectedMentor || selectedMentees.length === 0) return alert("Chọn ít nhất 1 mentee và 1 mentor");
       
       const res = await fetch(`${API_URL}/coordinator/match`, {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
           action: 'approve',
           mentor_id: selectedMentor,
           mentee_ids: selectedMentees
         })
       });
       const data = await res.json();
       if(data.success) {
         alert("Ghép lớp thành công! ID Lớp mới: " + data.new_class.id);
         fetchData();
         setSelectedMentees([]);
       }
    };

    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Điều phối chương trình</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Khu vực ghép lớp */}
          <div className="border p-4 rounded shadow">
             <h3 className="font-bold text-red-600 mb-3">Ghép lớp thủ công (Khoa Máy tính)</h3>
             <div className="flex gap-4">
               <div className="flex-1">
                 <h4 className="text-sm font-bold mb-2">Chọn Mentee</h4>
                 {mentees.map(u => (
                   <label key={u.id} className="block text-sm mb-1">
                     <input type="checkbox" 
                        checked={selectedMentees.includes(u.id)}
                        onChange={(e) => {
                          if(e.target.checked) setSelectedMentees([...selectedMentees, u.id]);
                          else setSelectedMentees(selectedMentees.filter(id => id !== u.id));
                        }}
                     /> {u.name}
                   </label>
                 ))}
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold mb-2">Chọn Mentor</h4>
                 <select className="border p-1 w-full text-sm" onChange={e => setSelectedMentor(e.target.value)}>
                   <option value="">-- Chọn GV --</option>
                   {mentors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                 </select>
               </div>
             </div>
             <div className="mt-4 text-right">
               <button onClick={handleMatch} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                 Xác nhận Ghép Nối
               </button>
             </div>
          </div>

          {/* Khu vực Báo cáo nhanh */}
          <div className="border p-4 rounded shadow bg-gray-50">
            <h3 className="font-bold mb-3">Báo cáo hoạt động</h3>
            <ul className="space-y-2">
              <li>Tổng số Mentor: <strong>{appData.users.filter(u=>u.role==='mentor').length}</strong></li>
              <li>Tổng số Mentee: <strong>{appData.users.filter(u=>u.role==='mentee').length}</strong></li>
              <li>Lớp đang hoạt động: <strong>{appData.classes.length}</strong></li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  // --- MÀN HÌNH ROLE: OFFICER (CÁN BỘ) ---
  const OfficerView = () => {
    const [scope, setScope] = useState('');
    const [reportResult, setReportResult] = useState(null);

    const viewReport = async () => {
      const res = await fetch(`${API_URL}/officer/report`, {
        method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ scope })
      });
      const data = await res.json();
      setReportResult(data);
    };

    return (
       <div className="p-6">
         <h2 className="text-2xl font-bold mb-4">Cán bộ quản lý</h2>
         
         <div className="border p-4 rounded shadow mb-6">
            <h3 className="font-bold text-orange-600 mb-2">Báo cáo tổng quan</h3>
            <div className="flex gap-2 mb-4">
               <input 
                 className="border p-2 rounded flex-1" 
                 placeholder="Nhập năm học hoặc học kỳ (VD: 2024)" 
                 value={scope} onChange={e => setScope(e.target.value)}
               />
               <button onClick={viewReport} className="bg-orange-500 text-white px-4 rounded">Xem Báo Cáo</button>
            </div>
            
            {reportResult && (
               <div className="bg-orange-50 p-4 rounded">
                  <h4 className="font-bold text-center uppercase">Kết quả báo cáo: {reportResult.scope}</h4>
                  <div className="grid grid-cols-3 gap-4 text-center mt-3">
                     <div className="p-2 bg-white rounded border">Mentee: {reportResult.total_mentees}</div>
                     <div className="p-2 bg-white rounded border">Mentor: {reportResult.total_mentors}</div>
                     <div className="p-2 bg-white rounded border">Lớp: {reportResult.total_classes}</div>
                  </div>
               </div>
            )}
         </div>

         <div className="border p-4 rounded shadow">
           <h3 className="font-bold text-orange-600 mb-2">Xem Đánh giá Mentor</h3>
           <table className="w-full text-sm text-left">
             <thead className="bg-gray-100">
               <tr><th>Mentor</th><th>Điểm</th><th>Nhận xét</th></tr>
             </thead>
             <tbody>
               {appData.ratings.map(r => (
                 <tr key={r.id} className="border-b">
                   <td className="p-2">{appData.users.find(u => u.id === r.mentor_id)?.name}</td>
                   <td className="p-2 font-bold">{r.score} ⭐</td>
                   <td className="p-2 italic">{r.comment}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
    )
  }

  // --- GIAO DIỆN CHÍNH (LOGIN FORM) ---
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
          <h1 className="text-xl font-bold mb-6 text-center text-blue-800">Cổng Thông Tin Đào Tạo</h1>
          <div className="mb-4">
            <label className="block text-sm mb-1">Tên đăng nhập</label>
            <input 
               type="text" value={username} onChange={e => setUsername(e.target.value)}
               className="w-full border p-2 rounded" placeholder="VD: mentee1, mentor1, coord, admin..."
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1">Mật khẩu</label>
            <input 
               type="password" value={password} onChange={e => setPassword(e.target.value)}
               className="w-full border p-2 rounded" placeholder="Mặc định: 123"
            />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
          <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-2 rounded">
            <p><strong>Gợi ý test:</strong></p>
            <p>Mentee: mentee1 / 123</p>
            <p>Mentor: mentor1 / 123</p>
            <p>Điều phối: coord / 123</p>
            <p>Cán bộ: admin / 123</p>
          </div>
        </form>
      </div>
    );
  }

  // --- GIAO DIỆN SAU KHI LOGIN (THEO ROLE) ---
  return (
    <div className="min-h-screen bg-gray-50">
       <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="font-bold text-blue-800">Hệ thống Đào tạo Demo</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm">Xin chào, <strong>{user.name}</strong> ({user.role})</span>
             <button onClick={() => setUser(null)} className="text-red-500 text-sm underline">Đăng xuất</button>
          </div>
       </header>
       
       <main className="max-w-5xl mx-auto mt-6 bg-white rounded shadow min-h-[500px]">
          {user.role === 'mentee' && <MenteeView />}
          {user.role === 'mentor' && <MentorView />}
          {user.role === 'coordinator' && <CoordinatorView />}
          {user.role === 'officer' && <OfficerView />}
       </main>
    </div>
  );
}