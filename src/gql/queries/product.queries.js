import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
    {
      getAllProducts{
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
`