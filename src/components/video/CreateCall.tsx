import React, { useState } from 'react'
import CustomInput from '../cards/CustomInput'
import ToggleSwitch from '../cards/ToggleSwitch'
import Button from '../cards/Button'
import OtpInput from './OtpInput'


const CreateCall = () => {
    const [checked, setChecked] = useState(false);

    return (
        <section className=' w-full p-5'>
            <div className='space-y-3 p-2 bg-white border-black shadow-lg border rounded-md'>
                <div className='flex justify-center items-center'>
                    <h1 className='font-[500] text-[1.2rem] font-Rubik'>Start Your Call</h1>
                </div>
                <CustomInput color='focus:border-teal-500' label='Call Title' />
                <div className='flex justify-between items-center'>
                    <span className='font-light text-[1rem] font-Rubik fir'>Do you want to set pin ?</span>
                    <ToggleSwitch checked={checked} setChecked={setChecked} />
                </div>
                <div className={`transition-all  ${checked ? "visible " : "invisible"}`}>
                    <OtpInput />
                </div>
                <div className='flex justify-center items-center'>
                    <Button />
                    {/* <button className='px-3 py-2 border shadow-lg transition-all'>Create Call</button> */}
                </div>
            </div>
        </section>
    )
}

export default React.memo(CreateCall)

