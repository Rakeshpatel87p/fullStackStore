import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import CartItem from "./CartItem";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import formatMoney from "../lib/formatMoney";

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
              <CartItem key={item.id} {...item} />
            ))}
          </ul>
          <footer>
            <p>
              {formatMoney(
                cartItemsQuery.data.cartItems
                  .map(item => item.price * item.quantity)
                  .reduce(
                    (accummulator, currentVal) => accummulator + currentVal,
                    0
                  )
              )}
            </p>
            <SickButton>Checkout</SickButton>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY };
