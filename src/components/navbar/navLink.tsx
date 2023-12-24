import { useNavigate } from "react-router-dom"

export default function NavLink(props:any){
    const navigate = useNavigate()
    return(
        <div className="hover:cursor-pointer" onClick={()=> {navigate(props.navigate)}}>
            {props.children}
        </div>
    )
}