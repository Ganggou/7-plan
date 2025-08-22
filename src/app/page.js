'use client';
import { Input, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [messageApi, contextHolder] = message.useMessage();

  // 抽奖图片数组 - 可以自定义
  const lotteryImages = [
    { src: '/images/1.png', alt: '奖品1', name: 'asd' },
    { src: '/images/2.png', alt: '奖品2', name: 'Vercel' },
    { src: '/images/3.png', alt: '奖品3', name: 'Globe' },
    { src: '/images/1.png', alt: '奖品4', name: 'File' },
    { src: '/images/2.png', alt: '奖品5', name: 'Window' },
  ];

  // 抽奖滚动逻辑
  useEffect(() => {
    let interval;
    if (isSpinning) {
      interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % lotteryImages.length);
      }, 200); // 每100ms切换一次
    }
    return () => clearInterval(interval);
  }, [isSpinning, lotteryImages.length]);

  const startLottery = () => {
    setIsSpinning(true);
    // 3秒后停止
    setTimeout(() => {
      setIsSpinning(false);
      const finalIndex = Math.floor(Math.random() * lotteryImages.length);
      setCurrentIndex(finalIndex);
      messageApi.info(`恭喜您抽中了：${lotteryImages[finalIndex].name}！`);
    }, 5000);
  };

  return (
    <div className="main-content min-h-screen p-4">
        {contextHolder}
      <div className="container mx-auto">
        <div className="landscape:flex landscape:items-center landscape:justify-center landscape:min-h-screen">
          <div className="landscape:w-full landscape:max-w-5xl">
            {show ? (
              <div className="text-center">
                {/* 抽奖滚动栏 */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-blue-300">
                  <h2 className="text-xl font-bold mb-4 text-blue-600">🎉 幸运抽奖 🎉</h2>
                  
                  {/* 抽奖显示区域 */}
                  <div className="mb-8">
                    <div className={`w-40 h-35 mx-auto mb-6 border-4 rounded-lg flex items-center justify-center bg-white shadow-lg transition-all duration-200 ${
                      isSpinning ? 'border-yellow-400 animate-pulse' : 'border-gray-300'
                    }`}>
                      <div className="text-center">
                        <Image 
                          src={currentIndex === -1 ? '/images/default.png' : lotteryImages[currentIndex].src}
                          alt={currentIndex === -1 ? '神秘大奖' : lotteryImages[currentIndex].alt}
                          width={120}
                          height={120}
                          className="mx-auto mb-3"
                        />
                        <p className="text-base font-medium text-gray-700">
                          {currentIndex === -1 ? '抽我' : lotteryImages[currentIndex].name}

                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={startLottery}
                    disabled={isSpinning}
                    className={`px-8 py-2 font-bold ${
                      isSpinning 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                    }`}
                  >
                    {isSpinning ? '抽奖中...' : '开始抽奖'}
                  </Button>
                  
                  {isSpinning && (
                    <p className="mt-2 text-sm text-gray-600 animate-bounce">
                      🎲 正在为您抽奖，请稍候...
                    </p>
                  )}
                </div>
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
                  <Button type="primary" onClick={() => setShow(pass == '3517')}>确认</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
