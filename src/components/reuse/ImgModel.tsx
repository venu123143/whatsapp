// src/components/ImageModal.tsx
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { setCurrentImage, setIsFullscreen, setZoomLevel, setCurrentIndex } from '../../Redux/reducers/utils/Features';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
import { RxCross2 } from 'react-icons/rx';

interface ImageModalProps {
    imageUrl: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    const { isFullscreen, currentIndex, images } = useSelector((state: RootState) => state.features)
    const dispatch: AppDispatch = useDispatch()

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    const nextImage = () => {
        if (currentIndex !== null && currentIndex < images.length - 1) {
            dispatch(setZoomLevel(1))
            dispatch(setCurrentIndex(currentIndex + 1))
            dispatch(setCurrentImage(images[currentIndex + 1].file))

        } else if (currentIndex! >= images.length - 1) {
            dispatch(setIsFullscreen(false))
        }
    };

    const prevImage = () => {
        if (currentIndex !== null && currentIndex > 0) {
            dispatch(setZoomLevel(1))
            dispatch(setCurrentIndex(currentIndex - 1))

            // setCurrentImage(URL.createObjectURL(images[currentIndex - 1]));
            dispatch(setCurrentImage(images[currentIndex - 1].file))
            // setIsZoomed(false); // Reset zoom state when changing images
        } else if (currentIndex! <= 0) {
            dispatch(setIsFullscreen(false));
        }
    };
    return (
        <div className={`${isFullscreen ? "z-10 scale-100 fixed" : "z-0 scale-0"} transition-all  ease-in-out inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50`}
            onClick={handleOverlayClick}>
            <button className="prev-button  hover:bg-gray-600 rounded-full transform -translate-y-1/2 text-white text-2xl p-2" onClick={prevImage}>
                <FaArrowLeft />
            </button>
            <div className=" max-w-3xl my-auto w-full mx-4">
                <img src={imageUrl} alt="Selected" className="max-h-screen w-full object-contain" />
            </div>
            <button className="next-button  hover:bg-gray-600 rounded-full transform -translate-y-1/2 text-white text-2xl p-2" onClick={nextImage}>
                <FaArrowRight />
            </button>
            <button className="close-button  p-2 hover:bg-gray-600 rounded-full text-white text-2xl" onClick={onClose}>
                <RxCross2 size={25} />
            </button>
        </div>
    );
};

export default ImageModal;
