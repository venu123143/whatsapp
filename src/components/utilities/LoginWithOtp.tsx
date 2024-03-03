// import React from 'react'
import { useState, useRef, useEffect, CSSProperties } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BarLoader } from "react-spinners"
import { AppDispatch, RootState } from "../../Redux/store"
import { array, object, string } from "yup"
import { useFormik } from "formik"
import { sendOtp, VerifyOtp } from "../../Redux/reducers/Auth/AuthReducer"

let otpValid = object({
    otp: array().of(string().required("Please enter the otp"))
})

let otpSchema = object({
    mobile: string()
        .matches(/^[6-9]\d{9}$/, 'Enter a Valid Mobile Number')
        .required('mobile is required'),
})
const LoginWithOtp = () => {
    const [SendOtp, setSendOtp] = useState(false)
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
    const codesRef = useRef<any>([]);
    const { isLoading } = useSelector((state: RootState) => state.auth)
    const dispatch: AppDispatch = useDispatch()
    const [err, setErr] = useState("")

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        width: 380,
        borderRadius: "30px",
        zIndex: 20,
    };
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const newOtp: string[] = [...otp]
        newOtp[index] = e.target.value
        setOtp(newOtp)
    }

    useEffect(() => {
        // codesRef.current[0]?.focus();
        codesRef.current.forEach((code: any, idx: any) => {
            code?.addEventListener('keydown', (e: any) => {
                if (e.key >= '0' && e.key <= '9') {
                    codesRef.current[idx].value = '';
                    setTimeout(() => codesRef.current[idx + 1]?.focus(), 10);

                } else if (e.key === 'Backspace') {
                    setTimeout(() => codesRef.current[idx - 1]?.focus(), 10);
                } else {
                    e.preventDefault();
                    handleVerifyOtp(e);
                }
            });
        });
    }, [otp, SendOtp]);

    const formik = useFormik({
        initialValues: {
            mobile: '',
        },
        validationSchema: otpSchema,
        onSubmit: (values) => {
            dispatch(sendOtp(values.mobile))
            setSendOtp(true)
            // formik.resetForm()
        },
    });

    const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check if all fields are filled
        const isAllFieldsFilled = otp.every(value => value.trim() !== "");

        if (!isAllFieldsFilled) {
            setErr("Please Enter Correct Otp");
            return;
        }
        try {
            await otpValid.validate({ otp }, { abortEarly: false });
            dispatch(VerifyOtp({ mobile: formik.values.mobile, otp }))
            setErr("")
        } catch (error: any) {
            setErr(error.errors[0])
        }
    }

    return (
        <section className=" w-full relative group">
            {/* <Link to="/" className="absolute top-2 left-2 text-[#777777] flex items-center hover:text-black dark:hover:text-white">
                <BsArrowLeftShort size={28} className="inline" />
                <button>back to home</button>
            </Link> */}
            <div className="flex justify-center items-center h-screen 400px:mx-5 py-5">
                <div className=" w-full  flex justify-center">
                    <div className=" w-full bg-gradient-to-r from-[#009de2] to-[#00a884] rounded-lg shadow-lg border m   x-2 400px:mx-0 md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <BarLoader
                            color="#361AE3"
                            loading={isLoading}
                            cssOverride={override}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                        <div className={`${isLoading === true ? "block absolute z-10 top-0 left-0 right-0 bottom-0 bg-black opacity-50 group:pointer-events-none overflow-hidden " : "hidden"}`}></div>

                        <div className="p-6 space-y-4  sm:p-8">
                            {
                                SendOtp === true ? (
                                    <>
                                        <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Enter Your Otp
                                        </h1>
                                        <form onSubmit={handleVerifyOtp}>
                                            <div className="flex flex-col">
                                                <span className="text-red-500 text-center font-[450]">{err !== "" ? err : null}</span>
                                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                                                    {otp.map((_, idx) => (
                                                        <div key={idx} className="w-10 h-10 ">
                                                            <input
                                                                className="codes w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-lg border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                                                maxLength={1} onChange={(e) => { handleOnChange(e, idx) }} value={otp[idx]} type="tel" ref={(el) => (codesRef.current[idx] = el)} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="bg-[#00a884] shadow-xl hover:scale-105 transition-all border-black border hover:border-2 button my-[10px] text-white text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                                                    Submit
                                                </button> <br />
                                                <button onClick={() => setSendOtp(false)} className="hover:underline dark:text-white my-[10px] text-[0.91rem] px-[25px] py-[6px] rounded-[25px]">
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h1 className="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            Login With Otp
                                        </h1>
                                        <form onSubmit={formik.handleSubmit} className="space-y-2   md:space-y-4" action="#">
                                            <div className="w-72">
                                                <div className="relative w-full min-w-[200px] h-10">
                                                    <input
                                                        maxLength={10}
                                                        id="otpmobile"
                                                        onChange={formik.handleChange("mobile")}
                                                        onBlur={formik.handleBlur("mobile")}
                                                        value={formik.values.mobile}
                                                        type="tel"
                                                        name="mobile"
                                                        className="peer w-full h-full text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[14px] before:content[' '] before:block before:box-border 
                                                        before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 
                                                        peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                                                    >
                                                        Phone No(+91)
                                                    </label>
                                                </div>
                                                {formik.touched.mobile && formik.errors.mobile ? (
                                                    <div className="text-[#000000] font-bold text-[1rem] "> *  {formik.errors.mobile}</div>
                                                ) : null}
                                            </div>
                                            <div className="flex justify-evenly">
                                                <button type="submit" className="bg-[#00a884] shadow-xl hover:scale-105 transition-all border-black border-2 font-[550] w-full rounded-md my-[10px] text-[0.91rem] px-[25px] py-[6px]">
                                                    Get Otp
                                                </button>
                                            </div>
                                        </form>

                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default LoginWithOtp