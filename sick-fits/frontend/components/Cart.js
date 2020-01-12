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

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  cartOpenQuery: ({ render }) => (
    <Query query={LOCAL_STATE_QUERY}>{render}</Query>
  ),
  toggleCartMutation: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  )
});

const Cart = () => (
  <Composed>
    {({ cartOpenQuery, toggleCartMutation }) => (
      <CartStyles open={cartOpenQuery.data.cartOpen}>
        <header>
          <CloseButton onClick={toggleCartMutation} title="close">
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
    )}
  </Composed>
);

export default Cart;
export { TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY };
