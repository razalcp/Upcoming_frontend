import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { organizerApi } from "../../utils/axios/axios";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const organizerEmail = localStorage.getItem("organizerEmail");
  const organizerIsLogged = JSON.parse(localStorage.getItem("organizerIsLogged"));
  const organizerName = localStorage.getItem("organizerName");
  useEffect(() => {

    if (organizerEmail && organizerIsLogged && organizerName) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async() => {
    await organizerApi.post('/userLogout');
    localStorage.removeItem("organizerEmail");
    localStorage.removeItem("organizerIsLogged");
    localStorage.removeItem("organizerName");
    
    setIsLoggedIn(false);
    navigate("/signup", { replace: true });
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Upcoming Organizer</h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link className="hover:text-yellow-400" to="/">Home</Link>
          </li>
          <li>
            <Link className="hover:text-yellow-400" to="/events">Events</Link>
          </li>
          <li>
            <Link className="hover:text-yellow-400" to="/addAttendees">Add Attendee's</Link>
          </li>
          <li>
            <Link className="hover:text-yellow-400" to="/tickets">Ticket's</Link>
          </li>

          {!organizerIsLogged ? (
            <li>
              <Link className="hover:text-yellow-400" to="/signup">Signup</Link>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="hover:text-yellow-400 focus:outline-none"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
