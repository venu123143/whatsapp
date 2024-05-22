import React from 'react'
import CustomInput from '../cards/CustomInput'
import ToggleSwitch from '../cards/ToggleSwitch'


const CreateCall = () => {
    return (
        <section className='bg-[#0a101d4] w-full h-screen p-5'>
            <div className='space-y-3'>
                <CustomInput color='border-teal-500' label='Call Title' />

                <ToggleSwitch />
            </div>
        </section>
    )
}

export default React.memo(CreateCall)