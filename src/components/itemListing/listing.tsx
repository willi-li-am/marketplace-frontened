import { useEffect, useState } from "react";
import NavLink from "../navbar/navLink";

export default function ListingContainer(props:any) {

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
        <div className="w-full h-[130px flex flex-row p-[10px] pb-0 items-center text-black space-x-[20px]">
            <div className="w-full h-[130px] border-b-[1px] pb-[10px] border-slate-200 flex flex-row items-center text-black space-x-[20px]">
            <div className={"w-[150px] h-[120px] min-w-[150px] max-w-[150px] min-h-[120px] max-h-[120px]"} >
                {imageLoaded? <img loading="lazy" src = {props.image} className="w-[150px] h-[120px] min-w-[150px] max-w-[150px] min-h-[120px] max-h-[120px] object-cover"></img> : 
                <div className="animate-pulse"> 
                    <div className="w-[150px] h-[120px] min-w-[150px] max-w-[150px] min-h-[120px] max-h-[120px]" style={{backgroundColor: '#C2C2C2'}}></div>
                </div>}
            </div>
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col justify-start h-[120px]">
                    <div className="font-semibold text-[18px] max-h-[55px] max-w-[calc(60vw-360px)] overflow-hidden text-ellipsis">{props.title}</div>
                    <div className="flex flex-col ml-[10px]">
                        <div className="text-xl">${props.price}</div>
                        <div className="text-sm">{props.stock} in stock</div>
                    </div>
                </div>
                <div className="flex items-center mr-[20px] ml-[30px]">
                    <NavLink navigate={"/update/" + product}><div className="flex items-center justify-center w-[100px] bg-slate-300 text-center h-[40px] rounded-xl">Update</div></NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}