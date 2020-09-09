import React from 'react'
import { Link } from 'react-router-dom'

export const HomeCardComponent = ({ title, description, linkTo = "/", btnText, img }) => {
    return (
        <div
            className="mr-6 w-full mt-8 py-6 px-2 flex-shrink-0 flex flex-col 
            bg-white rounded-lg text-black shadow-lg hover:border-blue-600 hover:shadow-2xl border-b-4 border-t-4"
        >
            <h3 className="flex items-center pt-1 pb-1 px-8 text-lg font-bold capitalize">
                <span>{title}</span>
                <Link to={linkTo} className="ml-2 cursor-pointer hover:opacity-25">
                    <i className="fas fa-chevron-right"></i>
                </Link>
            </h3>
            <div className="flex flex-col items-center mt-12">
                {img}

                <span className="my-4">
                    {description}
                </span>

                <Link to={linkTo} className="inline-block px-4 py-1 font-light text-lg text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none">
                    {btnText}
                </Link>
            </div>
        </div>
    )
}
