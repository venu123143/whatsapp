
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import { AppDispatch, RootState } from '../../Redux/store';
import {
    setCurrentImage,
    setIsFullscreen,
    setZoomLevel,
    setCurrentIndex
} from '../../Redux/reducers/utils/Features';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    const { isFullscreen, currentIndex, images } = useSelector((state: RootState) => state.features);
    const dispatch: AppDispatch = useDispatch();
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isFullscreen) {
                switch (e.key) {
                    case 'ArrowLeft':
                        prevImage();
                        break;
                    case 'ArrowRight':
                        nextImage();
                        break;
                    case 'Escape':
                        setPosition({ x: 0, y: 0 });
                        onClose();
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFullscreen, currentIndex, images]);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setPosition({ x: 0, y: 0 });
            onClose();
        }
    };

    const nextImage = () => {
        if (currentIndex !== null && currentIndex < images.length - 1) {
            setPosition({ x: 0, y: 0 }); // Reset position when changing images
            dispatch(setZoomLevel(1));
            dispatch(setCurrentIndex(currentIndex + 1));
            dispatch(setCurrentImage(images[currentIndex + 1].file));
        } else if (currentIndex! >= images.length - 1) {
            dispatch(setIsFullscreen(false));
        }
    };

    const prevImage = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setPosition({ x: 0, y: 0 }); // Reset position when changing images
            dispatch(setZoomLevel(1));
            dispatch(setCurrentIndex(currentIndex - 1));
            dispatch(setCurrentImage(images[currentIndex - 1].file));
        } else if (currentIndex! <= 0) {
            dispatch(setIsFullscreen(false));
        }
    };

    const handleDrag = (_: any, ui: any) => {
        const { x, y } = ui;
        setPosition({ x, y });
    };

    return (
        <div
            className={`${isFullscreen ? "z-10 scale-100 fixed" : "z-0 scale-0"
                } transition-all ease-in-out inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50`}
            onClick={handleOverlayClick}
        >
            <Draggable position={position} onDrag={handleDrag}>
                <div className="max-w-3xl w-fit cursor-move">
                    <img src={imageUrl} alt="Selected" className="max-h-screen w-full object-contain" />
                </div>
            </Draggable>
            <button
                className="prev-button bg-black hover:bg-gray-600 rounded-full transform -translate-y-1/2 text-white text-2xl p-2"
                onClick={prevImage}
            >
                <FaArrowLeft title='left (left arrow)' />
            </button>
            <button
                className="next-button bg-black hover:bg-gray-600 rounded-full transform -translate-y-1/2 text-white text-2xl p-2"
                onClick={nextImage}
            >
                <FaArrowRight title='right (right arrow)' />
            </button>
            <button
                className="close-button p-2 hover:bg-gray-600 rounded-full text-white text-2xl"
                onClick={onClose}
            >
                <RxCross2 title='cancel (esc)' size={25} />
            </button>
        </div>
    );
};

export default ImageModal;