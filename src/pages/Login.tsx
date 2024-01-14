// import React from 'react'

import { useEffect, useState } from "react";
import LoginWithOtp from "../components/utilities/LoginWithOtp"
import { backgroundImages } from "../static/Static"
import { useNavigate } from "react-router-dom";
import {  RootState } from "../Redux/store"
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
    <section className="w-full h-screen grid grid-cols-3 ">
      <div className="col-span-2 shadow-lg">
        <div className="col-span-2 w-full h-full border-r-2 border-black shadowImg" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        </div>
      </div>
      <div className="col-span-1 header-bg border-l-2 border-black shadow-2xl">
        <LoginWithOtp />
      </div>
    </section>
  )
}

export default Login