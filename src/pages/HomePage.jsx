import React from 'react'
import { useApp } from '../state/AppContext'
import { HomeCardComponent } from '../components/HomeCardComponent'
import { PageContainer } from '../components/PageContainer'
import IMG_PRODUCT from '../assets/img/undraw_product_photography_91i2.svg'
import IMG_ORDERS from '../assets/img/undraw_receipt_ecdd.svg'
import IMG_CUSTOMERS from '../assets/img/undraw_meet_the_team_e5b7.svg'
import IMG_ASSETS from '../assets/img/undraw_asset_selection_ix3v.svg'
import IMG_SHOP from '../assets/img/undraw_web_shopping_dd4l.svg'

export const HomePage = () => {
    const app = useApp()

    return (
        <PageContainer>
            <p className="font-bold text-2xl">Overview</p>
            <p className="font-medium text-lg">{app.user ? app.user.username : 'user'}</p>
            <div className="grid gap-x-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                <HomeCardComponent
                    title="All products"
                    linkTo="/products"
                    description="Explore your products"
                    img={<img src={IMG_PRODUCT} alt="products" style={{ height: 200 }} />}
                    btnText="View all"
                />
                <HomeCardComponent
                    title="All assets"
                    linkTo="/assets"
                    description="Explore your assetes"
                    img={<img src={IMG_ASSETS} alt="products" style={{ height: 200 }} />}
                    btnText="View all"
                />
                <HomeCardComponent
                    title="All customers"
                    linkTo="/customers"
                    description="Explore your customers"
                    img={<img src={IMG_CUSTOMERS} alt="products" style={{ height: 200 }} />}
                    btnText="View all"
                />
                <HomeCardComponent
                    title="All orders"
                    linkTo="/orders"
                    description="Explore your orders"
                    img={<img src={IMG_ORDERS} alt="products" style={{ height: 200 }} />}
                    btnText="View all"
                />
                <HomeCardComponent
                    title="View shop"
                    linkTo="/shop"
                    description="Manage your shop"
                    img={<img src={IMG_SHOP} alt="products" style={{ height: 200 }} />}
                    btnText="Manage"
                />
            </div>
        </PageContainer>
    )
}