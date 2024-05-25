import React, { useEffect, useState } from 'react'
import CustomInput from '../cards/CustomInput'
import ToggleSwitch from '../cards/ToggleSwitch'
import Button from '../cards/Button'
import OtpInput from './OtpInput'
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Redux/store';
import { useNavigate } from 'react-router-dom'
import { setErrors, setActivePin } from "../../Redux/reducers/Calls/CallsReducer"
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
const CreateCall = () => {
    const dispatch: AppDispatch = useDispatch()
    const { activePin, errors } = useSelector((state: RootState) => state.calls)

    const [otp, setOtp] = useState(['', '', '', '']);
    const [title, setTitle] = useState("")
    const validationSchema = Yup.object().shape(
        activePin ? { ...baseSchema, ...otpSchema } : baseSchema
    );
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validationSchema.validate({ title, otp, activePin }, { abortEarly: false })
            .then(() => {
                dispatch(setErrors({}))
            })
            .catch(err => {
                if (err.errors.length > 0) {
                    dispatch(setErrors({ otp: 'must fill otp' }))

                }
            });


    }

    return (
        <section className=' w-full p-5'>
            <form onSubmit={handleSubmit} className='space-y-3 p-2 bg-white border-black shadow-lg border rounded-md'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-[500] text-[1.2rem] font-Rubik'>Start Your Call</h1>
                </div>
                <CustomInput onChange={(e) => setTitle(e.target.value)} value={title} color={'focus:border-teal-500'} label='Call Title' />
                <div className='flex justify-between items-center'>
                    <span className='font-light text-[1rem] font-Rubik fir'>Do you want to set pin ?</span>
                    <ToggleSwitch />
                </div>
                <div className={`transition-all  ${activePin ? "visible " : "invisible"}`}>
                    <OtpInput activePin={activePin} color={errors.otp ? 'border-red-500' : 'border-gray-400'} otp={otp} setOtp={setOtp} />
                </div>
                <div className='flex justify-center items-center'>
                    <Button type="submit" />
                </div>
            </form>
        </section>
    )
}

export default React.memo(CreateCall)

