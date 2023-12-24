import NavLink from "../navbar/navLink";

export default function ToCreateListing(props: any) {
    return(
        <div className="w-[60vw] h-[60px] flex flex-row justify-between p-[20px] items-center shadow-md bg-white mt-[40px]">
            <div>You have {props.listing.length} listing(s)</div>
            <NavLink navigate = "/sell">
                <div className="h-[40px] w-[150px] bg-green-400 flex justify-center items-center rounded-md">Create Listing</div>
            </NavLink>
        </div>
    )
}