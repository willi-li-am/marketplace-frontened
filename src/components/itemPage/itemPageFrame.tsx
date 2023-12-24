import { useEffect, useReducer, useRef, useState } from "react";
import { isPropertySignature } from "typescript";

export default function ItemPage({setCart, cart} :any){

    const [loading, setLoading] = useState(true)
    const [product, setProduct]:any = useState({})

    const pathname = window.location.pathname
    const productId = pathname.split("/")[2]

    const quant_ref:any = useRef("")

    function handleCart(productId: string){ //do something with function
        let quantity: number = parseInt(quant_ref.current.value)
        if (quantity <= 0 || quantity % 1 != 0 || quantity > product["stock"]) return 0;
        let cart_obj = cart
        if (cart.hasOwnProperty(productId)) {
            let quant_has:number = parseInt(cart[productId]);
            if ((quant_has + quantity) > product["stock"]) return 0;
            cart_obj[productId] = quant_has + quantity;
        }
        else{
            cart_obj[productId] = quantity;
        }
        setCart(cart_obj);
        console.log(cart_obj)
        return 1;
    }

    useEffect(() => {
        const getItem = async () => {
            try {
                const response = await fetch('http://localhost:4000/item?productId=' + productId, {
                  method: 'GET',
                });
                
                const res = await response.json()
        
                if (res.length !== 0) {
                  // If the backend responds with a successful status (e.g., 200), the user is logged in
                  setProduct(res)
                }
                setLoading(false)
              } catch (error) {
                console.error('Error checking login status:', error)
                setLoading(false)
              }
        }
        getItem()
    }, [])
    return(
        <div className="w-full h-full mt-[40px]">
            {!loading? 
                <div className="grid sm:grid-cols-1 md:grid-cols-2 w-full gap-x-[3%]">
                    <div className="flex justify-center items-center w-full">
                        <div className="aspect-[7/6] sm:aspect-[7/6] md:aspect-[7/6] lg:aspect-[7/6] xl:aspect-[7/6] max-w-[95%] min-w-[95%]">
                            <img src={product["image"]} alt={product["title"]} className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-center">
                        <div className="flex flex-col w-[95%] p-[20px] md:p-0 md:w-full items-start">
                            <div className="font-semibold text-[28px]">{product["title"]}</div>
                            <div className="text-[24px]">${product["price"]}</div>
                            <div className="flex flex-col w-full items-start space-y-[20px] mt-[20px]">
                                <div className="w-full">
                                    <div className="flex flex-row w-full">
                                        <input ref={quant_ref} placeholder="0" type="number" className="w-[60px] h-[40px] text-center outline-none rounded-l-lg p-[5px]"></input>
                                        <div onClick={() => {if(!handleCart(productId)){alert("invalid quantity")}}} className="hover:cursor-pointer flex justify-center items-center w-full md:w-[200px] h-[40px] rounded-r-xl bg-slate-100">Add to cart</div>
                                    </div>
                                    <div className="ml-[5px] text-[12px] text-gray-600">{product["stock"]} left in stock</div>
                                </div>
                                <div className="whitespace-pre-line pb-[50px] md:pb-0">{product["description"]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            
            :<></>}
        </div>
    )
}