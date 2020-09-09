import React from 'react'

export const AlertComponent = ({ color, title, message, icon, Show = null, handleShow = null }) => {

    function close() {
        handleShow(null)
    }

    return (
        Show && <div
            className={
                "text-white px-6 py-4 border-0 rounded relative mb-4 bg-" +
                color +
                "-500"
            }
        >
            <span className="text-xl inline-block mr-5 align-middle">
                {icon}
            </span>
            <span className="inline-block align-middle mr-8">
                <b className="capitalize mx-2">{title}!</b>{message}</span>
            <button
                className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                onClick={handleShow ? close : null}
            >
                <span>×</span>
            </button>
        </div>
    )
}
