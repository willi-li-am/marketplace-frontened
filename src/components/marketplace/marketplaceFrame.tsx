import { useEffect, useState } from "react";
import Item from "./itemFrame";

export default function Marketplace() {

    const [itemList, setItemList] = useState([])
    const [updateList, setUpdateList] = useState(false)

    useEffect(()=>{
        const getItems = async () => {
            try{
                const response = await fetch("https://marketplace-backend-874fojx4w-trollermaner.vercel.app/list/items", {
                    method: "GET"
                })

                if(response.ok){
                    const res = await response.json()
                    setItemList(res)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getItems()
    },[])
    return(
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[40px] mt-[40px] mb-[40px]">
            {itemList.map((data) => {

                return(
                    <Item image = {data["image"]} price = {data["price"]} title = {data["title"]} productId = {data["_id"]}></Item>
                )
            })}
        </div>
    )
}