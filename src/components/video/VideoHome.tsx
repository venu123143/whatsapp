import React, { useState } from 'react'

const VideoHome = () => {
    const [contactInfo, setContactInfo] = useState(false)
    return (
        <>
            <section className='block sm:grid grid-cols-10 w-full h-screen'>
                <aside className='col-span-3 bg-red-50'>

                </aside>
                <main className='col-span-4 bg-blue-00'>
                    <button className='w-full p-2 border mt-5 hover:shadow-xl transition-all hover:bg-yellow-100  ease-linear shadow-md rounded-sm' onClick={() => setContactInfo(!contactInfo)}>click me</button>
                </main>
                <section className={`sm:col-span-3  bg-yellow-500 flex flex-col  h-screen border-l border-black fixed top-0 right-0 w-full transition-all ease-linear  duration-300 delay-150 ${contactInfo === true ? "-translate-x-0  z-20" : "translate-x-full"}`}>
                    <button className='w-full p-2 border mt-5 hover:shadow-xl transition-all bg-blue-100  ease-linear shadow-md rounded-sm' onClick={() => setContactInfo(!contactInfo)}>click me</button>
                </section>
            </section>

        </>
    )
}

export default React.memo(VideoHome)