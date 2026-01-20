import React, { useState, useEffect, useRef } from 'react';
import { Download, Type, MessageSquare, Palette, Settings } from 'lucide-react';
import { renderToCanvas } from './utils/canvasHelper';

const App = () => {
  const [text, setText] = useState('안녕하세요!');
  const [font, setFont] = useState('Gaegu');
  const [bubbleColor, setBubbleColor] = useState('#ffffff');
  const [borderColor, setBorderColor] = useState('#333333');
  const [textColor, setTextColor] = useState('#000000');
  const [bubbleType, setBubbleType] = useState('round');
  const [hasTail, setHasTail] = useState(true);
  const [imgDataUrl, setImgDataUrl] = useState('');
  const canvasRef = useRef(null);

  const fonts = [
    { name: '개구체', value: 'Gaegu' },
    { name: '나눔펜', value: 'Nanum Pen Script' },
    { name: '푸버스토리', value: 'Poor Story' },
    { name: '고운돋움', value: 'Gowun Dodum' },
    { name: '주아', value: 'Jua' },
    { name: '해바라기', value: 'Sunflower' },
    { name: '감자꽃', value: 'Gamja Flower' },
    { name: '하이멜로디', value: 'Hi Melody' }
  ];

  const colors = [
    '#ffffff', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#000000'
  ];

  const bubbles = [
    { name: '없음', value: 'none' },
    { name: '둥근 말풍선', value: 'round' },
    { name: '각진 말풍선', value: 'sharp' },
    { name: '구름 말풍선', value: 'cloudy' },
    { name: '하트 모양', value: 'heart' },
    { name: '타원 모양', value: 'ellipse' },
    { name: '아이폰', value: 'iphone' },
    { name: '삐쭉삐쭉', value: 'spiky' },
    { name: '몽글몽글', value: 'bubbly' }
  ];

  useEffect(() => {
    if (canvasRef.current) {
      // 폰트가 로드될 때까지 대기 후 렌더링
      const fontName = font;
      document.fonts.load(`40px "${fontName}"`).then(() => {
        renderToCanvas(canvasRef.current, { text, font, bubbleColor, borderColor, textColor, bubbleType, hasTail });
        setImgDataUrl(canvasRef.current.toDataURL());
      });
    }
  }, [text, font, bubbleColor, borderColor, textColor, bubbleType, hasTail]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `cute-image-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">✨ 귀여운 텍스트 생성기</h1>
        <p className="text-gray-600">나만의 손글씨와 말풍선 이미지를 만들어보세요!</p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-xl">
        {/* 컨트롤 패널 */}
        <div className="space-y-6">
          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Type size={18} /> 내용 입력
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border-2 border-gray-100 rounded-lg focus:border-blue-400 outline-none transition-all"
              placeholder="내용을 입력하세요... (엔터로 줄바꿈 가능)"
              rows={3}
            />
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Settings size={18} /> 폰트 선택
            </label>
            <div className="grid grid-cols-3 gap-2">
              {fonts.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFont(f.value)}
                  className={`p-2 rounded-md text-sm transition-all ${
                    font === f.value ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{ fontFamily: f.value }}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Palette size={18} /> 말풍선 색상
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setBubbleColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    bubbleColor === c ? 'border-gray-400 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input 
                type="color" 
                value={bubbleColor} 
                onChange={(e) => setBubbleColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 cursor-pointer bg-transparent"
              />
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Palette size={18} /> 말풍선 테두리 색상
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setBorderColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    borderColor === c ? 'border-gray-400 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input 
                type="color" 
                value={borderColor} 
                onChange={(e) => setBorderColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 cursor-pointer bg-transparent"
              />
            </div>
          </section>

          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Palette size={18} /> 글자 색상
            </label>
            <div className="flex flex-wrap gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setTextColor(c)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    textColor === c ? 'border-gray-400 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <input 
                type="color" 
                value={textColor} 
                onChange={(e) => setTextColor(e.target.value)}
                className="w-8 h-8 p-0 border-0 cursor-pointer bg-transparent"
              />
            </div>
          </section>

          <section>
            <div className="flex justify-between items-center mb-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MessageSquare size={18} /> 말풍선 스타일
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={hasTail} 
                  onChange={(e) => setHasTail(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                꼬리 표시
              </label>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {bubbles.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBubbleType(b.value)}
                  className={`p-2 rounded-md text-sm transition-all ${
                    bubbleType === b.value ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* 프리뷰 영역 */}
        <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200">
          <div className="mb-8 overflow-auto max-w-full">
            <canvas ref={canvasRef} className="hidden" />
            {imgDataUrl && (
              <img 
                src={imgDataUrl} 
                alt="Generated" 
                className="max-w-full h-auto shadow-lg rounded-lg select-none pointer-events-auto touch-manipulation"
                style={{ WebkitTouchCallout: 'default' }}
              />
            )}
          </div>
          
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <Download size={20} /> 이미지 다운로드
          </button>
        </div>
      </main>

      <footer className="mt-12 text-gray-400 text-sm">
        © 2026 귀여운 텍스트 생성기. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
