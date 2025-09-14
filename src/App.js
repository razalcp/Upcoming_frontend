import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import OrganizerApplayout from "./OrganizerApp"
import OrganizerHome from "./components/organizer/OrganizerHome"
import "../index.css";
import EventCreator from "./components/organizer/EventCreator";
import Attendees from "./components/organizer/Attendees";
import Tickets from "./components/organizer/Tickets";
import OrganizerSignup from "./components/organizer/OrganizerSignup";
// import OrganizerLogin from "./components/organizer/organizerLogin";
// In src/App.js
import OrganizerLogin from "./components/organizer/OrganizerLogin";



import OrganizerProtectedRoute from "./components/organizer/OrganizerProtctedRoute";

const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <OrganizerApplayout />,
        children: [
            {
                path: "/",
                element: <OrganizerHome />,
            },
            {
                path: "/events",
                element: (
                    <OrganizerProtectedRoute>
                        <EventCreator />
                    </OrganizerProtectedRoute>
                ),
            },
            {
                path: "/addAttendees",
                element: (
                    <OrganizerProtectedRoute>
                        <Attendees />
                    </OrganizerProtectedRoute>
                ),
            },
            {
                path: "/tickets",
                element: (
                    <OrganizerProtectedRoute>
                        <Tickets />
                    </OrganizerProtectedRoute>
                ),
            },
            {
                path: "/signup",
                element: <OrganizerSignup />,
            },
            {
                path: "/organizerLogin",
                element: <OrganizerLogin />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(<RouterProvider router={AppRouter} />)

export default <RouterProvider router={AppRouter} />;
