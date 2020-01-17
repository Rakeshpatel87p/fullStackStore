import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const CART_ITEMS_QUERY = gql`
  query {
    cartItems @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  cartOpenQuery: ({ render }) => (
    <Query query={LOCAL_STATE_QUERY}>{render}</Query>
  ),
  cartItemsQuery: ({ render }) => (
    <Query query={CART_ITEMS_QUERY}>{render}</Query>
  ),
  toggleCartMutation: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  )
});

const Cart = () => (
  <Composed>
    {({ cartOpenQuery, cartItemsQuery, toggleCartMutation }) => {
      const cartItems = cartItemsQuery.data.cartItems;
      if (cartItems.length <= 0) return null;
      return (
        <CartStyles open={cartOpenQuery.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCartMutation} title="close">
              &times;
            </CloseButton>
            <Supreme>Your Cart</Supreme>
            <p>
              You Have {cartItems.length} Item
              {cartItems.length > 1 ? "s" : null} in your cart.
            </p>
          </header>
          <ul>
            {cartItemsQuery.data.cartItems.map(item => (
              <li>
                <img width="100px" src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price}</p>
                <p>{item.quantity}</p>
              </li>
            ))}
          </ul>
          <footer>
            <p>$10.10</p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY };
