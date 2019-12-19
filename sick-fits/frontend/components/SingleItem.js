import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      largeImage
    }
  }
`;

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => <p>{data.item.title}</p>}
      </Query>
    );
  }
}

export default SingleItem;
