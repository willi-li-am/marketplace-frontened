import { useEffect, useState } from "react";
import ListingContainer from "./listing";
import ToCreateListing from "./toCreateListing";
import { BeatLoader } from "react-spinners";

export default function Listing(){

    const [listing, setListing] = useState([])
    const [updateListing, setUpdateListing] = useState(false)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        const getListing = async () => {
            setLoading(true)
            try {
                const response = await fetch('https://marketplace-backend-874fojx4w-trollermaner.vercel.app/list/listings', {
                  method: 'GET',
                  credentials: 'include', // Send cookies with the request
                });
        
                const res = await response.json()
        
                if (res.length !== 0) {
                  // If the backend responds with a successful status (e.g., 200), the user is logged in
                  setListing(res)
                  setUpdate(!update)
                  console.log(res)
                }
                setLoading(false)   
              } catch (error) {
                console.error('Error checking login status:', error);
                setLoading(false)
              }
        }

        getListing()

    }, [updateListing])
    return (
        <div className=" flex flex-col items-center">
            <ToCreateListing listing = {listing}></ToCreateListing>
            <div className="min-h-[calc(100vh-260px)] p-[10px] mb-[40px] w-[60vw] shadow-md flex text-slate-500 bg-white flex-col mt-[40px] items-center">
                {listing && listing.length > 0 ? (
                    listing.map((data) => (
                        <ListingContainer
                            key={data["_id"]} // Don't forget to add a unique key when mapping in React
                            title={data["title"]}
                            image={data["image"]}
                            stock={data["stock"]}
                            price={data["price"]}
                            productId={data["_id"]}
                        ></ListingContainer>
                    ))
                ) : (
                    <p>You do not have any listings at this moment (FIX BUG WHERE YOU CANT GO IF NOT LOGGED IN)</p>
                )}
                {loading? <div className="absolute min-h-[calc(100vh-260px)] mt-[-10px] w-[60vw] flex text-slate-500 flex-col items-center">
                    <div className="absolute min-h-[calc(100vh-260px)] w-[60vw] flex text-slate-500 bg-black opacity-70 flex-col items-center"></div>
                    <div className="absolute text-white flex items-center justify-center h-[calc(100vh-260px)]">
                        <BeatLoader color="white" size = "30px"></BeatLoader>
                    </div>
                </div>:<></>}
            </div>
        </div>
    )
}