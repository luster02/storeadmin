import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { useApp } from '../../state/AppContext'
import { Tooltip } from '../Tooltip'
import { OnlyLoader } from '../LoaderComponent'
import { BaseModal, SuccesModal } from '../ModalComponent'
import { CREATE_PRODUCT } from '../../gql/mutations/product.mutations'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'
import IMG_BUILD from '../../assets/img/undraw_work_together_h63l.svg'

export const CreateComponent = () => {
    const app = useApp()
    const { register, handleSubmit, errors } = useForm();
    const [Show, setShow] = useState(false)
    const [mutate, { loading }] = useMutation(CREATE_PRODUCT, {
        errorPolicy: 'all',
        onCompleted: () => {
            setShow(true)
        }
    })
    const inputStyle = 'bg-transparent h-full w-full outline-none focus:bg-blue-100 px-3 appearance-none focus:border-blue-200 active:outline-none'
    const inputErrorStyle = 'bg-red-200 text-white h-full w-full outline-none focus:bg-res-200 px-3 appearance-none focus:border-blue-200 active:outline-none'

    function onSubmit(formData) {
        const { price } = formData
        const productData = { ...formData, price: parseFloat(price) }
        mutate({
            variables: { productData, id: app.user.shop.id },
            refetchQueries: [{ query: GET_PRODUCTS }],
            awaitRefetchQueries: true
        })
    }

    return (
        loading
            ? <div className="flex h-full w-full justify-center items-center">
                <OnlyLoader Show={loading} />
            </div>
            : <div className="py-6 px-3 flex-1 justify-center">
                <BaseModal Show={Show}>
                    <SuccesModal
                        title="Created"
                        content="Product created successfully"
                        handleShow={setShow}
                        onClose={() => app.updateType('main')}
                    />
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
                                <button type="submit" className="inline-block px-4 py-1 font-light text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none">
                                    save
                                </button>
                            </div>
                        </div>
                        {errors.name && <span className="text-red-500 font-medium ml-2 "> {errors.name.message}</span>}
                        <div className="flex h-full w-full mt-12 justify-center items-center ml-8">
                            <div>
                                <img className="ml-8" src={IMG_BUILD} alt="build" style={{ height: 200 }} />
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
