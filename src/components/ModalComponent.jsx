import React from 'react'

export const BaseModal = ({ Show, children }) => {
    return (
        Show && <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {children}
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export const BodyModal = ({ children }) => (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4">
        <div className="flex flex-col min-h-full">
            {children}
        </div>
    </div>
)

export const HeaderModal = ({ title }) => (
    <div className="px-6 py-4 border-b">
        <div className="text-xl text-center">{title}</div>
    </div>
)

export const ContentModal = ({ children }) => (
    <div className="px-6 py-6 flex-grow ">
        {children}
    </div>
)

export const FooterModal = ({ children }) => (
    <div className="px-6 py-4 border-t">
        <div className="flex flex-row justify-end">
            <div className="flex flex-row">
                {children}
            </div>
        </div>
    </div>
)

export const SuccesModal = ({ handleShow, title, content, onClose }) => {

    function closeModal() {
        handleShow(false)
        if (onClose) onClose()
    }

    return (
        <BodyModal>
            <HeaderModal
                title={title}
            />
            <ContentModal>
                <div className="pt-6 flex justify-center">
                    <i className="fas fa-check-circle fa-5x mb-5 text-green-400"></i>
                </div>
                <p className="text-gray-600 text-lg">
                    {content}
                </p>
            </ContentModal>
            <FooterModal>
                <div onClick={closeModal} className="inline-block px-4 py-1 font-light text-blue-500 border-r cursor-pointer">
                    ok
                </div>
            </FooterModal>
        </BodyModal>
    )
}


export const ErrorModal = ({ handleShow, title, content, onClose }) => {

    function closeModal() {
        handleShow(false)
        if (onClose) onClose()
    }

    return (
        <BodyModal>
            <HeaderModal
                title={title}
            />
            <ContentModal>
                <div className="pt-6 flex justify-center">
                    <i className="fas fa-times fa-5x mb-5 text-red-500"></i>
                </div>
                <p className="text-gray-600 text-lg">
                    {content}
                </p>
            </ContentModal>
            <FooterModal>
                <div onClick={closeModal} className="inline-block px-4 py-1 font-light text-blue-500 border-r cursor-pointer">
                    ok
                </div>
            </FooterModal>
        </BodyModal>
    )
}

export const ConfirmModal = ({ handleShow, title, content, confirm }) => {

    function closeModal() {
        handleShow(false)
    }

    function confirAction() {
        if (confirm) {
            confirm()
            closeModal()
        } else {
            closeModal()
        }
    }

    return (
        <BodyModal>
            <HeaderModal
                title={title}
            />
            <ContentModal>
                <div className="pt-6 flex justify-center">
                    <i className="fas fa-exclamation-circle fa-5x mb-5 text-yellow-400"></i>
                </div>
                <p className="text-gray-600 text-lg">
                    {content}
                </p>
            </ContentModal>
            <FooterModal>
                <button onClick={closeModal} className="inline-block px-4 py-1 font-light text-blue-500 border-r hover:text-blue-700 outline-none focus:outline-none active:outline-none">Cancel</button>
                <button onClick={confirAction} className="inline-block pl-4 py-1 font-medium text-red-500 hover:text-red-700 outline-none focus:outline-none active:outline-none">Confirm</button>
            </FooterModal>
        </BodyModal>
    )
}
