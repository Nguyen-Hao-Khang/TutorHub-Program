import React from 'react';

export default function BKLogin({ username, password, setUsername, setPassword, handleLogin, loading }) {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Thanh điều hướng */}
      <header className="bg-[#003366] text-white flex justify-between items-center px-6 py-3 text-sm">
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Trang chủ</a>
          <a href="#" className="hover:underline">BKeL Cũ</a>
          <a href="#" className="hover:underline">Khóa học</a>
        </div>
        <div className="flex gap-4 items-center">
          <select className="bg-white text-black px-2 py-1 rounded text-xs">
            <option value="vi">Vietnamese (vi)</option>
            <option value="en">English (en)</option>
          </select>
          <a href="#" className="hover:underline">Đăng nhập</a>
        </div>
      </header>

      {/* Logo + form */}
      <main className="flex flex-col items-center justify-center py-12 px-4">
        <img
          src="https://lms.hcmut.edu.vn/pluginfile.php/3/core_admin/favicon/64x64/1761124161/logoBK.png"
          alt="BK Logo"
          className="h-20 mb-4"
        />
        <h1 className="text-xl font-bold text-[#003366] mb-2">Đăng nhập vào trang | BK-LMS</h1>
        <p className="text-sm text-gray-600 mb-6">Đăng nhập bằng tài khoản của bạn trên:</p>

        <form onSubmit={handleLogin} className="bg-gray-50 border rounded shadow-md p-6 w-[350px]">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tài khoản HCMUT</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              placeholder="VD: mentee1, mentor1, coord..."
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Mặc định: 123"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#003366] text-white p-2 rounded hover:bg-blue-800 font-semibold"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-600">
          <p>Thông báo từ các Cookies</p>
        </div>
      </main>
    </div>
  );
}