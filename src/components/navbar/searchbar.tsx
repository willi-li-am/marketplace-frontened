import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import NavLink from "./navLink"

export default function SearchBar(props: any){
    const searchInput:any = useRef("")

    //function to search items https://marketplace-backend-874fojx4w-trollermaner.vercel.app/list/items?search= smth like that
    return(
        <div className="flex flex-row items-center ml-[75px]">
            <NavLink navigate="/"><div className="font-semibold text-[25px]">Marketplace</div></NavLink>
            <input ref = {searchInput} type="text" placeholder="Search Products" className="p-[10px] ml-[75px] focus:ml-[50px] w-[200px] 
            h-[40px] focus:w-[250px] duration-300 bg-white rounded-l-xl outline-none" ></input>
            <button onClick={() => {console.log(searchInput.current.value)}} className="w-[45px] h-[40px] bg-slate-700 rounded-r-xl flex items-center justify-center"><FontAwesomeIcon icon={faMagnifyingGlass} className="text-white w-[23px] h-[23px]" /></button>
        </div>
    )
}