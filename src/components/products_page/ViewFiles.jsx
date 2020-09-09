import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Tooltip } from '../Tooltip'
import { EmpityComponent } from '../EmpityComponent'
import { BaseModal, SuccesModal, BodyModal, FooterModal } from '../ModalComponent'
import { useApp } from '../../state/AppContext'
import { PULL_ASSETS } from '../../gql/mutations/product.mutations'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'

export const ViewFiles = () => {
    const app = useApp()
    const { Selected } = app || {}
    const [succesModal, setSuccesModal] = useState(null)
    const [ImageModal, setImageModal] = useState(null)
    const [mutate] = useMutation(PULL_ASSETS, {
        errorPolicy: 'all',
        variables: {
            id: Selected.id,
            assets: Selected.assets.map(el => el.id)
        },
        onCompleted: () => {
            setSuccesModal(true)
        },
        onError: (err) => {
            console.error('error', err)
        }
    })


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
                    content="images removed successfully"
                    handleShow={setSuccesModal}
                    onClose={() => app.updateType('main')}
                />
            </BaseModal>
            <BaseModal Show={ImageModal}>
                <img className="rounded-lg" style={{ maxHeight: '680px' }} src={ImageModal?.url} alt="arr" />
                <BodyModal>
                    <FooterModal>
                        <div onClick={() => setImageModal(null)} className="inline-block px-4 py-1 font-light text-blue-500 border-r hover:text-blue-700 cursor-pointer">Cancel</div>
                    </FooterModal>
                </BodyModal>
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
                    <p className="font-medium ml-4">Images of this product</p>
                    <button
                        className={Selected.assets.length > 0
                            ? "inline-block px-4 mt-5 font-light text-lg text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none"
                            : "inline-block px-4 mt-5 font-light text-lg text-black border-r  outline-none focus:outline-none active:outline-none cursor-not-allowed"
                        }
                        onClick={Selected.assets.length > 0 ? save : null}
                    >
                        remove {Selected.assets.length} images
                </button>
                </div>
            </div>
            <div className="grid-gallery__item mt-4">
                {Selected.assets.length > 0
                    ? <div className="grid-gallery mt-6">
                        {Selected.assets.map((el, index) => (
                            <div
                                className="grid-gallery__item cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
                                onClick={() => setImageModal(el)}
                                key={index} >
                                <img
                                    className="grid-gallery__image rounded-lg"
                                    src={el.url}
                                    alt="arr"
                                />
                            </div>
                        ))}
                    </div>
                    : <div className="mt-10">
                        <EmpityComponent />
                    </div>
                }
            </div>
        </div>
    )
}
