import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import CartItem from "./CartItem";
import TakeMyMoney from "./TakeMyMoney";
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

const LOCAL_CART_ITEMS_QUERY = gql`
  query {
    cartItems @client {
      id
      title
      image
      quantity
    }
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
  //how to get loading state passed
  cartItemsQuery: ({ render, loading }) => (
    <Query query={LOCAL_CART_ITEMS_QUERY}>{render}</Query>
  ),
  toggleCartMutation: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  )
});

const Cart = () => (
  <Composed>
    {({ cartOpenQuery, cartItemsQuery, toggleCartMutation }) => {
      const { cartItems } = cartItemsQuery.data;
      return (
        <CartStyles open={cartOpenQuery.data.cartOpen}>
          <header>
            <CloseButton onClick={toggleCartMutation} title="close">
              &times;
            </CloseButton>
            <Supreme>Your Cart</Supreme>
            <p>
              You Have{" "}
              {cartItems.length > 0
                ? cartItems.reduce((accum, currentVal) => {
                    console.log(currentVal);
                    return accum + currentVal.quantity;
                  }, 0)
                : 0}{" "}
              Item
              {cartItems ? "s" : null} in your cart.
            </p>
          </header>
          <ul>
            {cartItems.map(item => {
              return <CartItem key={item.id} {...item} />;
            })}
          </ul>
          <footer>
            <p>
              {formatMoney(
                cartItemsQuery.data.cartItems.reduce(
                  (accummulator, currentVal) =>
                    accummulator + currentVal.price * currentVal.quantity,
                  0
                )
              )}
            </p>
            <TakeMyMoney>
              <SickButton>Checkout</SickButton>
            </TakeMyMoney>
          </footer>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY, LOCAL_CART_ITEMS_QUERY };
