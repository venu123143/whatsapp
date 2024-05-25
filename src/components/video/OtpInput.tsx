import { useRef, useEffect } from 'react';

const OtpInput = ({ otp, setOtp, color, activePin }: { otp: string[], setOtp: any, color: string, activePin: boolean }) => {
    const inputRefs = useRef([]) as any;
    useEffect(() => {
        if (activePin === false) {
            setOtp(['', '', '', ''])
            inputRefs.current[0].style.borderColor = '';
            inputRefs.current[1].style.borderColor = '';
            inputRefs.current[2].style.borderColor = '';
            inputRefs.current[3].style.borderColor = '';
        }
    }, [activePin])
    const handleChange = (e: any, index: number) => {
        const { value } = e.target;
        const regex = /^[0-9]*$/;
        if (value === '' || regex.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value.slice(-1);
            setOtp(newOtp);

            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            }
            inputRefs.current[index].style.borderColor = 'green';
        }
    };

    return (
        <div className="flex justify-center">
            {otp.map((value, index) => (
                <input
                    key={index}
                    type="tel"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index]) {
                            inputRefs.current[index - 1]?.focus();
                            inputRefs.current[index].style.borderColor = 'red';
                        }
                    }}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className={`${color} focus:border-blue-500 w-12 h-12 mx-2 text-center text-lg font-semibold border-2  rounded focus:outline-none `}
                />
            ))}
        </div>
    );
};

export default OtpInput;