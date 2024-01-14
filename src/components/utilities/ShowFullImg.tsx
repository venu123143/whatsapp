import React, { useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
interface ShowFullImgProps {
    images: any[];
    index: number;
    handleSetImage: (index: number) => void;
}

const ShowFullImg: React.FC<ShowFullImgProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [isZoomed, setIsZoomed] = useState(false); // Track zoom state
    const [zoomLevel, setZoomLevel] = useState(1);
    console.log(zoomLevel);

    useEffect(() => {
        const handleScroll = (e: any) => {
            if (isZoomed) {
                const delta = e.deltaY || e.detail || e.wheelDelta;

                // Increase or decrease zoom level based on scroll direction
                setZoomLevel((prevZoom) => (delta > 0 ? prevZoom - 0.1 : prevZoom + 0.1));
            }
        };

        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [isZoomed]);
    const closeFullscreen = () => {
        setCurrentIndex(null);
        setIsFullscreen(false);
        setCurrentImage(null);
        setIsZoomed(false);
    };

    const nextImage = () => {
        if (currentIndex !== null && currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCurrentImage(images[currentIndex + 1]);
            setIsZoomed(false); // Reset zoom state when changing images
        } else if (currentIndex !== null && currentIndex >= images.length - 1) {
            setIsFullscreen(false);
        }
    };

    const prevImage = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            // setCurrentImage(URL.createObjectURL(images[currentIndex - 1]));
            setCurrentImage(images[currentIndex - 1]);
            setIsZoomed(false); // Reset zoom state when changing images
        } else if (currentIndex !== null && currentIndex <= 0) {
            setIsFullscreen(false);
        }
    };

    // const handleSetImage = (index: number) => {
    //     setCurrentIndex(index);
    //     setIsFullscreen(true);
    //     // setCurrentImage(URL.createObjectURL(images[index]));
    //     setCurrentImage(images[index]);
    // };
    const toggleZoom = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state
    };
    return (
        <div>
            <div className={`fullscreen-overlay ${isFullscreen ? "active" : ""}`}>
                <div
                    className={`fullscreen-modal overflow-hidden relative`}>
                    <img
                        src={currentImage}
                        alt={`Image ${currentIndex! + 1}`}
                        onClick={toggleZoom}
                        className={`fullscreen-image ${isZoomed
                            ? `hover:scale-125 duration-500 transition-all scroll-smooth cursor-move `
                            : "scale-100 duration-500 transition-all"
                            }`}
                    />
                    <span
                        className="close-button p-2 hover:bg-gray-600 rounded-full"
                        onClick={closeFullscreen}
                    >
                        <RxCross2 size={25} />
                    </span>
                    <span
                        className="prev-button p-2 hover:bg-gray-600 rounded-full"
                        onClick={prevImage}
                    >
                        <AiOutlineLeft size={25} />
                    </span>
                    <span
                        className="next-button p-2 hover:bg-gray-600 rounded-full"
                        onClick={nextImage}
                    >
                        <AiOutlineRight size={25} />
                    </span>
                </div>
            </div>

        </div>
    )
}

export default ShowFullImg