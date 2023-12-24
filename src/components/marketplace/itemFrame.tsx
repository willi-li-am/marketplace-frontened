import { useEffect, useState } from "react";
import NavLink from "../navbar/navLink";

export default function Item(props:any){
    const [imageLoaded, setImageLoaded] = useState(false)

    const product = props.productId

    useEffect(() => {
        const image = new Image();
        image.src = props.image;
        image.onload = function () {
          setImageLoaded(true);
        };
    }, []);

    return(
            <div className="bg-white w-[200px] h-[250px] shadow-md flex-col items-center">
                <div className= "w-full flex justify-center">
                    <NavLink navigate={"/product/" + props.productId}>
                        {imageLoaded? <img loading="lazy" className="object-cover w-[200px] h-[140px]" src={props.image}></img> :
                        <div className="animate-pulse">
                            <div className="w-[200px] h-[140px]" style={{backgroundColor: '#C2C2C2'}}></div>
                        </div>}
                    </NavLink>
                </div>
                <div className="flex flex-col justify-start h-[90px] pl-[10px] pr-[10px]">
                    <NavLink navigate={"/product/" + props.productId}>
                        <div className="font-semibold max-h-[70px] mt-[10px] overflow-hidden text-ellipsis text-[12px] hover:text-yellow-500">{props.title}</div>
                    </NavLink>
                    <div className="h-[20px]">${props.price}</div>
                </div>
            </div>
    )
}