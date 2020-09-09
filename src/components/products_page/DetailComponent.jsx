import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Tooltip } from '../Tooltip'
import { OnlyLoader } from '../LoaderComponent'
import { BaseModal, SuccesModal, ConfirmModal } from '../ModalComponent'
import { useApp } from '../../state/AppContext'
import {
    DELETE_PRODUCT,
    EDIT_PRODUCT,
} from '../../gql/mutations/product.mutations'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'

export const DetailComponent = () => {
    const app = useApp()
    const [DeleteModal, setDeleteModal] = useState(false)
    const [UpdateModal, setUpdateModal] = useState(false)
    const [Options, setOptions] = useState(false)
    const [Confirm, setConfirm] = useState(false)
    const { Selected } = app || {}
    const [mutationDelete, infoDelete] = useMutation(DELETE_PRODUCT, {
        errorPolicy: 'all',
        onCompleted: () => {
            setDeleteModal(true)
        }
    })
    const [mutationEdit, infoEdit] = useMutation(EDIT_PRODUCT, {
        errorPolicy: 'all',
        onCompleted: () => {
            setUpdateModal(true)
        }
    })
    const { register, errors, handleSubmit, setValue } = useForm()
    const inputStyle = 'bg-transparent h-full w-full outline-none focus:bg-blue-100 px-3 appearance-none focus:border-blue-200 active:outline-none'
    const inputErrorStyle = 'bg-red-200 text-white h-full w-full outline-none focus:bg-res-200 px-3 appearance-none focus:border-blue-200 active:outline-none'

    useEffect(() => {
        (() => {
            setValue('name', Selected.name)
            setValue('description', Selected.description)
            setValue('category', Selected.category)
            setValue('price', Selected.price)
        })()
    }, [Selected, setValue])

    function onSubmit(formData) {
        const { price } = formData
        const productData = { ...formData, price: parseFloat(price) }
        mutationEdit({
            variables: { productData, id: Selected.id },
            refetchQueries: [{ query: GET_PRODUCTS }],
            awaitRefetchQueries: true
        })
    }

    function deleteProduct() {
        mutationDelete({
            variables: { id: Selected.id },
            refetchQueries: [{ query: GET_PRODUCTS }],
            awaitRefetchQueries: true,
        })
    }

    return (
        (infoEdit.loading || infoDelete.loading)
            ? <OnlyLoader Show={infoEdit.loading || infoDelete.loading} />
            : <div className="py-6 px-3 flex-1 justify-center">
                <BaseModal Show={UpdateModal}>
                    <SuccesModal
                        title="Updated"
                        content="Product updated successfully"
                        handleShow={setUpdateModal}
                        onClose={() => app.updateType('main')}
                    />
                </BaseModal>
                <BaseModal Show={DeleteModal}>
                    <SuccesModal
                        title="Deleted"
                        content="Product deleted successfully"
                        handleShow={setDeleteModal}
                        onClose={() => app.updateType('main')}
                    />
                </BaseModal>
                <BaseModal Show={Confirm}>
                    <ConfirmModal
                        handleShow={setConfirm}
                        title="Delete product"
                        content="Are you sure to delete this product?"
                        confirm={() => deleteProduct()}
                    />
                </BaseModal>
                <BaseModal Show={Options}>
                    <div className="bg-white w-56 p-4 rounded-lg">
                        <button
                            className="hover:bg-gray-100 hover:text-blue-600 px-8 w-full py-2 text-gray-500 border-b border-gray-200 block outline-none focus:outline-none active:outline-none"
                            onClick={() => app.updateType('view')}
                        >
                            view images
                        </button>
                        <button
                            className="hover:bg-gray-100 hover:text-blue-600 px-8 w-full py-2 text-gray-500 border-b border-gray-200 block outline-none focus:outline-none active:outline-none"
                            onClick={() => app.updateType('select')}
                        >
                            add images
                        </button>
                        <button
                            className="hover:bg-gray-100 hover:text-blue-600 px-8 font-bold w-full py-2 text-red-500 block outline-none focus:outline-none active:outline-none"
                            onClick={() => setOptions(false)}
                        >
                            close options
                        </button>
                    </div>
                </BaseModal>
                <div className="flex">
                    <div className="flex mr-3 mt-6">
                        <Tooltip message="back">
                            <span
                                className="p-3 rounded-full hover:bg-white hover:shadow-lg cursor-pointer"
                                onClick={() => app.updateType('main')}
                            >
                                <i className="fas fa-arrow-left l"></i>
                            </span>
                        </Tooltip>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full ml-6 h-16 bg-white border rounded-lg flex justify-between shadow-lg items-center relative">
                            <div className="w-3/5 flex items-center h-full hover:bg-blue-100">
                                <input
                                    className={errors.name ? inputErrorStyle : inputStyle}
                                    type="text"
                                    placeholder="Product Name"
                                    name="name"
                                    autoComplete="false"
                                    ref={register({
                                        required: { value: true, message: 'product name is required' }
                                    })}
                                />
                            </div>
                            <div className="w-2/5 flex h-full items-center justify-end">
                                <div
                                    onClick={() => setConfirm(true)}
                                    className="inline-block pl-4 py-1 font-medium text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    delete
                                </div>
                                <button type="submit" className="inline-block px-4 py-1 font-light text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none">
                                    save
                                </button>
                            </div>
                        </div>
                        {errors.name && <span className="text-red-500 font-medium ml-2 "> {errors.name.message}</span>}
                        <div className="flex h-full w-full justify-center items-center ml-8">
                            <div className="mx-auto">
                                <div onClick={() => setOptions(true)} className="mx-auto my-6 h-56 w-56 flex text-center justify-center items-center shadow-md rounded-lg hover:shadow-2xl hover:bg-white cursor-pointer">
                                    <div className="space-y-6">
                                        <Tooltip message="select product images">
                                            <i className="fas fa-photo-video fa-5x"></i>
                                        </Tooltip>
                                        <p>this item has {Selected.assets.length} assets</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <textarea
                                        className={errors.description
                                            ? "autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-red-200 border  rounded-lg focus:outline-none focus:bg-red-200 shadow-lg "
                                            : "autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-white border  rounded-lg focus:outline-none focus:bg-blue-100 shadow-lg "
                                        }
                                        name="description"
                                        cols="50"
                                        placeholder="Product description"
                                        ref={register({
                                            required: { value: true, message: 'description is required' }
                                        })}
                                        rows="5"></textarea>
                                    {errors.description && <span className="text-red-500 font-medium ml-2 "> {errors.description.message}</span>}
                                </div>
                                <div className="w-full mt-10 h-full items-center mx-auto flex justify-between">
                                    <div>
                                        <div className="h-16 bg-white border rounded-lg flex justify-between shadow-lg items-center relative">
                                            <input
                                                className={errors.category ? inputErrorStyle : inputStyle}
                                                type="text"
                                                name="category"
                                                placeholder="Category"
                                                autoComplete="false"
                                                ref={register({
                                                    required: { value: true, message: 'category is required' }
                                                })}
                                            />
                                        </div>
                                        {errors.category && <span className="text-red-500 font-medium ml-2 "> {errors.category.message}</span>}
                                    </div>
                                    <div>
                                        <div className="h-16 bg-white border rounded-lg flex justify-between shadow-lg items-center relative">
                                            <input
                                                className={errors.price ? inputErrorStyle : inputStyle}
                                                type="number"
                                                name="price"
                                                placeholder="Price"
                                                autoComplete="false"
                                                ref={register({
                                                    required: { value: true, message: 'price is required' }
                                                })}
                                            />
                                        </div>
                                        {errors.price && <span className="text-red-500 font-medium ml-2 "> {errors.price.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}
