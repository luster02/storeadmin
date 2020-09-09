import React from 'react'
import { useQuery } from '@apollo/client'
import { EmpityComponent } from '../EmpityComponent'
import { OnlyLoader } from '../LoaderComponent'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'
import { useApp } from '../../state/AppContext'

export const ListProducts = () => {
    const app = useApp()
    const { data, loading } = useQuery(GET_PRODUCTS, { fetchPolicy: 'cache-and-network' })
    const { getAllProducts } = data || {}

    function showDetail(selected) {
        app.updateSlected(selected)
        app.updateType('detail')
    }

    return (
        loading
            ? <OnlyLoader Show={loading} />
            : !getAllProducts.length > 0
                ? <EmpityComponent />
                : <ul className="flex flex-col w-full py-3">
                    {getAllProducts.map((el, index) => (
                        <li key={index} onClick={() => showDetail(el)} className="flex flex-row mb-2">
                            <div className="select-none w-full cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                <div className="flex-1 w-3/5 pl-1 mr-16">
                                    <div className="font-medium">{el.name}</div>
                                    <div className="text-gray-600 text-sm truncate ">{el.description}</div>
                                </div>
                                <div className="text-gray-600 w-1/5 text-xs truncate">${el.price}</div>
                            </div>
                        </li>
                    ))}
                </ul>
    )
}
