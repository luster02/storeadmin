import React from 'react'
import { useQuery } from '@apollo/client'
import { useApp } from '../state/AppContext'
import { GET_SHOP } from '../gql/queries/shop.queries'

export const ShopPage = () => {
    const app = useApp()
    const { user } = app || {}
    const { data } = useQuery(GET_SHOP, { variables: { id: app.user.id } })
    const { getShop } = data || {}

    return (
        <div className="page-container px-6 md:px-16 py-6 overflow-y-auto">
            <p className="font-bold text-2xl">Shop</p>
            <p className="font-medium text-lg">
                {getShop?.name ? getShop.name : 'shop name'}
            </p>

            <div className="mt-10 text-lg space-y-5">
                <div className="m-2 flex justify-start items-center">
                    <i className="fas fa-at mr-1"></i>
                    <p>{user.email} </p>
                </div>
                <div className="m-2 flex justify-start items-center">
                    <i className="fas fa-user mr-2"></i>
                    <p>{user.username}</p>
                </div>
                <div className="m-2 flex justify-start items-center">
                    <i className="fas fa-id-badge mr-2"></i>
                    <p>{user.details.name ? user.details.name : 'name'}</p>
                </div>
                <div className="m-2 flex justify-start items-center">
                    <i className="fas fa-id-badge mr-2"></i>
                    <p>{user.details.lastname ? user.details.lastname : 'lastname'}</p>
                </div>
            </div>
        </div>
    )
}
