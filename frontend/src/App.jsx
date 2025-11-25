import React, { useState } from "react";
import Coordinator from "./Coordinator.jsx";
// import Officer from "./Officer";


// =========================
// COMPONENT: Landing Page
// =========================
const LandingPage = ({ onSelectHCMUT }) => {
  return (
    <div
      className="bg-[#f0f2f4] overflow-hidden w-full min-w-[1440px] min-h-[769px] flex flex-col gap-[0px]"
    >
      <div className="w-full h-[58px] relative">
        <div className="absolute top-0 left-0 w-full h-[58px] bg-[#0388b4]" />

        <img
          className="top-[9px] left-[41px] w-[39px] h-10 absolute object-cover"
          alt="logo"
          src="https://c.animaapp.com/micx2cm5DwdPLN/img/logo-bach-khoa-1.png"
        />
      
        <div
          className="absolute left-[105px] top-0 w-[101px] h-[58px] bg-[#044cc8] flex items-center justify-center cursor-pointer rounded"
        >
          <span className="text-[#ffffff] text-center">Trang chủ</span>
        </div>


      </div>

      <div className="flex flex-1 items-center justify-center mt-[0px]">
        <div className="w-[483px] h-[470px] bg-[#ffffff] rounded-[10px] shadow flex flex-col items-center justify-start relative ">

          <img
            className="w-[137px] h-[140px] mt-[37px] object-cover"
            alt="logo center"
            src="https://c.animaapp.com/micx2cm5DwdPLN/img/logo-bach-khoa-1.png"
          />

          <p className="mt-[30px] w-[389px] font-normal text-[#244cc9] text-[22px] text-center">
            Đăng nhập bằng tài khoản HCMUT của bạn
          </p>

          <button
            onClick={onSelectHCMUT}
            className="mt-[40px] w-[387px] h-[41px] flex items-center justify-center bg-[#ffffff] rounded-[5px] border cursor-pointer"
          >
            <span className="font-normal text-black text-sm">Tài khoản HCMUT</span>
          </button>


          <button
            className="mt-[10px] w-[387px] h-[41px] flex items-center justify-center bg-[#ffffff] rounded-[5px] border cursor-pointer"
          >
            <span className="font-normal text-black text-sm">Quản trị viên</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// =========================
// COMPONENT: Login Form
// =========================
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="bg-[#f0f2f4] overflow-hidden w-full min-w-[1440px] min-h-[769px] relative"
    >
      <header className="absolute top-0 left-0 w-full h-[82px] bg-[#210f7a]">
        <img
          className="absolute top-[17px] left-[37px] w-[46px] h-[47px]"
          alt="logo"
          src="https://c.animaapp.com/micw25kc5W4C7A/img/logo-bach-khoa-2.png"
        />

        <p className="absolute top-0 left-[111px] h-[27px] flex items-center font-sans text-[28px] font-semibold text-[#ffffff]">
          DỊCH VỤ XÁC THỰC TẬP TRUNG
        </p>
      </header>

      <div
        className="absolute top-[104px] left-[107px] w-[1234px] h-[355px] relative"
        id="login-container"
      >
        {/* Khung nền trắng */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#ffffff] shadow rounded-[10px] z-0"
          id="white-background"
        />

        {/* Khung xám bên trái */}
        <div
          className="absolute top-[16px] left-[15px] w-[473px] h-[323px] bg-[#eeeeee] border rounded-[10px] z-1"
          id="gray-panel"
        />

        {/* Tiêu đề */}
        <p
          className="absolute top-[20px] left-[43px] w-[389px] font-sans text-[22px] font-extrabold text-[#ae3c62] z-10"
          id="login-title"
        >
          Nhập thông tin tài khoản của bạn
        </p>

        {/* Lưu ý */}
        <div
          className="absolute top-[34px] left-[523px] w-[73px] font-sans text-[22px] font-extrabold text-[#ae3c62] z-10"
          id="note-label"
        >
          Lưu ý
        </div>

        {/* Nội dung lưu ý */}
        <p
          className="absolute top-[53px] left-[523px] w-[677px] font-light text-black text-[15px] leading-5 z-50"
          id="note-content"
        >
          Sử dụng tài khoản HCMUT để đăng nhập vào hệ thống. Nếu quên mật khẩu,
          vui lòng liên hệ Trung tâm dữ liệu để được hỗ trợ.
        </p>

        {/* Label: Tên tài khoản */}
        <label
          className="absolute top-[90px] left-[45px] text-xs font-semibold text-[#77787e] z-10"
          id="username-label"
        >
          Tên tài khoản
        </label>

        {/* Input: Tên tài khoản */}
        <input
          className="absolute top-[120px] left-[46px] w-[387px] h-[29px] bg-[#ffffdd] border rounded px-2 text-xs z-10"
          id="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Label: Mật khẩu */}
        <label
          className="absolute top-[179px] left-[45px] text-xs font-semibold text-[#77787e] z-10"
          id="password-label"
        >
          Mật khẩu
        </label>

        {/* Input: Mật khẩu */}
        <input
          type="password"
          className="absolute top-[210px] left-[46px] w-[387px] h-[29px] bg-[#ffffdd] border rounded px-2 text-xs z-10"
          id="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Nút Đăng nhập */}
        <button
          onClick={() => onLogin(username, password)}
          className="absolute top-[261px] left-[46px] w-[103px] h-[35px] rounded bg-[#006dcc] text-[#ffffff] border-none z-10"
          id="login-button"
        >
          Đăng nhập
        </button>

        {/* Nút Xóa */}
        <button
          onClick={() => {
            setUsername("");
            setPassword("");
          }}
          className="absolute top-[261px] left-[160px] w-[66px] h-[35px] rounded bg-[#006dcc] text-[#ffffff] border-none z-10"
          id="clear-button"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

// =========================
// COMPONENT: Dashboard (role-based)
// =========================
const Dashboard = ({ page, role }) => {
  if (page !== "dashboard") return null;

  return (
    <>
      {role === "coordinator" && <Coordinator />}
    </>
  );
};


// =========================
// MAIN APP
// =========================
function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setRole(data.user.role);
        setPage("dashboard");
      } else {
        alert("Sai tài khoản hoặc mật khẩu!");
      }
    } catch (err) {
      alert("Lỗi hệ thống!");
    }
  };

  return (
    <>
      {page === "landing" && (
        <LandingPage onSelectHCMUT={() => setPage("login")} />
      )}

      {page === "login" && <LoginForm onLogin={handleLogin} />}

      {page === "dashboard" && <Dashboard page={page} role={role} />}
    </>
  );
}

export default App;
