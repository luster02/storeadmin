import React from 'react'
import { Tooltip } from '../components/Tooltip'
import { MenuItem } from '../components/MenuItem'
import { useAuth } from '../state/AuthContext'
import SKIP_LOGO from '../assets/img/skipforce.jpg'

export const NavbarComponent = () => {
    const auth = useAuth()

    return (
        <nav className="bg-white text-gray-700 shadow w-20  justify-between text-center flex flex-col ">
            <div className="mt-10 mb-10">
                <Tooltip message="skipforce">
                    <img
                        src={SKIP_LOGO}
                        className="rounded-full w-10 h-10 mb-3 mx-auto"
                        alt="skip force logo"
                    />
                </Tooltip>
                <div className="mt-10">
                    <ul>
                        <MenuItem LinkTo="/">
                            <Tooltip message="home">
                                <i className="fas fa-home h-5 w-5"></i>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem LinkTo="/products">
                            <Tooltip message="products">
                                <i className="fas fa-cash-register h-5 w-5"></i>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem LinkTo="/assets">
                            <Tooltip message="assets">
                                <i className="fas fa-photo-video h-5 w-5"></i>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem LinkTo="/customers">
                            <Tooltip message="customers">
                                <i className="fas fa-users h-5 w-5"></i>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem LinkTo="/orders">
                            <Tooltip message="orders">
                                <i className="fas fa-clipboard-list h-5 w-5"></i>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem LinkTo="/shop">
                            <Tooltip message="shop">
                                <i className="fas fa-store h-5 w-5"></i>
                            </Tooltip>
                        </MenuItem>
                    </ul>
                </div>
            </div>
            <div onClick={auth.logOut} className="h-16 mx-auto flex justify-center items-center
				w-full focus:text-orange-500 hover:bg-red-500 hover:text-white focus:outline-none cursor-pointer">
                <Tooltip message="log out">
                    <i className="fas fa-power-off"></i>
                </Tooltip>
            </div>
        </nav>
    )
}
