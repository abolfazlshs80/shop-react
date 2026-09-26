import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import alertService from "../../Hooks/alertService";
import { useAuth } from "../../Hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        userName,
        password,
      });

      alertService.success(
        "با موفقیت وارد شدید"
      );

      navigate("/");
    } catch (err) {
      alertService.error(
        "ورود ناموفق بود"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              ورود به حساب کاربری
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              برای ورود، اطلاعات حساب خود را وارد کنید
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Username */}
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                نام کاربری
              </label>

              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) =>
                  setUserName(e.target.value)
                }
                placeholder="نام کاربری خود را وارد کنید"
                className="
                  w-full
                  rounded-lg
                  border border-gray-300
                  bg-white
                  px-4 py-3
                  text-sm text-gray-800
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                رمز عبور
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="رمز عبور خود را وارد کنید"
                className="
                  w-full
                  rounded-lg
                  border border-gray-300
                  bg-white
                  px-4 py-3
                  text-sm text-gray-800
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-lg
                bg-blue-600
                px-4 py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-blue-700
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading
                ? "در حال ورود..."
                : "ورود"}
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © تمامی حقوق محفوظ است
        </p>

      </div>
    </section>
  );
}