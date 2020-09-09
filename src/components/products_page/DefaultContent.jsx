import React from 'react'
import { useApp } from '../../state/AppContext'
import IMG_PRODUCT from '../../assets/img/undraw_product_photography_91i2.svg'

export const DefaultContent = () => {
    const app = useApp() || {}
    const { updateType } = app
    return (
        <>
            <button
                className="inline-block px-4 mt-5 font-light text-lg text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none"
                onClick={() => updateType('create')}
            >
                create product
            </button>
            <div className="flex items-center h-full justify-center ">
                <div className="space-y-4">
                    <p className="font-medium text-3xl">Supercharged product information management</p>
                    <p className="mb-4">
                        Are you ready to create some products? This is where the magic happens.
                    </p>
                    <img className="ml-10" src={IMG_PRODUCT} alt="product" style={{ height: 420 }} />
                </div>
            </div>
        </>
    )
}
