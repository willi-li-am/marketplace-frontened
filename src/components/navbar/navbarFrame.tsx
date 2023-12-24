import SearchBar from "./searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavLink from "./navLink";

export default function Navbar(props: any){
    //search my-orders my-listings cart login/settings

    const navigate = useNavigate()

    useEffect(() => {
        if(props.locked !== undefined){
            if (((!props.isLoggedIn && props.locked) || (props.isLoggedIn && !props.locked)) && !props.loading) return navigate(props.lastVisit)
        }
    }, [props.isLoggedIn, props.loading])

    return(
        <div className="flex flex-row w-full h-[80px] bg-slate-300 items-center justify-between pr-[60px] space-x-[20px] shadow-md">
                <SearchBar></SearchBar>
                {props.isLoggedIn? <div className="flex flex-row w-[400px] justify-between items-center">
                    <div className="flex flex-row w-[200px] justify-between items-center">
                        <NavLink navigate="/orders">
                            <div className="text-md">My Orders</div>
                        </NavLink>
                        <NavLink navigate="/listings">
                            <div className="text-md">My Listings</div>
                        </NavLink>
                    </div>
                    <div className="flex flex-row w-[100px] justify-between items-center">
                        <NavLink navigate="/cart">
                            <FontAwesomeIcon className="w-[30px] h-[30px]" icon={faCartShopping} />
                        </NavLink>
                        <NavLink navigate="/settings">
                            <FontAwesomeIcon className="w-[30px] h-[30px]" icon={faGear} />
                        </NavLink>
                    </div>
                </div> :
                <NavLink navigate="/login"><div className="bg-slate-400 p-[10px] pr-[20px] pl-[20px] rounded-xl hover:bg-slate-700 duration-200 hover:text-white">Sign In</div></NavLink>}
                
        </div>
    )
}