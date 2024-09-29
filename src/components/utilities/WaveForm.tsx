import React, { useRef, useEffect } from 'react';

interface WaveformVisualizerProps {
    isRecording: boolean;
    stream: MediaStream | null;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ isRecording, stream }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
        if (isRecording && stream) {
            startVisualization(stream);
        } else {
            stopVisualization();
        }

        return () => {
            stopVisualization();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [isRecording, stream]);

    const startVisualization = (stream: MediaStream) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        drawWaveform();
    };

    const stopVisualization = () => {
        cancelAnimationFrame(animationRef.current!);
    };

    const drawWaveform = () => {
        if (!canvasRef.current || !analyserRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const analyser = analyserRef.current;
        analyser.fftSize = 2048;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);

            ctx.fillStyle = 'rgb(17, 27, 33)'; // Background color
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgb(0, 168, 132)'; // Waveform color
            ctx.beginPath();

            const sliceWidth = canvas.width * 1.0 / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = v * canvas.height / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        draw();
    };

    return <canvas ref={canvasRef} width="200" height="40" />;
};

export default WaveformVisualizer;