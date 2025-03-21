"use client"; 

import { useEffect, useState } from "react";
import api from "../utils/api";
import LandingPage from "../app/Pages/Home";
import AboutUs from "../app/Pages/AboutUs";
import LogIn from "../app/Pages/Login";
import SignUp from "../app/Pages/SignUp";

export default function Home() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   api.get("/api/test-endpoint/")  // ✅ Corrected endpoint
  //     .then((response) => setData(response.data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  
  return (
    // <div>
    //   <h1>Next.js with Django API</h1>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
    // <LandingPage/>
    // <AboutUs></AboutUs>
    // <LogIn></LogIn>
    <SignUp></SignUp>
  );
}
// import AboutUs from './Pages/AboutUs'
// import './App.css'
// import Home from './Pages/Home'

// function App() {
  
//   return (
//     <>
//       <Home/>
//       {/* <AboutUs/> */}
//     </>
//   )
// }

// export default App
