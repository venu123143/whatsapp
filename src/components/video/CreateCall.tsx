import React, { useState, CSSProperties } from 'react'
import CustomInput from '../cards/CustomInput'
import ToggleSwitch from '../cards/ToggleSwitch'
import Button from '../cards/Button'
import OtpInput from './OtpInput'
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Redux/store';
import { setCallStart, setErrors } from "../../Redux/reducers/Calls/CallsReducer"
import { RingLoader } from 'react-spinners'
const baseSchema = {
    title: Yup.string()
};
const otpSchema = {
    otp: Yup.array()
        .of(
            Yup.string().matches(/^\d{1}$/, 'Each OTP field must be a single digit')
        )
        .required('OTP is required')
        .min(4, 'OTP must have 4 digits')
        .max(4, 'OTP must have 4 digits'),
};
const cssOverride: CSSProperties = {
}
const CreateCall = () => {
    const dispatch: AppDispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { activePin, errors } = useSelector((state: RootState) => state.calls)
    const [otp, setOtp] = useState(['', '', '', '']);
    const [buttonText, setButtonText] = useState('Start Call');
    const [title, setTitle] = useState("")
    const validationSchema = Yup.object().shape(
        activePin ? { ...baseSchema, ...otpSchema } : baseSchema
    );
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await validationSchema.validate({ title, otp, activePin }, { abortEarly: false })
            setIsLoading(true)
            dispatch(setErrors({}))
            setTimeout(() => {
                dispatch(setCallStart(true))
            }, 3000)
            setButtonText('Starting...')
        } catch (error: any) {
            if (error.errors.length > 0) {
                dispatch(setErrors({ otp: 'must fill otp' }))
            }
        }

        // .then(() => {
        //     console.log(title)
        // })
        // .catch(err => {
        // });
    }

    return (
        <section className=' w-full px-5'>
            <form onSubmit={handleSubmit} className=' space-y-3 p-2 bg-white border-black shadow-lg border rounded-md'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-[500] text-[1.2rem] font-Rubik'>Start Your Call</h1>
                </div>
                <CustomInput onChange={(e) => title.length <= 100 ? setTitle(e.target.value) : setTitle('')} value={title} color={'focus:border-teal-500'} label='Call Title' />
                <div className='flex justify-between items-center'>
                    <span className='font-light text-[1rem] font-Rubik fir'>Do you want to set pin ? </span>
                    <ToggleSwitch />
                </div>
                <div className={`transition-all  ${activePin ? "visible " : "invisible"}`}>
                    <OtpInput activePin={activePin} color={errors.otp ? 'border-red-500' : 'border-gray-400'} otp={otp} setOtp={setOtp} />
                </div>
                <div className='flex justify-center items-center'>
                    <Button isLoading={isLoading} text={buttonText} type="submit" />
                </div>
            </form>
            <div onClick={() => { setIsLoading(false); setButtonText('Start Call'); }} className={`${isLoading === true ? "fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-70 w-full h-screen z-40" : "hidden"} `}>
                <RingLoader
                    color="#36d7b7"
                    size={500}
                    cssOverride={cssOverride}
                    loading={true}
                    aria-label="Loading Spinner"
                    speedMultiplier={.51}
                    data-testid="loader"
                />
            </div>
        </section>
    )
}

export default React.memo(CreateCall)

