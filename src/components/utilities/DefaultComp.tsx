
import sample from "../../assets/default.png"

const DefaultComp = () => {
    return (
        <div className='hidden sm:flex gap-y-8 flex-col h-full m-auto items-center justify-center bg-[#202c33]'>
            <div>
                <img src={sample} alt="sample img" className='object-cover max-w-[330px]' />
            </div>
            <div>
                <h3 className='text-[28px] font-sans  text-[#e9edef] text-center'>Download Whatsapp for Windows</h3>
                <p className='text-[#8696a0] text-[1rem] text-center m-auto max-w-[80%]'>Make calls, share your screen and get a faster experience when you download the Windows app.</p>
            </div>
            <div>
                <button type="submit" className="bg-[#00a884] shadow-xl transition-all border-black border  button my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                    Get the App
                </button>
            </div>
        </div>
    )
}

export default DefaultComp