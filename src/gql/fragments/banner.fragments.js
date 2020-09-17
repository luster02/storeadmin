import { gql } from '@apollo/client'

export const Banner = gql `
    fragment BannerParts on Banner {
      id
      title
      description
      redirect
    }
`