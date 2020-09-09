import React from 'react'
import { CreateComponent } from './CreateComponent'
import { DefaultContent } from './DefaultContent'
import { DetailComponent } from './DetailComponent'
import { SelectFile } from './SelectFile'
import { ViewFiles } from './ViewFiles'

export const ContentComponent = ({ type = '' }) => {
    switch (type) {
        case 'main':
            return <DefaultContent />

        case 'create':
            return <CreateComponent />

        case 'detail':
            return <DetailComponent />

        case 'select':
            return <SelectFile />

        case 'view':
            return <ViewFiles />

        default:
            return <DefaultContent />
    }
}
