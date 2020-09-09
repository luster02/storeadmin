import React, { useEffect, useCallback, useState } from 'react'
import Axios from 'axios'
import { useLazyQuery } from '@apollo/client'
import { CURRENT_USER } from '../gql/queries/auth.queries'
import { heroku_rest } from '../global/endpoints'
import { getToken } from '../global/storage'

const AppContext = React.createContext()

export function AppProvider(props) {
    const [Current, { data }] = useLazyQuery(CURRENT_USER)
    const [Type, setType] = useState('')
    const [user, setUser] = useState({})
    const [Selected, setSelected] = useState({})

    const stableCurrentQuery = useCallback(() => {
        Current()
        if (data !== undefined) {
            const { currentUser } = data
            setUser(currentUser)
        }
    }, [data, Current])

    useEffect(() => {
        stableCurrentQuery()
    }, [stableCurrentQuery])

    function updateType(type) {
        setType(type)
    }

    function updateSlected(selected) {
        setSelected(selected)
    }

    async function uploadImage(id_gallery, file) {
        const token = getToken() || ''
        return await Axios.post(
            `${heroku_rest}/asset/${id_gallery}`,
            file,
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
        )
    }

    const value = {
        user,
        Type,
        updateType,
        Selected,
        uploadImage,
        updateSlected,
    }

    return <AppContext.Provider value={value} {...props} />
}

export function useApp() {
    const context = React.useContext(AppContext)
    if (!context) throw new Error('useApp is out from provider')
    return context
}