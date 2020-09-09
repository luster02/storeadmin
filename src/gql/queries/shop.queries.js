import { gql } from '@apollo/client';

export const GET_SHOP = gql`
    query GetShop($id: Int!){
      getShop(id: $id){
        id
        name
        description
        status
        products{
          id
          name
          description
          price
          category
          assets{
            id
            url
          }
        }
      }
    }
`