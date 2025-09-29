import React, { useState, useRef } from 'react';
import { Mic, MicOff, Play, Pause, RotateCcw, Check, Volume2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface AudioCaptureProps {
  onAudioCapture: (audio: Blob) => void;
  onNext: () => void;
}

const AudioCapture: React.FC<AudioCaptureProps> = ({ onAudioCapture, onNext }) => {
  const { translations } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioAnalysis, setAudioAnalysis] = useState<any>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setRecordedAudio(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
        onAudioCapture(audioBlob);
        analyzeAudio(audioBlob);
        
        // Stop the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const retakeAudio = () => {
    setRecordedAudio(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setRecordingTime(0);
    setAudioAnalysis(null);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    // Simulate audio analysis
    setTimeout(() => {
      const mockAnalysis = {
        duration: recordingTime,
        quality: Math.floor(Math.random() * 20) + 80, // 80-100
        frequency: Math.floor(Math.random() * 200) + 100, // 100-300 Hz
        volume: Math.floor(Math.random() * 30) + 70, // 70-100 dB
        clarity: ['Good', 'Excellent', 'Fair'][Math.floor(Math.random() * 3)],
        breedIndicators: [
          'Low frequency mooing typical of larger breeds',
          'Vocal patterns consistent with Zebu cattle',
          'Sound intensity suggests healthy respiratory system'
        ]
      };
      setAudioAnalysis(mockAnalysis);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {translations.recordAnimalSound || 'Record Animal Sound'}
        </h2>
        <p className="text-gray-600">
          {translations.audioInstructions || 'Record 5-10 seconds of the animal\'s natural vocalizations (mooing, bellowing) for breed-specific audio analysis'}
        </p>
      </div>

      {/* Recording Interface */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
        {!recordedAudio ? (
          <>
            {/* Recording Controls */}
            <div className="mb-6">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="w-24 h-24 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center mx-auto transition-all transform hover:scale-105 shadow-lg"
                >
                  <Mic size={32} />
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="w-24 h-24 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto transition-all animate-pulse shadow-lg"
                >
                  <MicOff size={32} />
                </button>
              )}
            </div>

            {/* Recording Status */}
            {isRecording ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-red-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Recording...</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatTime(recordingTime)}
                </div>
                <div className="text-sm text-gray-600">
                  {translations.recordingInProgress || 'Keep the microphone close to the animal'}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg text-gray-700 mb-2">
                  {translations.readyToRecord || 'Ready to Record'}
                </p>
                <p className="text-sm text-gray-500">
                  {translations.clickToStart || 'Click the microphone to start recording'}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Playback Controls */}
            <div className="mb-6">
              <button
                onClick={playAudio}
                className="w-20 h-20 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto transition-colors shadow-lg"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Volume2 size={20} />
                <span className="font-medium">
                  {translations.recordingComplete || 'Recording Complete'}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900">
                {formatTime(recordingTime)}
              </div>

              {/* Audio Analysis */}
              {audioAnalysis && (
                <div className="bg-white rounded-lg p-4 mt-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    {translations.audioAnalysis || 'Audio Analysis'}
                  </h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {audioAnalysis.quality}%
                      </div>
                      <div className="text-sm text-gray-600">
                        {translations.quality || 'Quality'}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">
                        {audioAnalysis.frequency}Hz
                      </div>
                      <div className="text-sm text-gray-600">
                        {translations.frequency || 'Frequency'}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {audioAnalysis.volume}dB
                      </div>
                      <div className="text-sm text-gray-600">
                        {translations.volume || 'Volume'}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600">
                        {audioAnalysis.clarity}
                      </div>
                      <div className="text-sm text-gray-600">
                        {translations.clarity || 'Clarity'}
                      </div>
                    </div>
                  </div>

                  {/* Breed Indicators */}
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">
                      {translations.breedIndicators || 'Breed Indicators'}
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {audioAnalysis.breedIndicators.map((indicator: string, index: number) => (
                        <li key={index}>• {indicator}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4 justify-center mt-6">
                <button
                  onClick={retakeAudio}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span>{translations.retake || 'Retake'}</span>
                </button>
                
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Check size={16} />
                  <span>{translations.confirm || 'Confirm & Continue'}</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Hidden Audio Element */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}
      </div>

      {/* Skip Option */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          {translations.audioOptional || 'Audio recording is optional but helps improve identification accuracy'}
        </p>
        
        <button
          onClick={handleNext}
          className="px-6 py-2 text-blue-600 hover:text-blue-800 font-medium underline"
        >
          {translations.skipAudio || 'Skip Audio Recording'}
        </button>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">
          {translations.audioTips || 'Audio Recording Tips:'}
        </h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• {translations.audioTip1 || 'Wait for natural vocalizations - don\'t force the animal to make sounds'}</li>
          <li>• {translations.audioTip2 || 'Record in a quiet environment when possible'}</li>
          <li>• {translations.audioTip3 || '5-10 seconds of clear sound is sufficient'}</li>
          <li>• {translations.audioTip4 || 'Different breeds have distinct vocal characteristics'}</li>
        </ul>
      </div>
    </div>
  );
};

export default AudioCapture;