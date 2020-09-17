import { gql } from '@apollo/client'

export const UPDATE_SHOP = gql`
    mutation UpdateShop($shopData: ShopDto!, $id: Int!) {
      updateShop(shopData: $shopData, id: $id) {
        success
      }
    }
`

export const CREATE_BANNER = gql`
    mutation CreateBanner($bannerData: BannerDto!){
      createBanner(bannerData:$bannerData){
        success
      }
    }
`

export const UPDATE_BANNER = gql`
    mutation UpdateBanner($bannerData: BannerDto!, $id: Int!) {
      updateBanner(bannerData: $bannerData, id: $id) {
        success
      }
    }
`

export const DELETE_BANNER = gql`
    mutation DeleteBanner($id: Int!) {
      deleteBanner(id: $id) {
        success
      }
    }
`