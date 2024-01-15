import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/store';
interface ShowFullImgProps {
    images: any[];
    index?: number;
}
import { setCurrentImage, setIsFullscreen, setZoomLevel, setCurrentIndex } from '../../Redux/reducers/utils/Features';
const ShowFullImg: React.FC<ShowFullImgProps> = ({ images }) => {
    const { currentImage, isFullscreen, zoomLevel, currentIndex } = useSelector((state: RootState) => state.features)
    const dispatch: AppDispatch = useDispatch()
    // const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // const [isZoomed, setIsZoomed] = useState(false); // Track zoom state

    const handleScroll = useCallback((e: any) => {
        const delta = e.deltaY || e.detail || e.wheelDelta;

        // Zooming
        const newZoomLevel = zoomLevel + (delta > 0 ? -0.3 : 0.3);
        const constrainedZoom = Math.max(0.5, Math.min(newZoomLevel, 3));
        dispatch(setZoomLevel(constrainedZoom))

    }, [dispatch, zoomLevel]);

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [handleScroll]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.buttons === 1) {
            const panDistance = 30;
            // Get the window dimensions
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            // Calculate the maximum allowed x and y positions
            const maxX = windowWidth / 2 - (windowWidth / 2) / zoomLevel;
            const maxY = windowHeight / 2 - (windowHeight / 2) / zoomLevel;
            // setPosition((prevPosition) => ({
            //     x: prevPosition.x + e.movementX * panDistance / zoomLevel,
            //     y: prevPosition.y + e.movementY * panDistance / zoomLevel,
            // }));
            setPosition((prevPosition) => ({
                x: Math.max(-maxX, Math.min(maxX, prevPosition.x + e.movementX * panDistance / zoomLevel)),
                y: Math.max(-maxY, Math.min(maxY, prevPosition.y + e.movementY * panDistance / zoomLevel)),
            }));
        }
    }, [setPosition, zoomLevel]);

    const closeFullscreen = () => {
        dispatch(setCurrentImage(null))
        dispatch(setIsFullscreen(false))
        setPosition({ x: 0, y: 0 })
        setCurrentIndex(null);
        // setIsZoomed(false);
    };

    const nextImage = () => {
        if (currentIndex !== null && currentIndex < images.length - 1) {
            setPosition({ x: 0, y: 0 })
            dispatch(setZoomLevel(1))

            dispatch(setCurrentIndex(currentIndex + 1))
            dispatch(setCurrentImage(images[currentIndex + 1]))

            // setIsZoomed(false);
        } else if (currentIndex! >= images.length - 1) {
            setPosition({ x: 0, y: 0 })
            dispatch(setIsFullscreen(false))
        }
    };

    const prevImage = () => {
        if (currentIndex !== null && currentIndex > 0) {
            setPosition({ x: 0, y: 0 })
            dispatch(setZoomLevel(1))
            dispatch(setCurrentIndex(currentIndex - 1))

            // setCurrentImage(URL.createObjectURL(images[currentIndex - 1]));
            dispatch(setCurrentImage(images[currentIndex - 1]))
            // setIsZoomed(false); // Reset zoom state when changing images
        } else if (currentIndex! <= 0) {
            setPosition({ x: 0, y: 0 })
            dispatch(setIsFullscreen(false));
        }
    };

    return (
        <div>
            <div className={`transition-all  fullscreen-overlay ${isFullscreen ? "active" : ""}`}>
                <div
                    className={`fullscreen-modal overflow-hidden relative`}>
                    <img onMouseMove={handleMouseMove}
                        src={currentImage}
                        alt={`Image ${currentIndex! + 1}`}
                        style={{
                            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                        }}
                        className={`fullscreen-image cursor-move}`}
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