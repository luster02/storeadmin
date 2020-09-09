import { gql } from '@apollo/client';

export const CURRENT_USER_AUTH = gql`
  query getCurrentUser {
    currentUser{
      id
    }
  }
`

//export const 

export const CURRENT_USER = gql`
  query getCurrentUser {
    currentUser{
      id
      username
      email
      details {
        id
        name
        lastname
      }
      shop {
        id
      }
      gallery {
        id
        folder
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($user: SigninDto!) {
    signin(userData: $user) {
      success
      error
      token
    }
  }
`
export const REGISTER = gql`
  mutation register($user: SignupDto!){
    signup(userData: $user){
      success
      error
    }
  }
`


