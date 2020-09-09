import React from 'react'
import { useApp } from '../state/AppContext'
import { PageContainer } from '../components/PageContainer'
import { ContentComponent } from '../components/products_page/ContentComponent'
import { ListProducts } from '../components/products_page/ListProducts'

export const ProductsPage = () => {
    const app = useApp() || {}

    return (
        <PageContainer>
            <p className="font-bold text-2xl">Products</p>
            <div className="flex">
                <div className="w-2/5 h-screen mt-4 flex justify-center pr-6 border-dashed border-gray-600 border-r-2 mr-2 overflow-y-auto">
                    <ListProducts />
                </div>
                <div className="w-3/5  h-screen ml-12">
                    <ContentComponent type={app.Type} />
                </div>
            </div>
        </PageContainer>
    )
}
