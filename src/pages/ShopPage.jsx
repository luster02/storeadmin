import React from 'react'
import { useQuery } from '@apollo/client'
import { useApp } from '../state/AppContext'
import { GET_SHOP } from '../gql/queries/shop.queries'

export const ShopPage = () => {
    const app = useApp()
    const { data, error } = useQuery(GET_SHOP, { variables: { id: app.user.id } })

    if (error !== undefined) console.log(error)

    return (
        <div className="page-container px-6 md:px-16 py-6 overflow-y-auto">
            <p className="font-bold text-2xl">Shop</p>
            <p className="font-medium text-lg">
                {data !== undefined
                    ? (data.getShop.name ? data.getShop.name : 'shop name')
                    : 'shop name'
                }
            </p>
        </div>
    )
}
