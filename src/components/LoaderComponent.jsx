import React from 'react'

export const LoaderComponent = () => (
    <div className="flex absolute w-full h-full items-center bg-black text-white">
        <div className="loader" />
    </div>
)

export const ModalLoaderComponent = ({ Show = false }) => (
    Show && <>
        <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="loader" />
            </div>
        </div>
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
)

export const OnlyLoader = ({ Show = false }) => (
    Show && <div className="loader2" />
) 