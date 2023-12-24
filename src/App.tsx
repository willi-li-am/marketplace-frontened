import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/navbarFrame";
import { useEffect, useState } from "react";
import LoginFrame from "./components/signin/signinFrame";
import Settings from "./components/settings/settingsFrame";
import Listing from "./components/itemListing/listingFrame";
import CreateListing from "./components/itemListing/createListing";
import UpdateListing from "./components/itemListing/updateListing";
import Layout from "./components/Layout";
import Marketplace from "./components/marketplace/marketplaceFrame";
import ItemPage from "./components/itemPage/itemPageFrame";
const Cookies = require("js-cookie")

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastVisit, setLastVisit] = useState("/")
  const [loading, setLoading] = useState(true)
  const [cart, setCart] = useState({})

  function LoggedInRoute({ condition, children }:any) {
    if (condition) {
      return children; // Render the component if the condition is met
    } else {
      return <Navigate to="/login" />; // Redirect to the login page if the condition is not met
    }
  }

  useEffect(():any => {
    // Create a function to send a request to the backend to check login status
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('http://localhost:4000/', {
          method: 'GET',
          credentials: 'include', // Send cookies with the request
        });

        const res = await response.json()
        console.log(res)

        if (res["loggedIn"]) {
          // If the backend responds with a successful status (e.g., 200), the user is logged in
          setIsLoggedIn(true);
        } else {
          // If the backend responds with an error status, the user is not logged in
          setIsLoggedIn(false);
        }
        setLoading(false)
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false); // Handle errors by assuming the user is not logged in
        setLoading(false)
      }
    }; // Call the function to check login status when the component mounts
    checkLoginStatus();
  }, [isLoggedIn]);
  return (
    <Routes>
      <Route path="/" element={
        <Layout loading = {loading} locked = {false} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
          <Marketplace></Marketplace>
        </Layout>
      }></Route>
      <Route path="/login" element = {
          <Layout loading = {loading} locked = {false} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
            <LoginFrame lastVisit = {lastVisit} isLoggedIn = {isLoggedIn} login = {true}></LoginFrame>
          </Layout>
      }></Route>
      <Route path="/signup" element = {
        <Layout loading = {loading} locked = {false} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
          <LoginFrame lastVisit = {lastVisit} isLoggedIn = {isLoggedIn} login = {false}></LoginFrame>
        </Layout>
      }></Route>
        <Route path="/settings" element = {
          <Layout loading = {loading} locked = {true} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
            <Settings lastVisit = {lastVisit}  setIsLoggedIn = {setIsLoggedIn}></Settings>
          </Layout>
        }></Route>
        <Route path="/listings" element = {
          <Layout loading = {loading} locked = {true} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
            <Listing></Listing>
          </Layout>
        }></Route>
        <Route path = "/sell" element = {
          <Layout loading = {loading} locked = {true} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
          <CreateListing></CreateListing>
          </Layout>
        }>
        </Route>
        <Route path="/update/*" element={
          <Layout loading = {loading} locked = {true} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
            <UpdateListing></UpdateListing>
          </Layout>
        }></Route>
        <Route path="/product/*" element={
          <Layout loading = {loading} locked = {undefined} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}>
            <ItemPage setCart = {setCart} cart={cart}></ItemPage>
          </Layout>
        }/>
      <Route path="*" element = {
          <Layout loading = {loading} locked = {undefined} isLoggedIn = {isLoggedIn} lastVisit = {lastVisit}></Layout>
      }></Route>
    </Routes>
  );
}

export default App;
