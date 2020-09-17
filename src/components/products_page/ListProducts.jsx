import React, { useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { EmpityComponent } from '../EmpityComponent'
import { Tooltip } from '../Tooltip'
import { OnlyLoader } from '../LoaderComponent'
import { GET_PRODUCTS, GET_PRODUCTS_BY_NAME } from '../../gql/queries/product.queries'
import { useApp } from '../../state/AppContext'

export const ListProducts = () => {
    const app = useApp()
    let [SearchBar, setSearchBar] = useState(false)
    const [Params, setParams] = useState(null)
    const [cache, setCache] = useState([])
    const [FusionArray, setFusionArray] = useState([])
    const [NotFound, setNotFound] = useState(null)
    const { loading } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'cache-and-network',
        onCompleted: ({ getAllProducts = [] }) => {
            setFusionArray(getAllProducts)
        }
    })
    const [GetByName, NameInfo] = useLazyQuery(GET_PRODUCTS_BY_NAME, {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        onCompleted: ({ getProductsByName = [] }) => {
            setFusionArray(getProductsByName)
            getProductsByName.length === 0 ? setNotFound(true) : setNotFound(null)
        }
    })

    function showDetail(selected) {
        app.updateSlected(selected)
        app.updateType('detail')
    }

    function toogleSearchBar() {
        if (SearchBar) {
            setSearchBar(false)
            clearBar()
        } else {
            setSearchBar(true)
            setCache(FusionArray)
        }
    }

    function clearBar() {
        setFusionArray(cache)
        setParams(null)
        setNotFound(null)
    }

    function onChangeParams(e) {
        setParams(e.target.value)
        GetByName({
            variables: { name: e.target.value }
        })
    }

    return (
        loading
            ? <OnlyLoader Show={loading} />
            : !FusionArray.length > 0 && !NotFound
                ? <EmpityComponent />
                : <div className="w-full h-full ">
                    <div className="flex items-center mb-3">
                        <div
                            className={SearchBar
                                ? "w-4/5 h-12 bg-white border rounded-full flex justify-between shadow-lg items-center relative"
                                : "w-4/5 h-12 hidden bg-white border rounded-full justify-between shadow-lg items-center relative"
                            }
                        >
                            <input
                                className="bg-transparent h-full w-full outline-none px-3 appearance-none focus:border-blue-200 active:outline-none"
                                type="text"
                                placeholder="Search"
                                autoComplete="false"
                                onChange={(e) => onChangeParams(e)}
                                value={Params || ''}
                            />
                            {Params && <Tooltip message="clear">
                                <span onClick={clearBar}>
                                    <i className="fas fa-trash mr-5 cursor-pointer"></i>
                                </span>
                            </Tooltip>}
                        </div>
                        <div
                            className={SearchBar
                                ? "w-1/5 flex my-3 justify-center"
                                : "w-full flex my-3 justify-end"
                            }
                        >
                            <Tooltip message={SearchBar ? "close" : "search"}>
                                <span
                                    className="p-3 rounded-full hover:bg-white hover:shadow-lg cursor-pointer"
                                    onClick={toogleSearchBar}
                                >
                                    <i className="fas fa-search"></i>
                                </span>
                            </Tooltip>
                        </div>
                    </div>
                    {NameInfo.loading
                        ? <div className="flex w-full justify-center items-center">
                            Searching ...
                        </div>
                        : <>
                            {NotFound
                                ? <div className="flex w-full justify-center items-center">
                                    not found results
                                    </div>
                                : <ul className="flex flex-col w-full py-3">
                                    {FusionArray.map((el, index) => (
                                        <li key={index} onClick={() => showDetail(el)} className="flex flex-row mb-2">
                                            <div className="select-none w-full cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                                <div className="flex-1 w-3/5 pl-1 mr-16">
                                                    <div className="font-medium">{el.name}</div>
                                                    <div className="text-gray-600 text-sm truncate ">{el.description}</div>
                                                </div>
                                                <div className="text-gray-600 w-1/5 text-xs truncate">${el.price}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            }
                        </>
                    }

                </div>
    )
}
