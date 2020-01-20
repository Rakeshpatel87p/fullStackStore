import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import { Mutation } from "react-apollo";
import { TOGGLE_CART_MUTATION } from "./Cart";
import CartCounter from "./CartCounter";

const Nav = () => (
  <NavStyles>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Account</a>
    </Link>
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {toggleCart => (
        <div>
          <button onClick={toggleCart}>My Cart</button>
          <CartCounter />
        </div>
      )}
    </Mutation>
  </NavStyles>
);

export default Nav;
