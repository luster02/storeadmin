import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { Navigation } from '../routes/main'
import { client } from '../global/apollo'
import { AuthProvider } from '../state/AuthContext'
import { AppProvider } from '../state/AppContext'

export const ProviderPage = () => (
    <ApolloProvider client={client}>
        <AuthProvider>
            <AppProvider>
                <BrowserRouter>
                    <Navigation />
                </BrowserRouter>
            </AppProvider>
        </AuthProvider>
    </ApolloProvider>
)
