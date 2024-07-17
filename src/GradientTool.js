import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Slider } from './components/ui/Slider';
import { Button } from './components/ui/Button';

const GradientTool = () => {
  const [colors, setColors] = useState([
    { color: '#ff0000', position: 0 },
    { color: '#00ff00', position: 33 },
    { color: '#0000ff', position: 66 },
    { color: '#ffff00', position: 100 }
  ]);
  const [activeColor, setActiveColor] = useState(0);
  const canvasRef = useRef(null);

  const updateColor = (newColor) => {
    setColors(colors.map((c, i) => i === activeColor ? { ...c, color: newColor } : c));
  };

  const updatePosition = (newPosition) => {
    setColors(colors.map((c, i) => i === activeColor ? { ...c, position: newPosition[0] } : c));
  };

  const drawGradient = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    colors.forEach(({ color, position }) => {
      gradient.addColorStop(position / 100, color);
    });

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    drawGradient();
  }, [colors]);

  const exportPNG = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'gradient.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Gradient Tool</h2>
        <canvas ref={canvasRef} width={400} height={200} className="w-full mb-6 rounded-lg shadow-md" />
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Color Stops</h3>
          <div className="flex space-x-2">
            {colors.map((c, i) => (
              <button
                key={i}
                className={`w-10 h-10 rounded-full shadow transition-transform hover:scale-110 ${i === activeColor ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                style={{ backgroundColor: c.color }}
                onClick={() => setActiveColor(i)}
              />
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Color Picker</h3>
          <HexColorPicker color={colors[activeColor].color} onChange={updateColor} className="w-full" />
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Position</h3>
          <Slider
            value={[colors[activeColor].position]}
            onValueChange={updatePosition}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        
        <Button onClick={exportPNG} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200">
          Export PNG
        </Button>
      </div>
    </div>
  );
};

export default GradientTool;