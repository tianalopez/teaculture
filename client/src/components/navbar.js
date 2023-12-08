import { NavLink } from "react-router-dom";

const Navbar = ({ user, updateUser, handleNewAlert }) => {
  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(() => updateUser(null))
      .catch(handleNewAlert);
  };

  return (
    <nav className="navbar">
      <div>
        <NavLink className="link" to={`/users/${user.id}/dashboard`}>
          Dashboard
        </NavLink>
        <NavLink className="link" to={"/drinklab"}>
          Drink Lab
        </NavLink>
        <NavLink className="link" to={"/communities"}>
          Sip Hub
        </NavLink>
        <NavLink className="link" to={`/users/${user.id}/adddrink`}>
          Communities
        </NavLink>
      </div>
      <div>
        <NavLink className="link logout" to={"/"} onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
