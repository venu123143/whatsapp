// import React from 'react'

import { useEffect, useState } from "react";
import LoginWithOtp from "../components/utilities/LoginWithOtp"
import { backgroundImages } from "../static/Static"
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/store"
import { useSelector } from "react-redux";
const Login = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const { user, isLoading, isError, isSuccess } = useSelector((state: RootState) => state.auth)

  const navigate = useNavigate()
  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }
  }, [user, isLoading, isError, isSuccess])
  useEffect(() => {
    // Function to generate or select a random background image URL
    const getRandomBackgroundImage = () => {
      const imageUrls = backgroundImages
      const randomIndex = Math.floor(Math.random() * imageUrls.length);
      return imageUrls[randomIndex];
    };
    setBackgroundImage(getRandomBackgroundImage());
  }, []);
  return (
    <section className="w-full overflow-hidden  h-screen grid md:grid-cols-3 ">
      <div className="hidden md:block md:col-span-2 shadow-lg">
        <div className="col-span-2 w-full h-full border-r-2 border-black shadowImg" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
      </div>
      <div className="md:col-span-1 w-full header-bg border-l-2 border-black shadow-2xl">
        <LoginWithOtp />
      </div>
    </section>
  )
}

export default Login