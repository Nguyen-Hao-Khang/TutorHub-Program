import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:5000/api";

// COMPONENT PHỤ: HIỂN THỊ THỜI KHÓA BIỂU DẠNG BẢNG
const ScheduleTable = ({ scheduleString }) => {
    const parts = scheduleString ? scheduleString.split(',').map(p => p.trim()) : [];
    
    if (parts.length < 3) {
        return <p className="text-lg italic text-red-600">Lịch học không xác định: {scheduleString}</p>;
    }

    const day = parts[0];
    const time = parts[1];
    const location = parts[2];
    
    return (
        <table className="w-[400px] border border-gray-300">
            <thead>
                <tr className="bg-blue-100">
                    <th className="p-2 border border-gray-300 text-left">Tiêu chí</th>
                    <th className="p-2 border border-gray-300 text-left">Chi tiết</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2 border border-gray-300 font-semibold">Ngày học</td>
                    <td className="p-2 border border-gray-300">{day}</td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-300 font-semibold">Thời gian</td>
                    <td className="p-2 border border-gray-300">{time}</td>
                </tr>
                <tr>
                    <td className="p-2 border border-gray-300 font-semibold">Địa điểm</td>
                    <td className="p-2 border border-gray-300">{location}</td>
                </tr>
            </tbody>
        </table>
    );
};


// HEADER
const ComplaintsView = ({ complaints }) => {
  const validComplaints = Array.isArray(complaints) ? complaints : [];

  const totalComplaints = validComplaints.length;
  const solvedComplaints = validComplaints.filter(c => c.status === 'Solved').length;
  const pendingComplaints = validComplaints.filter(c => c.status === 'Pending').length;
  const rejectedComplaints = validComplaints.filter(c => c.status === 'Rejected').length;

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Solved':
        return { color: 'text-green-600' };
      case 'Pending':
        return { color: 'text-orange-600' };
      case 'Rejected':
        return { color: 'text-red-600' };
      default:
        return { color: 'text-gray-600' };
    }
  };

  if (!Array.isArray(complaints)) {
    return (
      <div className="p-10 text-center bg-red-50 border border-red-300 rounded-lg">
        <h3 className="text-xl font-bold text-red-700">Lỗi Tải Dữ Liệu Khiếu Nại</h3>
        <p className="text-red-600 mt-2">
          Không thể kết nối đến server hoặc dữ liệu trả về không hợp lệ. Vui lòng kiểm tra API backend.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full bg-white">

        {/* ===== 3 Ô Tổng Quan ===== */}
        <div className="flex justify-between w-[1356px] h-[191px] mt-[45px] rounded-2xl">
        {[
            { label: 'Tổng số khiếu nại', value: totalComplaints, color: 'text-black' },
            { label: 'Đã được xử lý', value: solvedComplaints, color: 'text-green-600' },
            { label: 'Còn lại', value: pendingComplaints + rejectedComplaints, color: 'text-orange-600' }
        ].map((item, idx) => (
            <div
                key={idx}
                className="relative w-[436px] h-[191px] bg-white 
                            border-2 border-[#dedede] [border-radius:12px] 
                            flex flex-col justify-center items-center"
            >
                {/* Icon góc trên trái */}
                <img
                    src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4k041oqy_expires_30_days.png"
                    alt="icon"
                    className="absolute top-[10px] left-[10px] w-[50px] h-[50px]"
                />

                {/* Nội dung */}
                <span className="text-2xl font-extrabold mt-6">{item.label}</span> 
                <span className={`text-2xl font-extrabold mt-2 ${item.color}`}>{item.value}</span>
            </div>
        ))}
        </div>

        {/* ===== Frame Danh Sách + Search + Download ===== */}
        <div className="flex flex-col w-[1356px] mt-[45px] min-h-[526px]">

        {/* Header: Title + Search + Download */}
        <div className="flex justify-between items-center h-[44px] mb-[24px]">
          <span className="text-2xl font-extrabold">{`Số khiếu nại (${totalComplaints})`}</span>

          <div className="flex items-center gap-[24px]">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-[300px] h-[44px] [border-radius:5px] bg-[#ffffff] border-2 border-[#dedede] flex flex-col justify-center items-center"
            />
            <button
              onClick={() => alert('Tính năng đang trong quá trình phát triển')}
              className="w-[130px] h-[44px] [border-radius:5px] bg-white border-2 border-[#dedede] flex flex-col justify-center items-center"
            >
              Download
            </button>
          </div>
        </div>

        {/* Bảng Khiếu Nại */}
        <div className="flex flex-col w-full border border-gray-200 rounded-xl overflow-hidden">

            {/* Header Table */}
            <div className="grid grid-cols-[50px_151.3px_100px_1fr_150px] bg-[#FCFCFC] border-b border-l border-solid border-[#DEDEDE] font-bold min-h-[30px]">
                <span className="text-black text-xl pl-[2px] border-r border-[#DEDEDE] text-center flex items-center justify-center">STT</span> 
                <span className="text-black text-xl pl-[2px] border-r border-[#DEDEDE] flex items-center">Tên khiếu nại</span>
                <span className="text-black text-xl pl-[2px] border-r border-[#DEDEDE] flex items-center">ID Khiếu nại</span>
                <span className="text-black text-xl pl-[2px] border-r border-[#DEDEDE] flex items-center">Nguyên nhân khiếu nại</span>
                <span className="text-black text-xl pl-[2px] text-center flex items-center justify-center">Trạng thái</span>
            </div>

            {/* Rows */}
            {validComplaints.length > 0 ? (
                validComplaints.map((c, idx) => {
                    const { color } = getStatusInfo(c.status);
                    return (
                    <div
                        key={c.id}
                        className="grid grid-cols-[50px_151.3px_100px_1fr_150px] border-b border-solid border-[#EEEEEE] last:border-b-0 hover:bg-gray-200 min-h-[30px]"
                    >
                        <span className="text-black text-sm font-medium pl-[2px] border-r border-[#DEDEDE] text-center flex items-center justify-center">{idx + 1}</span> 
                        <span className="text-black text-sm pl-[2px] border-r border-[#DEDEDE] flex items-center">{c.name}</span>
                        <span className="text-black text-sm font-medium pl-[2px] border-r border-[#DEDEDE] flex items-center">{c.id}</span>
                        <span className="text-black text-sm pl-[2px] border-r border-[#DEDEDE] flex items-center">{c.reason}</span>
                        <span className={`text-sm font-semibold text-center ${color} pl-[2px] border-r border-[#DEDEDE] flex items-center justify-center`}>
                            {c.status}
                        </span>
                    </div>
                    );
                })
            ) : (
            <div className="text-center py-5 italic text-gray-500">
                Không có khiếu nại nào được tìm thấy.
            </div>
            )}
        </div>
      </div>
    </div>
  );
};






const Header = ({ onTabChange, activeTab }) => {
    const items = [
        { text: "Trang chủ", value: "Home" }, 
        { text: "Quản lý", value: "Management" }, 
        { text: "Khiếu nại", value: "Complaints" }, 
        { text: "Ghép lớp thủ công", value: "Pairing" }, 
        { text: "Báo cáo hoạt động", value: "Report" }
    ];

    return (
        <div className="absolute top-0 left-0 w-full h-[58px] bg-[#0388b4] flex items-center text-[#ffffff]">
            <img
                className="ml-[41px] w-[39px] h-10 object-cover"
                alt="logo"
                src="https://c.animaapp.com/mid8mw5x609a7G/img/logo-bach-khoa-2.png"
            />

            {items.map((item, idx) => (
                <div
                    key={idx}
                    className={`ml-[0px] w-[150px] h-[58px] flex items-center justify-center text-[#ffffff] cursor-pointer text-base
                    ${item.value === activeTab ? "bg-[#044cc8]" : "hover:bg-[#0477a1]"}`}
                    onClick={() => onTabChange(item.value)}
                >
                    {item.text}
                </div>
            ))}

            <div className="flex-1" />

            {/* Icons bên phải */}
            <img
                className="w-[25px] h-[25px] mr-[18px]"
                alt="i1"
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/0he05gsp_expires_30_days.png"
            />
            <img
                className="w-[25px] h-[25px] mr-[18px]"
                alt="i2"
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/7nq7ir7x_expires_30_days.png"
            />
            <img
                className="w-[40px] h-[40px] mr-[18px]"
                alt="i3"
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/4qf2bg2a_expires_30_days.png"
            />
        </div>
    );
};


// MAIN COMPONENT
const Coordinator = () => {
    const [activeTab, setActiveTab] = useState("Management"); 

    const [classes, setClasses] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedMentor, setSelectedMentor] = useState(null);

    const [complaints, setComplaints] = useState([]);
    const [complaintsLoadError, setComplaintsLoadError] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedClass(null);
        setSelectedMentor(null);
        setComplaintsLoadError(false); // Reset lỗi khi chuyển tab
    };

    // ============================================================
    // LOAD DATA
    // ============================================================

    useEffect(() => {
        if (activeTab === "Management") {
            fetch(`${API_BASE_URL}/courses`)
                .then((res) => res.json())
                .then((data) => setClasses(data))
                .catch(error => console.error("Error fetching courses:", error));
            fetch(`${API_BASE_URL}/users`)
                .then((res) => res.json())
                .then((data) => {
                    const mentorList = Array.isArray(data) ? data.filter(user => user.role === 'mentor') : [];
                    setMentors(mentorList);
                })
                .catch(error => console.error("Error fetching users:", error));
        } 
        
        else if (activeTab === "Complaints") {
            setComplaints([]);
            setComplaintsLoadError(false);
            
            fetch(`${API_BASE_URL}/complaints`) 
                .then((res) => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => {
                    if (Array.isArray(data)) {
                        setComplaints(data);
                    } else {
                        throw new Error("Dữ liệu trả về không phải là mảng hợp lệ.");
                    }
                })
                .catch(error => {
                    console.error("Lỗi tải khiếu nại:", error);
                    alert("Lỗi tải dữ liệu khiếu nại: Không thể kết nối đến server hoặc dữ liệu không hợp lệ.");
                    setComplaintsLoadError(true);
                    setComplaints(null);
                });
        }
    }, [activeTab]);

    // ============================================================
    // LOAD CLASS/MENTOR DETAIL (GIỮ NGUYÊN LOGIC)
    // ============================================================

    const openClass = (cls) => {
        setSelectedMentor(null);
        setSelectedClass(null); 

        fetch(`${API_BASE_URL}/courses/${cls.id}`)
            .then((res) => res.json())
            .then((courseData) => {
                if (!courseData || !courseData.mentor_id) {
                    console.error("Course data or mentor_id missing:", courseData);
                    return;
                }

                fetch(`${API_BASE_URL}/users/${courseData.mentor_id}`)
                    .then((resMentor) => resMentor.json())
                    .then((mentorData) => {
                        setSelectedClass({
                            course: courseData,
                            mentor: mentorData,
                            students: courseData.students
                        });
                    })
                    .catch(error => console.error("Error fetching mentor details:", error));
            })
            .catch(error => console.error("Error fetching course details:", error));
    };

    const openMentor = (m) => {
        setSelectedClass(null);
        setSelectedMentor(null);

        fetch(`${API_BASE_URL}/users/${m.id}`)
            .then((res) => res.json())
            .then((mentorDetails) => {
                fetch(`${API_BASE_URL}/my_teaching_courses/${m.id}`)
                    .then((resCourses) => resCourses.json())
                    .then((teachingCourses) => {
                        setSelectedMentor({
                            mentor: mentorDetails,
                            teaching_classes: teachingCourses 
                        });
                    })
                    .catch(error => console.error("Error fetching teaching courses:", error));
            })
            .catch(error => console.error("Error fetching mentor details:", error));
    };

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="w-full min-h-screen relative bg-white">

            <Header onTabChange={handleTabChange} activeTab={activeTab} />

            <div className="flex pt-[58px]">

                {/* SIDEBAR (Chỉ hiển thị khi ở tab Quản lý) */}
                {activeTab === "Management" && (
                    <div className="w-[280px] bg-[#efefef] min-h-screen pt-[40px] px-3">
                        {/* ... (Logic Sidebar Quản lý) ... */}
                        <div className="text-xl font-bold mb-3 flex items-center gap-3">
                            <img
                                className="w-[27px] h-[27px]"
                                alt="icon"
                                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/7027pequ_expires_30_days.png"
                            />
                            Danh sách lớp ({classes.length})
                        </div>

                        {/* Hiển thị danh sách lớp */}
                        {Array.isArray(classes) && classes.map((cls) => (
                            <div
                                key={cls.id}
                                className={`ml-[20px] p-2 rounded text-lg mb-1 cursor-pointer 
                                    ${selectedClass && selectedClass.course.id === cls.id 
                                        ? 'bg-blue-600 text-white font-bold' 
                                        : 'hover:bg-gray-300'
                                    }`}
                                onClick={() => openClass(cls)}
                            >
                                {cls.code} - {cls.name}
                            </div>
                        ))}
                        {classes.length === 0 && <p className="ml-[50px] italic">Đang tải...</p>}

                        <div className="mt-[30px] text-xl font-bold mb-3 flex items-center gap-3">
                            <img
                                className="w-[27px] h-[27px]"
                                alt="icon"
                                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7ZkQYO2XvF/yj1t2dey_expires_30_days.png"
                            />
                            Cố vấn viên ({mentors.length})
                        </div>

                        {/* Hiển thị danh sách Mentor */}
                        {Array.isArray(mentors) && mentors.map((mn) => (
                            <div
                                key={mn.id}
                                className={`ml-[20px] p-2 rounded text-lg mb-1 cursor-pointer 
                                    ${selectedMentor && selectedMentor.mentor.id === mn.id 
                                        ? 'bg-blue-600 text-white font-bold' 
                                        : 'hover:bg-gray-300'
                                    }`}
                                onClick={() => openMentor(mn)}
                            >
                                {mn.name}
                            </div>
                        ))}
                        {mentors.length === 0 && <p className="ml-[50px] italic">Đang tải...</p>}
                    </div>
                )}

                {/* MAIN CONTENT */}
                <div className="flex-1 p-10 bg-[#ffffff] translate-x-100">
                    
                    {/* HIỂN THỊ CHỨC NĂNG KHIẾU NẠI */}
                    {activeTab === "Complaints" && (
                        <ComplaintsView complaints={complaintsLoadError ? null : complaints} />
                    )}

                    {/* HIỂN THỊ CHỨC NĂNG QUẢN LÝ (Giữ nguyên) */}
                    {activeTab === "Management" && (
                        <>
                            {/* HIỂN THỊ CHI TIẾT LỚP */}
                            {selectedClass && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-5 text-blue-800">
                                    {selectedClass.course.code} — {selectedClass.course.name}
                                    </h2>

                                    <div className="grid grid-cols-2 gap-4 mb-5 p-4 border rounded bg-gray-50">
                                        <p className="text-lg">
                                            <b>Khoa phụ trách:</b> {selectedClass.course.dept}
                                        </p>
                                        <p className="text-lg">
                                            <b>Tiến độ:</b> <span className="font-bold text-green-600">{selectedClass.course.progress}%</span>
                                        </p>
                                        <p className="text-lg">
                                            <b>Mentor:</b> <span className="font-semibold">{selectedClass.mentor.name}</span> ({selectedClass.mentor.email})
                                        </p>
                                        <p className="text-lg">
                                            <b>Buổi đã dạy:</b> {selectedClass.course.total_sessions_conducted} / {selectedClass.course.total_sessions_planned}
                                        </p>
                                    </div>

                                    <h3 className="text-xl font-semibold mt-6 mb-3 pb-1">
                                        Lịch học
                                    </h3>


                                    <ScheduleTable scheduleString={selectedClass.course.schedule} />
                                    
                                    <h3 className="text-xl font-semibold mt-8 mb-3 pb-1">
                                        Danh sách sinh viên ({selectedClass.students.length})
                                    </h3>

                                    <table className="w-full bg-white shadow rounded overflow-hidden border border-black"> 
                                    <thead>
                                        <tr className="bg-[#FFEFE5] text-black border border-black text-left"> 
                                        <th className="p-2 w-16 border-r border-b border-black">STT</th> 
                                        <th className="p-2 w-1/3 border-r border-b border-black">Họ và tên</th>
                                        <th className="p-2 w-1/4 border-r border-b border-black">MSSV</th>
                                        <th className="p-2 border-b">Tỉ lệ tham gia</th>
                                        </tr>
                                    </thead>

                                        <tbody>
                                            {selectedClass.students.map((st, index) => {
                                                const attendanceRate = selectedClass.course.total_sessions_conducted > 0
                                                    ? ((st.attended_sessions / selectedClass.course.total_sessions_conducted) * 100).toFixed(0)
                                                    : 0;

                                                return (
                                                    <tr key={st.student_id} className="border-b border-gray-300 hover:bg-gray-100">
                                                    <td className="p-2 border-r border-t border-gray-300">{index + 1}</td>
                                                    <td className="p-2 border-r border-t border-gray-300">{st.name}</td>
                                                    <td className="p-2 border-r border-t border-gray-300">{st.student_id}</td>
                                                    <td className="p-2 font-medium border-t">
                                                    {st.attended_sessions} / {selectedClass.course.total_sessions_conducted} ({attendanceRate}%)
                                                    </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* HIỂN THỊ CHI TIẾT MENTOR */}
                            {selectedMentor && (
                            <div className="max-w-3xl mx-auto mt-10">
                                <div className="flex flex-col items-center text-center mt-[50px]">
                                <img
                                    className="w-[200px] h-[200px] rounded-full mb-6"
                                    alt="avatar"
                                    src={
                                        selectedMentor.mentor.avatar ||
                                        "https://aic.com.vn/wp-content/uploads/2024/10/avatar-mac-dinh-1.jpg"
                                    }
                                />
                                <h2 className="text-2xl font-bold text-blue-800">
                                {selectedMentor.mentor.name}
                                </h2>
                                <div>
                                    <p className="text-base">📧 Email: {selectedMentor.mentor.email}</p>
                                    <p className="text-base">📍 Địa điểm: {selectedMentor.mentor.location}</p>
                                    <p className="text-base">💖 Sở thích: {selectedMentor.mentor.hobby}</p>
                                </div>
                                </div>

                                <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 pb-2">
                                    Danh sách lớp phụ trách ({selectedMentor.teaching_classes.length})
                                </h3>

                                {selectedMentor.teaching_classes.length > 0 ? (
                                    <table className="min-w-full bg-white shadow-md rounded overflow-hidden border border-black">
                                        <thead>
                                            <tr className="bg-[#FFEFE5] text-black border border-black text-left">
                                                <th className="p-3 w-16 border-r border-b border-black">STT</th>
                                                <th className="p-3 border-r border-b border-black">Mã lớp</th>
                                                <th className="p-3 border-b">Tên môn học</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMentor.teaching_classes.map((course, index) => (
                                                <tr key={course.id} className="border-b border-gray-300 hover:bg-gray-100">
                                                    <td className="p-3 border-r border-t border-gray-300">{index + 1}</td>
                                                    <td className="p-3 font-medium border-r border-t border-gray-300">{course.code}</td>
                                                    <td className="p-3 border-t">{course.name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-lg italic text-gray-500">Mentor này hiện chưa phụ trách lớp nào.</p>
                                )}
                            </div>
                            )}

                            {/* Nếu chưa chọn gì */}
                            {!selectedClass && !selectedMentor && (
                                <p className="text-xl mt-5 text-gray-500">
                                    👈 Hãy chọn một lớp hoặc cố vấn viên ở thanh bên để xem chi tiết.
                                </p>
                            )}
                        </>
                    )}

                    {/* HIỂN THỊ KHI Ở CÁC TAB KHÁC */}
                    {activeTab !== "Management" && activeTab !== "Complaints" && (
                        <p className="text-xl mt-5 text-gray-500">
                            Chức năng này đang được phát triển.
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Coordinator;