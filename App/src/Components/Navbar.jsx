import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cart from "../Screen/Cart";
import Modal from "../Model";
import { useCart } from "./ContextReducer";
// import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark position-sticky bg-danger">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoHunger
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-1">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrders"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <form className="d-flex">
                <Link className="btn bg-white text-danger mx-1" to="/login">
                  LogIn
                </Link>
                <Link className="btn bg-white text-danger mx-1" to="/signUp">
                  Sign Up
                </Link>
              </form>
            ) : (
              <div>
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={loadCart}
                >
                  My Cart{" "}
                  {data.length !== 0 ? (
                    <Badge pill bg="success">
                      {data.length}
                    </Badge>
                  ) : (
                    ""
                  )}
                </div>

                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}
                <div
                  className="btn bg-white text-primary mx-2"
                  onClick={handleLogout}
                >
                  {" "}
                  Log Out
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
