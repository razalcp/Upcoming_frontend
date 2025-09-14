import { Navigate } from "react-router-dom";

const OrganizerProtectedRoute = ({ children }) => {
    const isLoggedIn = JSON.parse(localStorage.getItem("organizerIsLogged"));
    const organizerEmail = localStorage.getItem("organizerEmail");
    const organizerName = localStorage.getItem("organizerName");

    if (isLoggedIn && organizerEmail && organizerName) {
        return children;
    }

    localStorage.removeItem("organizerIsLogged");
    localStorage.removeItem("organizerEmail");
    localStorage.removeItem("organizerName");

    return <Navigate to="/organizerLogin" replace />;
};

export default OrganizerProtectedRoute;
