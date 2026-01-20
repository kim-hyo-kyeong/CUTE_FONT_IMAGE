/**
 * Canvas에 말풍선을 그리는 함수
 * @param {CanvasRenderingContext2D} ctx 
 * @param {string} type 'round', 'cloudy', 'sharp', 'heart', 'star', 'ellipse'
 * @param {number} x 
 * @param {number} y 
 * @param {number} w 
 * @param {number} h 
 * @param {string} bubbleColor 
 * @param {string} borderColor
 * @param {boolean} hasTail 꼬리 유무
 */
export const drawSpeechBubble = (ctx, type, x, y, w, h, bubbleColor, borderColor, hasTail = true) => {
  ctx.save();
  ctx.beginPath();
  
  // 말풍선 타입에 따른 기본 스타일 설정
  if (type === 'infinite') {
    ctx.fillStyle = bubbleColor === '#ffffff' ? '#ffeb3b' : bubbleColor;
    ctx.strokeStyle = borderColor === '#333333' ? '#000000' : borderColor;
    ctx.lineWidth = 4;
  } else {
    ctx.fillStyle = bubbleColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
  }

  const r = 20; // border radius

  if (type === 'round') {
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    if (hasTail) {
      ctx.lineTo(x + 60, y + h);
      ctx.lineTo(x + 40, y + h + 20);
      ctx.lineTo(x + 30, y + h);
    }
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  } else if (type === 'sharp') {
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w, y + h);
    if (hasTail) {
      ctx.lineTo(x + 60, y + h);
      ctx.lineTo(x + 40, y + h + 20);
      ctx.lineTo(x + 30, y + h);
    }
    ctx.lineTo(x, y + h);
    ctx.closePath();
  } else if (type === 'cloudy') {
    const step = w / 4;
    ctx.moveTo(x, y + h / 2);
    ctx.bezierCurveTo(x, y - 10, x + step, y - 10, x + step * 2, y);
    ctx.bezierCurveTo(x + step * 3, y - 10, x + w, y - 10, x + w, y + h / 2);
    ctx.bezierCurveTo(x + w, y + h + 10, x + step * 3, y + h + 10, x + step * 2, y + h);
    if (hasTail) {
      ctx.lineTo(x + 60, y + h + 5);
      ctx.lineTo(x + 40, y + h + 20);
      ctx.lineTo(x + 30, y + h + 5);
    }
    ctx.bezierCurveTo(x + step, y + h + 10, x, y + h + 10, x, y + h / 2);
    ctx.closePath();
  } else if (type === 'heart') {
    const topCurveHeight = h * 0.3;
    ctx.moveTo(x + w / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + w / 2, y, x + w, y, x + w, y + topCurveHeight);
    ctx.bezierCurveTo(x + w, y + (h + topCurveHeight) / 2, x + w / 2, y + (h + topCurveHeight) / 2, x + w / 2, y + h);
    if (hasTail) {
      ctx.lineTo(x + w / 2 - 5, y + h + 15);
      ctx.lineTo(x + w / 2 - 15, y + h * 0.85);
    }
    ctx.bezierCurveTo(x + w / 2, y + (h + topCurveHeight) / 2, x, y + (h + topCurveHeight) / 2, x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x + w / 2, y, x + w / 2, y + topCurveHeight);
    ctx.closePath();
  } else if (type === 'ellipse') {
    if (hasTail) {
      // Draw ellipse with tail as a single path
      ctx.moveTo(x + w, y + h / 2);
      // Bottom half with tail
      ctx.bezierCurveTo(x + w, y + h, x + w * 0.7, y + h, x + w / 2, y + h);
      ctx.lineTo(x + w * 0.4, y + h + 15);
      ctx.lineTo(x + w * 0.3, y + h);
      ctx.bezierCurveTo(x + w * 0.1, y + h, x, y + h, x, y + h / 2);
      // Top half
      ctx.bezierCurveTo(x, y, x + w * 0.1, y, x + w / 2, y);
      ctx.bezierCurveTo(x + w * 0.9, y, x + w, y, x + w, y + h / 2);
    } else {
      ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    }
    ctx.closePath();
  } else if (type === 'infinite') {
    // Infinite Challenge Style: Custom background, thick black jagged border
    
    const points = 15;
    const jitter = 5;
    
    ctx.moveTo(x, y);
    // Top
    for (let i = 1; i <= points; i++) {
      ctx.lineTo(x + (w / points) * i, y + (Math.random() - 0.5) * jitter);
    }
    // Right
    for (let i = 1; i <= points; i++) {
      ctx.lineTo(x + w + (Math.random() - 0.5) * jitter, y + (h / points) * i);
    }
    // Tail (Bottom-leftish)
    if (hasTail) {
      ctx.lineTo(x + 60, y + h);
      ctx.lineTo(x + 40, y + h + 20);
      ctx.lineTo(x + 30, y + h);
    }
    // Bottom
    for (let i = points - 1; i >= 0; i--) {
      ctx.lineTo(x + (w / points) * i, y + h + (Math.random() - 0.5) * jitter);
    }
    // Left
    for (let i = points - 1; i >= 0; i--) {
      ctx.lineTo(x + (Math.random() - 0.5) * jitter, y + (h / points) * i);
    }
    ctx.closePath();
  } else if (type === 'iphone') {
    // iPhone Style: Very rounded, tail on the side
    const rr = Math.min(w, h) * 0.4;
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    if (hasTail) {
      ctx.lineTo(x + w - 10, y + h + 5);
      ctx.quadraticCurveTo(x + w + 5, y + h + 15, x + w + 10, y + h + 15);
      ctx.quadraticCurveTo(x + w, y + h + 15, x + w - rr * 0.5, y + h);
    }
    ctx.lineTo(x + rr, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
  } else if (type === 'spiky') {
    // Spiky/Action style
    const points = 20;
    const centerX = x + w / 2;
    const centerY = y + h / 2;
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const dist = i % 2 === 0 ? 1 : 0.8;
      const px = centerX + Math.cos(angle) * (w / 2) * dist;
      const py = centerY + Math.sin(angle) * (h / 2) * dist;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    if (hasTail) {
      ctx.lineTo(x + 50, y + h);
      ctx.lineTo(x + 20, y + h + 25);
      ctx.lineTo(x + 35, y + h - 10);
    }
    ctx.closePath();
  } else if (type === 'bubbly') {
    // Bubbly: many overlapping circles/arcs
    const segments = 8;
    for (let i = 0; i < segments; i++) {
      const angle1 = (i / segments) * Math.PI * 2;
      const angle2 = ((i + 1) / segments) * Math.PI * 2;
      const midAngle = (angle1 + angle2) / 2;
      const cpDist = 1.2;
      const cpx = x + w / 2 + Math.cos(midAngle) * (w / 2) * cpDist;
      const cpy = y + h / 2 + Math.sin(midAngle) * (h / 2) * cpDist;
      const x2 = x + w / 2 + Math.cos(angle2) * (w / 2);
      const y2 = y + h / 2 + Math.sin(angle2) * (h / 2);
      if (i === 0) ctx.moveTo(x + w / 2 + Math.cos(angle1) * (w / 2), y + h / 2 + Math.sin(angle1) * (h / 2));
      ctx.quadraticCurveTo(cpx, cpy, x2, y2);
    }
    if (hasTail) {
      ctx.lineTo(x + 50, y + h - 5);
      ctx.quadraticCurveTo(x + 40, y + h + 20, x + 30, y + h - 10);
    }
    ctx.closePath();
  }

  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

/**
 * 텍스트를 이미지로 렌더링
 * @param {HTMLCanvasElement} canvas 
 * @param {Object} options 
 */
export const renderToCanvas = (canvas, { text, font, bubbleColor, borderColor, textColor, bubbleType, hasTail }) => {
  const ctx = canvas.getContext('2d');
  
  // 폰트 설정
  let fontSize = 40;
  if (bubbleType === 'infinite') {
    ctx.font = `bold ${fontSize}px "${font}"`;
  } else {
    ctx.font = `${fontSize}px "${font}"`;
  }

  const lines = text.split('\n');
  const metrics = lines.map(line => ctx.measureText(line));
  const textWidth = Math.max(...metrics.map(m => m.width));
  const lineHeight = fontSize * 1.2;
  const textHeight = lines.length * lineHeight;

  // 말풍선 타입에 따른 패딩 설정
  let paddingX = 60;
  let paddingY = 60;

  if (bubbleType === 'cloudy') {
    paddingX = 80;
    paddingY = 70;
  } else if (bubbleType === 'heart') {
    paddingX = 100;
    paddingY = 120;
  } else if (bubbleType === 'ellipse') {
    paddingX = 80;
    paddingY = 70;
  } else if (bubbleType === 'spiky') {
    paddingX = 90;
    paddingY = 90;
  } else if (bubbleType === 'bubbly') {
    paddingX = 80;
    paddingY = 80;
  } else if (bubbleType === 'none') {
    paddingX = 30;
    paddingY = 30;
  }

  // 캔버스 크기 조정
  canvas.width = Math.max(textWidth + paddingX * 2, 250);
  const tailSpace = (hasTail && bubbleType !== 'none') ? 30 : 0;
  canvas.height = textHeight + paddingY * 2 + tailSpace;

  // 배경 투명화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 말풍선 그리기 (있을 경우)
  if (bubbleType !== 'none') {
    drawSpeechBubble(ctx, bubbleType, 10, 10, canvas.width - 20, canvas.height - tailSpace - 20, bubbleColor, borderColor, hasTail);
  }

  // 텍스트 그리기 설정 (폰트 다시 설정 - canvas width 변경 시 초기화될 수 있음)
  if (bubbleType === 'infinite') {
    ctx.font = `bold ${fontSize}px "${font}"`;
    ctx.fillStyle = textColor === '#000000' ? 'black' : textColor; // Keep default black for infinite if not changed
  } else {
    ctx.font = `${fontSize}px "${font}"`;
    ctx.fillStyle = textColor;
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const startY = (canvas.height - tailSpace) / 2 - (textHeight / 2) + (lineHeight / 2);

  lines.forEach((line, i) => {
    const yOffset = startY + (i * lineHeight);
    if (bubbleType === 'infinite') {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.lineJoin = 'round';
        ctx.strokeText(line, canvas.width / 2, yOffset);
        ctx.fillText(line, canvas.width / 2, yOffset);
    } else {
        ctx.fillText(line, canvas.width / 2, yOffset);
    }
  });
};
