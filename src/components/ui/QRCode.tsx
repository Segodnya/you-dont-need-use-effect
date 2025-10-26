import { useRef, useEffect } from 'preact/hooks';
import QRCode from 'qrcode';

export interface QRCodeProps {
  value: string;
  size?: number;
  label?: string;
  className?: string;
}

export default function QRCodeComponent({
  value,
  size = 128,
  label,
  className = '',
}: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    QRCode.toCanvas(canvas, value, {
      width: size,
      color: {
        dark: '#ffffff',
        light: '#00000000', // transparent
      },
      margin: 1,
      errorCorrectionLevel: 'M',
    }).catch((error) => {
      console.error('Error generating QR code:', error);
    });
  }, [value, size]);

  return (
    <div className={`relative ${className}`}>
      {/* Blurry background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl blur-sm transform scale-110"></div>

      {/* Border container with QR code and label */}
      <div className="relative border-2 border-blue-400/40 rounded-xl p-6 bg-blue-950/40 backdrop-blur-sm shadow-lg shadow-blue-500/10">
        <div className="flex items-center gap-6">
          <canvas ref={canvasRef} className="rounded-lg" />

          {/* Label inside the border */}
          {label && (
            <div className="flex-1">
              <p className="text-blue-300 text-lg font-semibold max-w-[200px]">
                {label}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
