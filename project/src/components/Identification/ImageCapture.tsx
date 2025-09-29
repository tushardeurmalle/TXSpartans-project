import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, RotateCcw, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ImageCaptureProps {
  onImageCapture: (file: File) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCapture }) => {
  const { translations } = useLanguage();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [quality, setQuality] = useState({ score: 0, issues: [] as string[] });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'environment' 
        } 
      });
      setCameraStream(stream);
      setIsCapturing(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access error:', error);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cattle-image.jpg', { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        
        setCapturedImage(imageUrl);
        analyzeImageQuality(imageUrl);
        stopCamera();
      }
    }, 'image/jpeg', 0.9);
  };

  const analyzeImageQuality = (imageUrl: string) => {
    // Simulate image quality analysis
    setTimeout(() => {
      const mockAnalysis = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        issues: [] as string[]
      };

      if (mockAnalysis.score < 80) {
        mockAnalysis.issues.push('Image could be clearer');
      }
      if (Math.random() > 0.7) {
        mockAnalysis.issues.push('Ensure full animal is visible');
      }
      if (Math.random() > 0.8) {
        mockAnalysis.issues.push('Better lighting recommended');
      }

      setQuality(mockAnalysis);
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setCapturedImage(imageUrl);
      analyzeImageQuality(imageUrl);
    }
  };

  const confirmImage = () => {
    if (!capturedImage) return;

    fetch(capturedImage)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], 'cattle-image.jpg', { type: 'image/jpeg' });
        onImageCapture(file);
      });
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setQuality({ score: 0, issues: [] });
    if (!isCapturing) {
      startCamera();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {translations.captureAnimalImage || 'Capture Animal Image'}
        </h2>
        <p className="text-gray-600">
          {translations.captureInstructions || 'Take a clear photo showing the full animal, including head, body, and distinctive features'}
        </p>
      </div>

      {/* Camera View or Captured Image */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        {!capturedImage && (
          <>
            {isCapturing ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Camera size={64} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {translations.cameraNotStarted || 'Camera not started'}
                  </p>
                </div>
              </div>
            )}
            
            {/* Camera Overlay Guide */}
            {isCapturing && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-4 border-t-4 border-orange-400"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-4 border-t-4 border-orange-400"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-4 border-b-4 border-orange-400"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-4 border-b-4 border-orange-400"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                    {translations.alignAnimal || 'Align animal within frame'}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {capturedImage && (
          <div className="relative">
            <img
              src={capturedImage}
              alt="Captured cattle"
              className="w-full h-96 object-contain bg-black"
            />
            
            {/* Quality Analysis Overlay */}
            {quality.score > 0 && (
              <div className="absolute top-4 right-4 bg-white/90 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    quality.score >= 85 ? 'bg-green-500' :
                    quality.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-medium text-sm">
                    {translations.quality || 'Quality'}: {quality.score}%
                  </span>
                </div>
                {quality.issues.length > 0 && (
                  <div className="mt-2">
                    {quality.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs text-gray-600">
                        <AlertCircle size={12} />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!capturedImage ? (
          <>
            {!isCapturing ? (
              <button
                onClick={startCamera}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Camera size={20} />
                <span>{translations.startCamera || 'Start Camera'}</span>
              </button>
            ) : (
              <button
                onClick={capturePhoto}
                className="flex items-center space-x-2 px-8 py-4 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shadow-lg"
              >
                <Camera size={24} />
                <span>{translations.capture || 'Capture'}</span>
              </button>
            )}
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Upload size={20} />
              <span>{translations.uploadImage || 'Upload Image'}</span>
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </>
        ) : (
          <>
            <button
              onClick={retakePhoto}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw size={20} />
              <span>{translations.retake || 'Retake'}</span>
            </button>
            
            <button
              onClick={confirmImage}
              disabled={quality.score < 60}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                quality.score >= 60
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check size={20} />
              <span>{translations.confirm || 'Confirm & Continue'}</span>
            </button>
          </>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">
          {translations.captureTitle || 'Photography Tips:'}
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• {translations.tip1 || 'Ensure good lighting - natural daylight works best'}</li>
          <li>• {translations.tip2 || 'Include the full animal in the frame'}</li>
          <li>• {translations.tip3 || 'Capture distinctive features like ears, horns, and face'}</li>
          <li>• {translations.tip4 || 'Avoid blurry images - hold the camera steady'}</li>
          <li>• {translations.tip5 || 'Take photos from the side for better breed identification'}</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageCapture;