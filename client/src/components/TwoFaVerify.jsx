import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { useDispatch, useSelector } from "react-redux";
import { verifyTwoFA } from "../redux/actions";
import { useHistory } from "react-router-dom";

export default function TwoFaVerify() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [code, setCode] = useState('')
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(60)

  const handleCode = event => {
    setCode(event.target.value)
  };

  useEffect(() => {
    let interval = null;
    if(active){
      interval = setInterval(() => {
        setSeconds(state => state - 1);
      }, 1000);
    }
    if(!seconds){
      clearInterval(interval);
      setActive(false);
      setSeconds(120);
    }
    return () => clearInterval(interval);
  },[seconds, active])

  const resendCode = async event => {
    setActive(true);
    const response = await axios.post('/twofa/resend', {userId: user?.id})
    if(response.status === 200) {
      swal({
        title: "Code Resend!",
        text: `Check your email again. You can resend 2FA every ${seconds/60} minute`,
        icon: "success",
        timer: 3000
      });
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try{
      const response = await axios.post('/twofa/verify', {userId: user?.id, code});
      if(response.status === 200) {
        swal({
          title: "Code Verified!",
          text: "You can proceed to the page",
          icon: "success",
          timer: 3000
        });
        dispatch(verifyTwoFA());
        await axios.post('/twofa/set', {userId: user?.id});
        history.push('/')
      }else {
        swal({
          title: "Wrong code!",
          text: "Please verify your code and try again!",
          icon: "error",
          timer: 3000
        });
      }
    }
    catch (error) {
      console.log(error)
      swal({
        title: "Something went wrong",
        text: "The 2FA code is not valid",
        icon: "error",
        button: "Ok"
      });
    }
  }

  return (
  <div className="resetPassword">
      <form className="resetPassword__form" onSubmit={handleSubmit}>       
        <h2 className="resetPassword__title">2FA Verification</h2>
        <input value={code} type="text" name="2FAcode" placeholder="Introduce your 2FA code" onChange={handleCode}/>
        <button type="submit" disabled={!code}>Verify</button>
      </form>
      <button style={{ marginTop: "20px",}} disabled={active} onClick={resendCode}>Re Send 2FA Code {active && "("+seconds+")"}</button>
    </div>
  )
}