import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

//components
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { LoaderComponent } from '../components/LoaderComponent'
import { NavbarComponent } from '../components/Navbar'

//pages
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProductsPage } from '../pages/ProductsPage'
import { AssetsPage } from '../pages/AssetsPage'
import { CustomersPage } from '../pages/CustomersPage'
import { OrdersPage } from '../pages/OrdersPage'
import { ShopPage } from '../pages/ShopPage'

export const Navigation = () => {
    const auth = useAuth()

    return (
        <div className="flex flex-row h-full">
            {auth.isAuth && <NavbarComponent />}
            {auth.loading
                ? <LoaderComponent />
                : <Switch>
                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute exact path="/products" component={ProductsPage} />
                    <PrivateRoute exact path="/assets" component={AssetsPage} />
                    <PrivateRoute exact path="/customers" component={CustomersPage} />
                    <PrivateRoute exact path="/orders" component={OrdersPage} />
                    <PrivateRoute exact path="/shop" component={ShopPage} />
                    <PublicRoute path="/login" component={LoginPage} />
                    <PublicRoute path="/register" component={RegisterPage} />
                    <Redirect to="/" />
                </Switch>
            }
        </div>
    )
}
