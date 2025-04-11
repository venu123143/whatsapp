
import React, { useRef, useState, useEffect } from 'react';
import { X, Repeat, Download } from 'lucide-react';
import { getTooltipStyle } from '../cards/Tooltip';
import TooltipButton from '../cards/Tooltip';
import { MdOutlineFileUpload } from "react-icons/md";

interface ModernCameraProps {
    onClose: () => void;
    onCapture?: (photo: File) => void;
    quality?: number;
}

const ModernCamera: React.FC<ModernCameraProps> = ({
    onClose,
    onCapture,
    quality = 0.92
}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const styles = getTooltipStyle("top")
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [imageBlob, setImageBlob] = useState<File | null>(null);
    const [cameraState, setCameraState] = useState({
        isCameraReady: false,
        isLoading: true,
        error: null as string | null
    });
    // const convertImageFileToBase64 = (file: File): Promise<string> => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             resolve(reader.result as string);
    //         };
    //         reader.onerror = (error) => {
    //             reject(error);
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };

    const startCamera = async (): Promise<void> => {
        try {
            const constraints: MediaStreamConstraints = {
                video: {
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                await videoRef.current.play();

                setCameraState({
                    isCameraReady: true,
                    isLoading: false,
                    error: null
                });
            }
        } catch (error) {
            setCameraState({
                isCameraReady: false,
                isLoading: false,
                error: 'Failed to access camera'
            });
            console.error("Camera access denied:", error);
        }
    };

    const stopCamera = (): void => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setCameraState(prev => ({ ...prev, isCameraReady: false }));
    };

    // Helper function to convert base64 to File
    const convertBase64ToFile = async (base64: string, filename: string): Promise<File> => {
        const res = await fetch(base64);
        const blob = await res.blob();
        return new File([blob], filename, { type: 'image/jpeg' });
    };

    const handleCapture = async () => {
        if (!videoRef.current || !cameraState.isCameraReady) return;

        const canvas = document.createElement('canvas');
        const video = videoRef.current;
        const context = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const photoDataUrl = canvas.toDataURL('image/jpeg', quality);
            setCapturedPhoto(photoDataUrl)
            const imageBlob = await convertBase64ToFile(photoDataUrl, 'captured-photo.jpg')
            setImageBlob(imageBlob);
        }
        stopCamera();
    };
    const uploadProfile = () => {
        if (!imageBlob) return
        onCapture?.(imageBlob);
    }
    const handleRetake = (): void => {
        setCapturedPhoto(null);
        startCamera();
    };

    const handleDownload = async () => {
        if (capturedPhoto) {

            const canvas = document.createElement('canvas');
            const image = new Image();
            image.src = capturedPhoto;

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                const context = canvas.getContext('2d');

                if (context) {
                    context.scale(-1, 1); // Flip the image horizontally
                    context.drawImage(image, -canvas.width, 0);
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/jpeg');
                    link.download = `photo-${new Date().getTime()}.jpg`;
                    link.click();
                }
            };

            // const base64 = await convertImageFileToBase64(capturedPhoto)
            // const link = document.createElement('a');
            // link.href = base64;
            // link.download = `photo-${new Date().getTime()}.jpg`;
            // link.click();
        }
    };
    const handleCancel = () => {
        stopCamera();
        onClose();
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            handleCancel();
        }
    };
    useEffect(() => {
        startCamera();
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            stopCamera();
            document.removeEventListener('mousedown', handleOutsideClick);
        };

    }, []);

    return (
        // backdrop-blur-sm 
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div
                ref={containerRef}
                className="relative w-full max-w-xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl"
                style={{ maxHeight: '70vh' }}
            >
                {/* Camera Frame */}
                <div className="relative aspect-[4/3]">
                    {capturedPhoto ? (
                        <img
                            src={capturedPhoto}
                            alt="Captured"
                            className="w-full h-full object-cover"
                            style={{ transform: "scaleX(-1)" }}
                        />
                    ) : (
                        <>
                            <video
                                ref={videoRef}
                                className="w-full h-full object-cover"
                                autoPlay
                                playsInline
                                style={{ transform: "scaleX(-1)" }}
                                muted
                            />

                            {cameraState.isLoading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <div className="w-8 h-8 border-4 border-white/60 border-t-white rounded-full animate-spin" />
                                </div>
                            )}

                            {cameraState.error && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <div className="text-white text-center p-4">
                                        <p className="text-red-400 mb-2">Camera Error</p>
                                        <p className="text-sm opacity-80">{cameraState.error}</p>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Controls - Always visible at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between mx-auto max-w-md">
                        <button
                            onClick={onClose}
                            className="p-2 relative group rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            aria-label="Close camera"
                        >
                            <span
                                className="tooltip font-Roboto absolute w-[60px] text-white text-xs bg-black py-2 rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                                style={styles?.tooltip}>
                                Close
                                <div className="tooltip-arrow absolute" style={styles?.arrow}>
                                </div>
                            </span>
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {!capturedPhoto ? (
                            <TooltipButton tooltipText='camera' onClick={handleCapture} disabled={!cameraState.isCameraReady} />
                        ) : (
                            <div className="flex gap-4">
                                <button
                                    onClick={handleRetake}
                                    className=" relative group p-3 rounded-full  duration-300 bg-white/10 hover:bg-white/20 transition-colors"
                                    aria-label="Retake photo"
                                >
                                    <span
                                        className="tooltip font-Roboto absolute w-[100px] text-white text-xs bg-black p-2 rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                                        style={styles?.tooltip}>
                                        Retake photo
                                        <div className="tooltip-arrow absolute" style={styles?.arrow}>
                                        </div>
                                    </span>
                                    <Repeat className="w-6 h-6 text-white" />
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className={`relative group p-3 rounded-full  transition-all duration-300 bg-white/50 cursor-not-allowed'`}
                                    aria-label="Download photo"
                                >
                                    <span
                                        className="tooltip font-Roboto absolute w-[100px] text-white text-xs bg-black p-2 rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                                        style={styles?.tooltip}>
                                        Download
                                        <div className="tooltip-arrow absolute" style={styles?.arrow}>
                                        </div>
                                    </span>
                                    <Download className="w-6 h-6 text-black" />
                                </button>
                                <button
                                    onClick={uploadProfile}
                                    className={`relative group p-3 rounded-full  transition-all duration-300 bg-white cursor-not-allowed'`}
                                    aria-label="Upload photo">
                                    <span
                                        className="tooltip font-Roboto absolute w-[100px] text-white text-xs bg-black p-2 rounded-md group-hover:opacity-100 opacity-0 transition-opacity duration-200"
                                        style={styles?.tooltip}>
                                        Upload
                                        <div className="tooltip-arrow absolute" style={styles?.arrow}>
                                        </div>
                                    </span>
                                    <MdOutlineFileUpload size={25} />
                                </button>
                            </div>
                        )}

                        {/* Spacer to maintain layout balance */}
                        <div className="w-10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernCamera;