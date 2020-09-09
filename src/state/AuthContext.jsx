import React, { useState, useEffect, useCallback } from 'react'
import { useLazyQuery } from '@apollo/client'
import { saveToken, removeToken } from '../global/storage'
import { CURRENT_USER_AUTH } from '../gql/queries/auth.queries'

const AuthContext = React.createContext()

export function AuthProvider(props) {
    const [getUserAuth, { data, loading }] = useLazyQuery(CURRENT_USER_AUTH)
    const [isAuth, setAuthState] = useState(false)
    const [reload, setReload] = useState(false)

    const stableGetUserAuth = useCallback(() => {
        getUserAuth()
        if (data !== undefined) setAuthState(true);
    }, [data, getUserAuth])


    useEffect(() => {
        (() => {
            setReload(false)
            stableGetUserAuth()
        })()
    }, [stableGetUserAuth, reload])


    function loginSuccess(token = "") {
        saveToken(token)
        setAuthState(true)
        setReload(true)
    }

    function onAuthSuccess() {
        setAuthState(true)
    }

    function logOut() {
        removeToken()
        setAuthState(false)
    }

    const value = {
        isAuth,
        loading,
        loginSuccess,
        onAuthSuccess,
        logOut
    }

    return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) throw new Error('use Auth is out from context provider');
    return context
}