import { useEffect, useRef, useState } from "react"
import NavLink from "../navbar/navLink"
import { useNavigate } from "react-router-dom"
const Cookies = require("js-cookie")

export default function CreateListing() {

    const imageRef:any=useRef("")
    const titleRef:any=useRef("")
    const priceRef:any=useRef("")
    const stockRef:any=useRef("")
    const descriptionRef:any=useRef("")
    const [updatePic, setUpdatePic] = useState(true)
    const [goodImage, setGoodImage] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        setUpdatePic(!updatePic)
    },[])

    useEffect(() => {
        setGoodImage(false)
        const image = new Image();
        image.src = imageRef.current.value;
        image.onload = function () {
          setGoodImage(true);
        };
    }, [updatePic]);
    
    const handleSubmit = async () => {
        let data = new URLSearchParams();
        
        let title = titleRef.current.value
        let price = priceRef.current.value
        let stock = stockRef.current.value
        let image = imageRef.current.value
        let description = descriptionRef.current.value

        data.append("title", title);
        data.append("price", price);
        data.append("stock", stock);
        data.append("image", image);
        data.append("description", description);

        if(!goodImage) throw new Error("Not a valid image")

        try {
            const response = await fetch("https://marketplace-backend-874fojx4w-trollermaner.vercel.app/new/item", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            credentials: "include",
            body: data.toString(),
            });

            if (!response.ok) {
            let res = await response.json();
            throw new Error(res["error"]);
            }

            const responseData = await response.json();

            console.log(responseData)

            // Redirect the user to another page after a successful signup
            navigate("/listings"); // Change "/" to the desired URL
        } catch (error) {
            console.error('There was a problem with the POST request:', error);
        }
    }

    return(
        <div className="bg-slate-200 flex flex-col justify-center items-center p-[40px]">
            <div className="flex flex-row justify-evenly w-full space-x-[20px]">
                <div className="flex flex-col space-y-[15px]">
                    <div>
                        <div>Product Name</div>
                        <input ref = {titleRef} className="outline-none w-[500px] h-[40px] p-4 rounded-xl" placeholder="ex: LG Monitor"></input>
                    </div>
                    <form className="flex flex-col" onSubmit={(event) => {setUpdatePic(!updatePic); event.preventDefault()}}>
                        <div>Image Address</div>
                        <input type = "url" ref = {imageRef} className="outline-none w-[500px] h-[40px] p-4 rounded-xl" placeholder="https://example.com/image"></input>
                        <button type = "submit" className= "hover:cursor-pointer text-[14px] bg-yellow-300 p-[8px] text-center w-[140px] rounded-xl mt-[10px]" onClick={(event) => {setUpdatePic(!updatePic); event.preventDefault()}}>Preview Picture</button>
                    </form>
                    <div>
                        <div>Price (CAD$)</div>
                        <input ref={priceRef} type="number" min={1} className="outline-none w-[150px] h-[40px] p-4 rounded-xl" placeholder="ex: 19.99"></input>
                    </div>
                    <div>
                        <div>Amount in stock</div>
                        <input ref={stockRef} type="number" min={0} step={1} className="outline-none w-[150px] h-[40px] p-4 rounded-xl" placeholder="ex: 123"></input>
                    </div>
                    <div>
                        <div>Description of Product</div>
                        <textarea ref={descriptionRef} rows = {7} placeholder='ex: Enjoy competitive gaming like never before with the LG UltraWide 34" FHD gaming monitor. This monitor integrates an IPS display with AMD FreeSync technology to deliver seamless gaming at 100Hz refresh rate and 5ms response time. It supports the VESA DisplayHDR 400 to offer life-like visuals and the ultrawide aspect ratio of 21:9 assures incredible viewing without any hidden scenes.' 
                        className="outline-none w-[500px] p-2 rounded-xl min-h-[150px] h-[200px]"></textarea>
                    </div>
                </div>
                <div className="flex flex-col justify-evenly h-[calc(100vh-160px)]">
                    <div>
                        <div>Preview:</div>
                        <img className="object-cover w-[500px] h-[400px] border-[2px] border-black bg-white" src = {imageRef.current.value !== "" && goodImage ? imageRef.current.value :
                    "https://cwad.ca/wp-content/uploads/2021/09/placeholder.png"}></img>
                    </div>
                    <div className="flex justify-center">
                        <div className="flex flex-row w-[300px] justify-between">
                            <NavLink navigate = "/listings">
                                <div className="bg-red-400 w-[120px] text-center p-[10px] rounded-xl">Cancel</div>
                            </NavLink>
                            <div onClick = {() => {
                                handleSubmit()
                            }} className="bg-green-400 w-[120px] text-center p-[10px] rounded-xl hover:cursor-pointer">Submit</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}