import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
            id
            title
            price
            description
            image
            largeImage
        }
    }
`

export default class Items extends Component {
    render() {
        return (
            <div>
                <p>Items</p>
                <Query query={ALL_ITEMS_QUERY}>
                    {({data, error, loading}) => {
                        console.log(data)
                        return (
                            <div>
                                <p>We have items</p>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}
