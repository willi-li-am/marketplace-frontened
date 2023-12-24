const Cookies = require("js-cookie")

export default function Settings(props: any){

    const handleLogOut = async () => {
        try {
            const response = await fetch('http://localhost:4000/logout', {
              method: 'GET',
              credentials: 'include', // Send cookies with the request
            });
    
            const res = await response.json()
            console.log(res["message"])
            Cookies.set("sessionId", undefined)
            props.setIsLoggedIn(false)
            window.location.href = props.lastVisit;
            
          } catch (error) {
            console.error('Error checking login status:', error);
          }
    }

    return(
        <div className="flex items-center justify-center h-[200px]">
            <div className="hover:cursor-pointer bg-slate-400 p-[15px] rounded-md" onClick={() => {handleLogOut()}}>Log Out</div>
        </div>
    )
}