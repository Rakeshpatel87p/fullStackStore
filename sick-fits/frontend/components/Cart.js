import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";

const LOCAL_STATE_MUTATION = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Cart = () => (
  <CartStyles open={data.cartOpen}>
    <header>
      <CloseButton onClick={toggleCart} title="close">
        &times;
      </CloseButton>
      <Supreme>Your Cart</Supreme>
      <p>You Have __ Items in your cart.</p>
    </header>

    <footer>
      <p>$10.10</p>
      <SickButton>Checkout</SickButton>
    </footer>
  </CartStyles>
);

export default Cart;
export { TOGGLE_CART_MUTATION };
export { LOCAL_STATE_MUTATION };
