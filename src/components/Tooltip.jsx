import React from 'react'

export const Tooltip = ({ children, message }) => {
    return (
        <div className="tooltip">
            {children}
            <span className='tooltip-text bg-black text-white p-3 -mt-6 -ml-6 rounded'>
                {message}
            </span>
        </div>
    )
}
