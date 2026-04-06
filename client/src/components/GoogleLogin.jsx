import React from 'react'
import googleButtton from '../assets/web_dark_rd_ctn.svg'
import { useGoogleLogin } from '@react-oauth/google'
import { useGoogleAuthMutation } from '../features/api/authApi'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const GoogleLogin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { setUser } = useAuth()

    const from = location.state?.from || "/";

  const [googleAuth, { data, isSuccess, error }] = useGoogleAuthMutation()
   

    const responseGoogle = async (authRes) => {
      try {
        if(authRes['code']){
          const result = await googleAuth(authRes['code']).unwrap()
          const { email, name, image } = result.data.user
          console.log("Google login successful:", { email, name, image });
        }
      } catch (error) {
        console.error("Google login error:", error);
      }
    }
   

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    })

    useEffect(()=>{
          if(isSuccess && data?.user){
            toast.success(data?.message || "Logged in with Google successfully")
            setUser(data.user)
            navigate(from, { replace: true })
            }
            if(error){
              toast.error(error.data?.message || "Google login failed")
            }
    },[data, isSuccess, error])

  return (
    <div className='w-full flex justify-center items-center'>
      <button
        onClick = {handleGoogleLogin}>
        <img src={googleButtton} alt="Google Login" />
      </button>
    </div>
  )
}

export default GoogleLogin
