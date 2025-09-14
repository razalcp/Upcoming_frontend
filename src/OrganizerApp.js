import { Outlet } from "react-router-dom"
import Header from "./components/organizer/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrganizerApplayout = () => {
    return (

        <div className="App">
            <ToastContainer position="top-right" autoClose={3000} />
            <Header />
            <Outlet />
        </div>

    )
}

export default OrganizerApplayout;