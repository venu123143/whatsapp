import React from 'react';
import { FaCamera } from 'react-icons/fa';

interface TooltipStyles {
    tooltip: React.CSSProperties;
    arrow: React.CSSProperties;
}

interface TooltipButtonProps {
    tooltipText: string;
    tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
    onClick: () => void;
    disabled: boolean;
}

export const getTooltipStyle = (position: string = 'top') => {
    switch (position) {
        case 'top':
            return {
                tooltip: {
                    bottom: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)'
                },
                arrow: {
                    bottom: '-5px',
                    left: '50%',
                    marginLeft: '-5px',
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '5px solid #000'
                }
            };
        case 'right':
            return {
                tooltip: {
                    top: '50%',
                    left: 'calc(100% + 10px)',
                    transform: 'translateY(-50%)'
                },
                arrow: {
                    top: '50%',
                    left: '-5px',
                    marginTop: '-5px',
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderRight: '5px solid #000'
                }
            };
        case 'bottom':
            return {
                tooltip: {
                    top: 'calc(100% + 10px)',
                    left: '50%',
                    transform: 'translateX(-50%)'
                },
                arrow: {
                    top: '-5px',
                    left: '50%',
                    marginLeft: '-5px',
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderBottom: '5px solid #000'
                }
            };
        case 'left':
            return {
                tooltip: {
                    top: '50%',
                    right: 'calc(100% + 10px)',
                    transform: 'translateY(-50%)'
                },
                arrow: {
                    top: '50%',
                    right: '-5px',
                    marginTop: '-5px',
                    borderTop: '5px solid transparent',
                    borderBottom: '5px solid transparent',
                    borderLeft: '5px solid #000'
                }
            };
        default:
    }
};

const TooltipButton: React.FC<TooltipButtonProps> = ({ tooltipText, tooltipPosition = 'top', onClick, disabled }) => {
    const tooltipStyle = getTooltipStyle(tooltipPosition) as TooltipStyles;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative p-4 rounded-full transition-all duration-300 group ${disabled ? 'bg-white/50 cursor-not-allowed' : 'bg-white hover:bg-white/90'
                }`}
            aria-label="Take photo"
        >
            <FaCamera className="w-6 h-6 text-black" />

            {/* Tooltip */}
            <span
                className="tooltip font-Roboto absolute text-white text-sm bg-black p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={tooltipStyle.tooltip}
            >
                {tooltipText}
                <div
                    className="tooltip-arrow absolute"
                    style={tooltipStyle.arrow}
                ></div>
            </span>
        </button>
    );
};

export default TooltipButton;
