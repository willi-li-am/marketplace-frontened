import { useEffect, useRef } from "react";
import LoginComponent from "./signinComponent";
import SignUpComponent from "./signupComponent";
import { useNavigate } from "react-router-dom";

export default function LoginFrame(props: any) {
    const navigate = useNavigate()
    const passwordRef:any = useRef("")
    const emailRef:any = useRef("")

    return(
        <>
            {props.login? <LoginComponent lastVisit = {props.lastVisit} passwordRef={passwordRef} emailRef = {emailRef}></LoginComponent> :
             <SignUpComponent lastVisit = {props.lastVisit} passwordRef={passwordRef} emailRef = {emailRef}></SignUpComponent>}
        </>
    )
}