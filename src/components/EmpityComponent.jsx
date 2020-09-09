import React from 'react'
import IMG_NO_DATA from '../assets/img/undraw_no_data_qbuo.svg'

export const EmpityComponent = () => (
    <div className="flex items-center h-full justify-center text-center">
        <div className="-mt-4">
            <img src={IMG_NO_DATA} alt="no data" style={{ height: 250 }} />
            <p className="mt-4 font-medium text-lg">no data</p>
        </div>
    </div>
)