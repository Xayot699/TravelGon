import {Link,useNavigate} from "react-router-dom";
import {currentUser,logout} from "../../../features/auth/api/authApi";
export function Header(){const n=useNavigate();const user=currentUser();function out(){logout();n("/");window.location.reload()}return <header className="header"><Link className="logo" to="/">TRAVEL<span>GO</span></Link><nav><Link to="/">Home</Link><Link to="/tours">Tours</Link><Link to="/bookings">Bookings</Link><Link to="/auth">{user?"Account":"Login"}</Link>{user&&<button className="nav-button" onClick={out}>Logout</button>}</nav></header>}
