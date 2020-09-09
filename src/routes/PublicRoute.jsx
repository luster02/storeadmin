import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../state/AuthContext'

export const PublicRoute = ({ component: Component, data, ...rest }) => {
    const auth = useAuth()
    return (
        <Route {...rest} render={props => (
            (auth.isAuth)
                ? <Redirect to="/" />
                : <Component {...props} />
        )} />
    );
};
