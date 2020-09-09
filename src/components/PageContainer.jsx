import React from 'react'

export const PageContainer = ({ children }) => (
    <div className={"page-container px-6 md:px-16 py-6 overflow-y-auto"}>
        {children}
    </div>
)

