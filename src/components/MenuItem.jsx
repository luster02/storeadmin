import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const MenuItem = ({ children, LinkTo = '/' }) => {
    const { pathname } = useLocation()

    return (
        <li className={pathname === LinkTo ? "bg-blue-500 text-white" : "hover:bg-gray-300"}>
            <Link
                to={LinkTo}
                className="h-16 px-6 flex  justify-center items-center w-fullfocus:text-orange-500"
            >
                {children}
            </Link>
        </li>
    )
}
