'use client';
import { Input } from 'antd';
import { useState } from 'react';

export default function Home() {
  const [pass, setPass] = useState('');

  return (
    <div className="main-content min-h-screen p-4">
      <div className="container mx-auto">
        <div className="landscape:flex landscape:items-center landscape:justify-center landscape:min-h-screen">
          <div className="landscape:w-full landscape:max-w-4xl">
            {pass === "3517" ? (
              <div className="text-center">
                <h1 className="text-2xl landscape:text-xl font-bold mb-4">
                  欢迎使用
                </h1>
                <p className="mb-4 landscape:mb-2">
                  密码正确，欢迎进入系统！
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    请输入密码：
                  </label>
                  <Input 
                    style={{ width: '200px'}}
                    type="password"
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)}
                    className="mb-4"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
