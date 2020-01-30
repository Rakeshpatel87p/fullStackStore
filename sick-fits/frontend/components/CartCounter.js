import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { LOCAL_CART_ITEMS_QUERY } from "./Cart";
import styled from "styled-components";

const CartCounterStyle = styled.p`
  color: ${props => props.theme.red};
  position: absolute;
  right: 0;
  top: -5px;
`;

const CartCounter = () => (
  <Query query={LOCAL_CART_ITEMS_QUERY}>
    {data => {
      const { cartItems } = data.data;
      return cartItems.length <= 0 ? null : (
        <CartCounterStyle>
          {cartItems.reduce(
            (tally, currentVal) => tally + currentVal.quantity,
            0
          )}
        </CartCounterStyle>
      );
    }}
  </Query>
);

export default CartCounter;
