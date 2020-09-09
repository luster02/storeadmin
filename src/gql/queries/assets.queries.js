import { gql } from '@apollo/client'

export const GET_ASSET = gql`
    query GetAsset($id: Int!) {
      getAsset(id: $id) {
        id
        url
        public_id
      }
    }
`
export const GET_ALL_ASSETS = gql`
    query GetAllAssets($gallery_id: Int!) {
      getAllAssets(gallery_id: $gallery_id) {
     		id
        url
        public_id
      }
    }
`

export const GET_GALLERY = gql`
  query GetGallery($id: Int!) {
    getOneGallery(id: $id) {
      id
      folder
      assets{
        id
        url
        public_id
      }
    }
  }
`