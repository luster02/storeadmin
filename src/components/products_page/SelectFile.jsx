import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { OnlyLoader } from '../LoaderComponent'
import { Tooltip } from '../Tooltip'
import { BaseModal, SuccesModal } from '../ModalComponent'
import { useApp } from '../../state/AppContext'
import { GET_ALL_ASSETS } from '../../gql/queries/assets.queries'
import { PUSH_ASSETS } from '../../gql/mutations/product.mutations'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'

export const SelectFile = () => {
    const app = useApp()
    const { Selected } = app || {}
    const [succesModal, setSuccesModal] = useState(null)
    const [ListFiles, setListFiles] = useState([])
    const { data, loading } = useQuery(GET_ALL_ASSETS, { errorPolicy: 'all', variables: { gallery_id: app.user.gallery.id } })
    const [mutate] = useMutation(PUSH_ASSETS, {
        errorPolicy: 'all',
        variables: {
            id: Selected.id,
            assets: ListFiles
        },
        onCompleted: () => {
            setSuccesModal(true)
        },
        onError: (err) => {
            console.error('error', err)
        }
    })
    const { getAllAssets = [] } = data || {}

    function PushImage(element) {
        if (ListFiles.includes(element)) {
            setListFiles(ListFiles.filter(el => el !== element))
        } else {
            setListFiles(ListFiles => [...ListFiles, element])
        }
    }

    function save() {
        mutate({
            refetchQueries: [{ query: GET_PRODUCTS }],
            awaitRefetchQueries: true
        })
    }

    return (
        <div className="flex-1 justify-center">
            <BaseModal Show={succesModal}>
                <SuccesModal
                    title="Success"
                    content="images added successfully"
                    handleShow={setSuccesModal}
                    onClose={() => app.updateType('main')}
                />
            </BaseModal>
            <div className="flex  mr-3 mt-6">
                <Tooltip message="back">
                    <span
                        className="p-3 rounded-full hover:bg-white hover:shadow-lg cursor-pointer"
                        onClick={() => app.updateType('detail')}
                    >
                        <i className="fas fa-arrow-left l"></i>
                    </span>
                </Tooltip>
                <div>
                    <p className="font-medium ml-4">Select images for this product</p>
                    <button
                        className={ListFiles.length > 0
                            ? "inline-block px-4 mt-5 font-light text-lg text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none"
                            : "inline-block px-4 mt-5 font-light text-lg text-black border-r  outline-none focus:outline-none active:outline-none cursor-not-allowed"
                        }
                        onClick={ListFiles.length > 0 ? save : null}
                    >
                        save {ListFiles.length} images
                </button>
                </div>
            </div>

            <div className="grid-gallery__item mt-4">
                {loading
                    ? <OnlyLoader Show={loading} />
                    : <div className="grid-gallery mt-6">
                        {getAllAssets.map((el, index) => (
                            <div
                                className={ListFiles.includes(el.id)
                                    ? "grid-gallery__item cursor-pointer border-blue-500 border-b-8 transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
                                    : "grid-gallery__item cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
                                }
                                key={index} >
                                <img
                                    onClick={() => PushImage(el.id)}
                                    className="grid-gallery__image rounded-lg"
                                    src={el.url}
                                    alt="arr"
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    )
}
