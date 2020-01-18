import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const RemoveFromCartButton = styled.button`
  border: 0;
  color: ${props => props.theme.red};
  position: absolute;
  font-size: 22px;
  font-weight: bold;
  top: -10px;
  right: 0;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) @client {
      id
    }
  }
`;

const RemoveFromCart = props => (
  <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{ id: props.id }}>
    {removeFromCart => (
      <RemoveFromCartButton onClick={removeFromCart}>
        &times;
      </RemoveFromCartButton>
    )}
  </Mutation>
);

export default RemoveFromCart;
