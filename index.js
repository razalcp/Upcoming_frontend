import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import OrganizerApplayout from "./src/OrganizerApp"
import OrganizerHome from "./src/components/organizer/OrganizerHome"
import "../index.css";
import EventCreator from "./src/components/organizer/EventCreator";
import Attendees from "./src/components/organizer/Attendees";
import Tickets from "./src/components/organizer/Tickets";
import OrganizerSignup from "./src/components/organizer/OrganizerSignup";
// import OrganizerLogin from "./components/organizer/organizerLogin";
// In src/App.js
import OrganizerLogin from "./src/components/organizer/OrganizerLogin";



import OrganizerProtectedRoute from "./src/components/organizer/OrganizerProtctedRoute";

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

root.render(<RouterProvider router={AppRouter} />)