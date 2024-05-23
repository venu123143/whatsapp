import { useState, useRef } from 'react';

const OtpInput = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]) as any;

    const handleChange = (e: any, index: number) => {
        const { value } = e.target;
        const regex = /^[0-9]*$/; 

        // Check if the input value matches the regex or if the backspace key was pressed
        if (value === '' || regex.test(value) || (value === '' && e.key === 'Backspace')) {
            const newOtp = [...otp];

            // If the backspace key was pressed and the current field is empty,
            // move the focus to the previous input field and clear its value
            if (value === '' && e.key === 'Backspace' && index > 0) {
                newOtp[index - 1] = '';
                setOtp(newOtp);
                inputRefs.current[index - 1].focus();
            } else {
                // Update the OTP array with the new value
                newOtp[index] = value.slice(-1);
                setOtp(newOtp);

                // Move focus to the next input field
                if (value && index < inputRefs.current.length - 1) {
                    inputRefs.current[index + 1].focus();
                }
            }
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
                            // Move focus to the previous input field on backspace
                            inputRefs.current[index - 1]?.focus();
                        }
                    }}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className="w-12 h-12 mx-2 text-center text-lg font-semibold border-2 border-gray-400 rounded focus:outline-none focus:border-blue-500"
                />
            ))}
        </div>
    );
};

export default OtpInput;