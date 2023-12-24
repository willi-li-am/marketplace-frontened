import NavLink from "../navbar/navLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Cookies = require("js-cookie")

export default function LoginComponent (props: any) {

    const [showPassword, setShowPassword] = useState(false)

    const loginHandle = async (e: any) => {
        e.preventDefault();
        let data = new URLSearchParams();
        let email = props.emailRef.current.value;
        data.append("email", String(email).toLowerCase());
        data.append("password", props.passwordRef.current.value);
      
        try {
          const response = await fetch("http://localhost:4000/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString(),
          });
      
          if (!response.ok) {
            let res = await response.json();
            throw new Error(res["error"]);
          }
      
          const responseData = await response.json();
          Cookies.set("sessionId", responseData["cookie"]);
      
          // Redirect the user to another page after a successful login using window.location.href
          window.location.href = props.lastVisit; // Change "/" to the desired URL
        } catch (error) {
          console.error('There was a problem with the POST request:', error);
        }
      };
      

    return(
        <form onSubmit={(event) => {loginHandle(event)}} className="select-none flex flex-col justify-center items-center w-[800px] h-[80vh] bg-slate-400 rounded-xl">
            <div className="text-xl font-semibold">Log In</div>
            <div className="flex flex-col">
                <div className="text-[15px] font-semibold">Email</div>
                <input ref = {props.emailRef} defaultValue = {props.emailRef.current.value} type="email" className="flex outline-none p-[10px] rounded-md"></input>
            </div>
            <div className="flex flex-col">
                <div className="text-[15px] font-semibold">Password</div>
                <div className="flex flex-row items-center justify-end">
                <input ref = {props.passwordRef} defaultValue = {props.passwordRef.current.value} type={showPassword? "text" : "password"} className="flex outline-none p-[10px] rounded-md"></input>
                    <div onClick={() => setShowPassword(!showPassword)} className="absolute bg-slate-400 w-[30px] h-[30px] mr-2 rounded-md hover:cursor-pointer flex items-center justify-center">
                        <FontAwesomeIcon className="w-[23px] h-[23px]" icon = {showPassword? faEyeSlash : faEye}></FontAwesomeIcon>
                    </div>
                </div>
            </div>
            <button type="submit" className="p-4 pr-12 pl-12 mt-4 rounded-xl bg-slate-600" onClick={(event) => {loginHandle(event)}}>Submit</button>
            <NavLink navigate = "/signup">Sign Up</NavLink>
        </form>
    )
}