import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-around mb-6 border-b border-gray-300">
          <button
            className={`py-2 px-4 text-lg font-semibold ${isLogin ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold ${!isLogin ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
