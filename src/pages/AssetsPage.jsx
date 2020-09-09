import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { FilePicker } from 'react-file-picker'
import { PageContainer } from '../components/PageContainer'
import { OnlyLoader, ModalLoaderComponent } from '../components/LoaderComponent'
import {
    BaseModal,
    BodyModal,
    HeaderModal,
    FooterModal,
    ContentModal,
    SuccesModal,
    ErrorModal
} from '../components/ModalComponent'
import { EmpityComponent } from '../components/EmpityComponent'
import { useApp } from '../state/AppContext'
import { GET_GALLERY } from '../gql/queries/assets.queries'
import { GET_ALL_ASSETS } from '../gql/queries/assets.queries'
import { CREATE_GALLERY } from '../gql/mutations/assets.mutations'
import { DELETE_ASSET } from '../gql/mutations/assets.mutations'

export const AssetsPage = () => {
    const app = useApp()
    const [Folder, setFolder] = useState('')
    const [Error, setError] = useState(null)
    const [ShowOptions, setShowOptions] = useState(false)
    const [InputModal, setInputModal] = useState(false)
    const [Success, setSuccess] = useState(null)
    const [showError, setShowError] = useState(null)
    const [ImageModal, setImageModal] = useState(null)
    const [uploading, setUploading] = useState(false)
    const { data, loading, refetch } = useQuery(GET_ALL_ASSETS, { errorPolicy: 'all', variables: { gallery_id: app.user.gallery.id } })
    const [mutate] = useMutation(CREATE_GALLERY, {
        errorPolicy: 'all',
        onCompleted: () => {
            setSuccess('Gallery created successfully')
            closeInputModal()
        }
    })
    const [mutateDelete] = useMutation(DELETE_ASSET, {
        errorPolicy: 'all',
        onCompleted: async () => {
            setImageModal(null)
            await refetch()
        }
    })
    const { getAllAssets } = data || {}

    function openInputModal() {
        setInputModal(true)
        setShowOptions(false)
    }

    async function upload(file) {
        try {
            const fm = new FormData()
            fm.append('file', file)
            setShowOptions(false)
            setUploading(true)
            await app.uploadImage(app.user.gallery.id, fm)
            await refetch()
            setUploading(false)
            setSuccess('image uploaded successfully')
        } catch (error) {
            setUploading(false)
            openErrorModal('internal server error')
        }
    }

    function openErrorModal(errorMsg) {
        setShowError(errorMsg)
        setShowOptions(false)
    }

    function closeInputModal() {
        setInputModal(false)
        setFolder('')
        setError(null)
    }

    function deleteImage(id) {
        mutateDelete({
            variables: { id }
        })
    }

    async function onSubmit() {
        setError(null)
        if (Folder === '') {
            setError('folder name is required')
            return
        } else {
            mutate({
                variables: {
                    galleryData: {
                        folder: Folder
                    },
                    id: app.user.gallery.id
                },
                refetchQueries: [{ query: GET_GALLERY, variables: { id: app.user.gallery.id } }],
                awaitRefetchQueries: true
            })
        }
    }

    return (
        <PageContainer>
            <ModalLoaderComponent Show={uploading} />
            <>
                <p className="font-bold text-2xl">Assets Page</p>
                <div>
                    {app.user.gallery.folder
                        ? app.user.gallery.folder
                        : "you don't have a gallery, you need to create a gallery to upload assets"
                    }
                </div>
                <button
                    className="inline-block mt-5 font-light text-xl text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none"
                    onClick={() => setShowOptions(true)}
                >
                    options
                        </button>
                <BaseModal Show={ShowOptions}>
                    <div className="bg-white w-56 p-4 rounded-lg">
                        {!app.user.gallery.folder &&
                            <button
                                className="hover:bg-gray-100 hover:text-blue-600 px-8 w-full py-2 text-gray-500 border-b border-gray-200 block outline-none focus:outline-none active:outline-none"
                                onClick={openInputModal}
                            >
                                new gallery
                                    </button>}
                        {app.user.gallery.folder &&
                            <FilePicker
                                extensions={['jpg', 'jpeg', 'png']}
                                dims={{ minWidth: 100, maxWidth: 5000, minHeight: 100, maxHeight: 5000 }}
                                onChange={file => upload(file)}
                                onError={error => openErrorModal(error)}
                            >
                                <button
                                    className="hover:bg-gray-100 hover:text-blue-600 px-8 w-full py-2 text-gray-500 border-b border-gray-200 block outline-none focus:outline-none active:outline-none"
                                >
                                    Upload new file
                            </button>
                            </FilePicker>
                        }
                        <button
                            className="hover:bg-gray-100 hover:text-blue-600 px-8 font-bold w-full py-2 text-red-500 block outline-none focus:outline-none active:outline-none"
                            onClick={() => setShowOptions(false)}
                        >
                            close options
                        </button>
                    </div>
                </BaseModal>
                <BaseModal Show={InputModal}>
                    <BodyModal>
                        <HeaderModal
                            title="Gallery name"
                        />
                        <ContentModal>
                            <div className="h-10 bg-gray-200 border rounded-lg flex justify-between shadow-lg items-center relative">
                                <input
                                    className="bg-transparent h-full w-full outline-none focus:bg-blue-100 px-3 appearance-none focus:border-blue-200 active:outline-none"
                                    type="text"
                                    name="folder"
                                    placeholder="Gallery name"
                                    autoComplete="false"
                                    value={Folder || ''}
                                    onChange={(e) => setFolder(e.target.value)}
                                />
                            </div>
                            {Error && <span className="text-red-500 font-medium ml-2 "> {Error}</span>}
                        </ContentModal>
                        <FooterModal>
                            <div onClick={() => closeInputModal()} className="inline-block px-4 py-1 font-light text-blue-500 border-r hover:text-blue-700 cursor-pointer">Cancel</div>
                            <button type="submit" onClick={() => onSubmit()} className="inline-block pl-4 py-1 font-medium text-red-500 hover:text-red-700 outline-none focus:outline-none active:outline-none">Confirm</button>
                        </FooterModal>
                    </BodyModal>
                </BaseModal>
                <BaseModal Show={Success}>
                    <SuccesModal
                        title="Success"
                        content={Success}
                        handleShow={setSuccess}
                    />
                </BaseModal>
                <BaseModal Show={showError}>
                    <ErrorModal
                        title="Error"
                        content={showError}
                        handleShow={setShowError}
                    />
                </BaseModal>
                <BaseModal Show={ImageModal}>
                    <img className="rounded-lg" style={{ maxHeight: '680px' }} src={ImageModal?.url} alt="arr" />
                    <BodyModal>
                        <FooterModal>
                            <div onClick={() => setImageModal(null)} className="inline-block px-4 py-1 font-light text-blue-500 border-r hover:text-blue-700 cursor-pointer">Cancel</div>
                            <button onClick={() => deleteImage(ImageModal.id)} className="inline-block pl-4 py-1 font-medium text-red-500 hover:text-red-700 outline-none focus:outline-none active:outline-none">Delete</button>
                        </FooterModal>
                    </BodyModal>
                </BaseModal>
                {loading
                    ? <OnlyLoader Show={loading} />
                    : <>
                        {getAllAssets.length > 0
                            ? <div className="grid-gallery mt-4">
                                {getAllAssets.map((el, index) => (
                                    <div className="grid-gallery__item transition duration-300 ease-in-out transform hover:-translate-y-2 cursor-pointer hover:shadow-2xl" key={index} >
                                        <img
                                            onClick={() => setImageModal(el)}
                                            className="grid-gallery__image rounded-lg"
                                            src={el.url}
                                            alt="arr"
                                        />
                                    </div>
                                ))}
                            </div>
                            : <div className="flex h-full w-full justify-center items-center">
                                <EmpityComponent />
                            </div>
                        }
                    </>
                }
            </>
        </PageContainer>

    )
}
