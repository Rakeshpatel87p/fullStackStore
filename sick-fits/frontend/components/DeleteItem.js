import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  render() {
    return (
      <div>
        <p>Hello there, going to delete here</p>
      </div>
    );
  }
}

export default DeleteItem;