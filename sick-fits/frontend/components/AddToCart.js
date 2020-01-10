import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: String!) {
    addToCart(id: $id) @client {
      id
    }
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
      //<button onClick>Add To Cart</button>
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
        {addToCart => <button onClick={addToCart}>Add To Cart</button>}
      </Mutation>
    );
  }
}

export default AddToCart;
