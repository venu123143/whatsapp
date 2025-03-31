import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, ChevronLeft, ChevronRight, Image as ImageIcon, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Status {
    id: number;
    name: string;
    timestamp: string;
    isMyStatus?: boolean;
    isViewed?: boolean;
    images: string[];
}

interface StatusViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    status: Status | null;
}

interface StatusViewProps { }

const StatusViewerModal: React.FC<StatusViewerModalProps> = ({ isOpen, onClose, status }) => {
    const DURATION = 10; // Total duration in seconds
    const [timeLeft, setTimeLeft] = useState<number>(DURATION);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());

    const modalRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<any>(null);
    const transitioningRef = useRef<boolean>(false);

    useEffect(() => {
        if (isOpen && status) {
            setTimeLeft(DURATION);
            setCurrentImageIndex(0);
            setCompletedIndices(new Set());
            startImageTimer();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isOpen, status]);

    const startImageTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                const newTime = prev - 0.1;
                if (newTime <= 0) {
                    handleNextImage();
                    return DURATION;
                }
                return newTime;
            });
        }, 100);
    };
    const getProgress = () => {
        return ((DURATION - timeLeft) / DURATION) * 100;
    };
    const completeCurrentStatus = () => {
        setCompletedIndices(prev => new Set([...prev, currentImageIndex]));
    };
    const handleNextImage = () => {
        if (!status || transitioningRef.current) return;

        transitioningRef.current = true;
        completeCurrentStatus();

        if (currentImageIndex < status.images.length - 1) {
            setCurrentImageIndex(prev => prev + 1);
            setTimeLeft(DURATION);
            startImageTimer();
        } else {
            onClose();
        }

        setTimeout(() => {
            transitioningRef.current = false;
        }, 300);
    };

    const handlePrevImage = () => {
        if (!status || transitioningRef.current) return;

        transitioningRef.current = true;

        if (currentImageIndex > 0) {
            setCurrentImageIndex(prev => prev - 1);
            setTimeLeft(DURATION);
            startImageTimer();
        }

        setTimeout(() => {
            transitioningRef.current = false;
        }, 300);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') handleNextImage();
        if (e.key === 'ArrowLeft') handlePrevImage();
        if (e.key === 'Escape') onClose();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentImageIndex]);

    if (!isOpen || !status) return null;
    const getProgressBarColor = (index: number) => {
        if (completedIndices.has(index)) return '#00a884'; // Green color for completed
        return 'white'; // White for current progress
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full h-full md:w-[90%] md:h-[90%] relative bg-gray-900 flex flex-col"
            >
                {/* Progress Bars */}
                <div className="absolute inset-x-0 top-4 left-4 right-4 flex space-x-1 z-20">
                    {status.images.map((_, index) => (
                        <div key={index} className="flex-1 h-1 bg-gray-600/50 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white"
                                initial={false}
                                style={{
                                    backgroundColor: getProgressBarColor(index)
                                }}
                                animate={{
                                    width: `${index < currentImageIndex || completedIndices.has(index) ? 100 :
                                        index === currentImageIndex ? getProgress() : 0}%`
                                }}
                                transition={{ duration: 0.1, ease: "linear" }}
                            />
                        </div>
                    ))}
                </div>

                {/* Timer */}
                <div className="absolute top-8 right-4 text-white text-sm z-20 font-medium">
                    {Math.ceil(timeLeft)}s
                </div>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-8 left-4 text-white/90 hover:text-white transition-colors z-20 p-2 rounded-full hover:bg-white/10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="absolute top-16 left-4 right-4 flex items-center space-x-3 z-20">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center ring-2 ring-white/10"
                    >
                        <span className="text-white text-xl font-medium">{status.name[0]}</span>
                    </motion.div>
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                    >
                        <h3 className="text-white font-semibold">{status.name}</h3>
                        <p className="text-gray-400 text-sm">{status.timestamp}</p>
                    </motion.div>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-20">
                    {currentImageIndex > 0 && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevImage();
                            }}
                            className="text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors transform hover:scale-105"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                    )}
                    {currentImageIndex < status.images.length - 1 && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNextImage();
                            }}
                            className="text-white p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors transform hover:scale-105 ml-auto"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    )}
                </div>

                {/* Images */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="w-full h-full flex items-center justify-center p-4"
                    >
                        <img
                            src={status.images[currentImageIndex]}
                            alt={`Status ${currentImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onLoad={() => {
                                setTimeLeft(10);
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </motion.div>

    );
};

const StatusView: React.FC<StatusViewProps> = () => {
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [statuses] = useState<Status[]>([
        {
            id: 1,
            name: 'My Status',
            timestamp: 'Tap to add status update',
            isMyStatus: true,
            images: [
                "https://miro.medium.com/v2/resize:fit:720/format:webp/0*EnfvGEllIYzq6As9",
                "https://cdn.pixabay.com/photo/2021/05/24/17/07/whatsapp-6279868_1280.png",
                "https://www.meupositivo.com.br/doseujeito/wp-content/uploads/2021/03/webwhatsapp.jpg",
                "https://cdn.pixabay.com/photo/2016/04/27/20/39/whatsapp-1357489_1280.jpg",
                "https://cdn.pixabay.com/photo/2016/11/21/08/44/whatsapp-1844471_1280.png",
            ]
        },
        {
            id: 2,
            name: 'John Doe',
            timestamp: '2 minutes ago',
            isViewed: false,
            images: [
                "https://images.unsplash.com/photo-1636751364472-12bfad09b451?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://cdn.pixabay.com/photo/2023/03/18/17/48/basset-hound-7861037_1280.jpg",
                "https://cdn.pixabay.com/photo/2024/09/30/15/37/halloween-9086123_1280.jpg"
            ]
        },
        {
            id: 3,
            name: 'Jane Smith',
            timestamp: '23 minutes ago',
            isViewed: true,
            images: [
                "https://images.unsplash.com/photo-1636751364472-12bfad09b451?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "https://cdn.pixabay.com/photo/2023/03/18/17/48/basset-hound-7861037_1280.jpg",
                "https://cdn.pixabay.com/photo/2024/09/30/15/37/halloween-9086123_1280.jpg"
            ]
        }
    ]);

    const handleStatusClick = (status: Status) => {
        setSelectedStatus(status);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedStatus(null);
        }, 300);
    };

    const handleAddStatus = () => {
        // Implement status adding functionality
        console.log('Add status clicked');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-900">
            {/* Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-800 text-white p-4 shadow-lg flex items-center justify-between"
            >
                <h1 className="text-xl font-semibold">Status</h1>
                <button
                    onClick={handleAddStatus}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors"
                >
                    <Camera className="w-6 h-6" />
                </button>
            </motion.div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* My Status */}
                <div
                    className="p-4 border-b border-gray-700/50"
                >
                    <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => handleStatusClick(statuses[0])}
                    >
                        <div className="relative">
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center ring-2 ring-green-500">
                                <Plus className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">My Status</h3>
                            <p className="text-gray-400 text-sm">Tap to add status update</p>
                        </div>
                    </div>
                </div>

                {/* Recent Updates */}
                <div className="mt-4">
                    <div className="px-4 py-2 text-sm text-gray-400 font-medium">Recent updates</div>
                    {statuses.filter(status => !status.isMyStatus).map((status, index) => (
                        <motion.div
                            key={status.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-3 border-b border-gray-700/50 cursor-pointer hover:bg-gray-800/50 transition-colors"
                            onClick={() => handleStatusClick(status)}
                        >
                            <motion.div
                                className="flex items-center space-x-3"
                                whileHover={{ x: 5 }}
                            >
                                <div className="relative">
                                    <div className={`w-12 h-12 rounded-full border-2 ${status.isViewed ? 'border-gray-500' : 'border-green-500'
                                        } flex items-center justify-center bg-gray-700 overflow-hidden`}>
                                        {status.images[0] ? (
                                            <img
                                                src={status.images[0]}
                                                alt={status.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">{status.name}</h3>
                                    <p className="text-gray-400 text-sm">{status.timestamp}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <StatusViewerModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        status={selectedStatus}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default StatusView;