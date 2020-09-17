import { gql } from '@apollo/client';
import { Asset } from '../fragments/assets.fragments'
import { Banner } from '../fragments/banner.fragments'

export const GET_SHOP = gql`
    query GetShop($id: Int!){
      getShop(id: $id){
        id
        name
        description
        status
      }
    }
`

export const GET_ALL_BANNERS = gql`
  {
    getAllBanners {
      ...BannerParts
      asset {
        ...AssetParts
      }
    }
  }
  ${Banner}
  ${Asset}
`

export const GET_BANNER = gql `
  query GetOneBanner($id: Int!) {
    getBanner(id: $id) {
      ...BannerParts
      asset {
        ...AssetParts
      }
    }
  }
  ${Banner}
  ${Asset}
`