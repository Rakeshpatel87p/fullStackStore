import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) @client {
      id
    }
  }
`;

const RemoveFromCart = props => (
  <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: props.id }}>
    {removeFromCart => <button onClick={removeFromCart}>X</button>}
  </Mutation>
);

export default RemoveFromCart;
