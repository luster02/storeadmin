import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { REGISTER } from '../gql/mutations/auth.mutations'
import { AlertComponent } from '../components/AlertComponent'
import { ModalLoaderComponent } from '../components/LoaderComponent'

export const RegisterPage = () => {
    const history = useHistory()
    const { register, handleSubmit, errors, setError } = useForm();
    const [mutate, { loading, error }] = useMutation(REGISTER, {
        errorPolicy: 'all',
        onCompleted: () => {
            history.replace('/login')
        }
    })

    const inputs = [
        { name: 'email', label: 'email', type: 'email', placeholder: 'email@email.com', required: true, requiredMSG: 'username is required', patt: /\S+@\S+\.\S+/, pattMSG: 'invalid email' },
        { name: 'username', label: 'username', type: 'text', placeholder: 'myusername23', required: true, requiredMSG: 'username is required', patt: null, pattMSG: null },
        { name: 'password', label: 'Password', type: 'password', placeholder: '**********', required: true, requiredMSG: 'password is required', patt: null, pattMSG: null },
        { name: 'password2', label: 'Confirm Password', type: 'password', placeholder: '**********', required: true, requiredMSG: 'password is required', patt: null, pattMSG: null }
    ]

    async function onSubmit({ username, password, email, password2 }) {
        setError(false)
        if (password !== password2) {
            setError('password', { type: 'manual', message: 'Passwords do not match' })
            setError('password2', { type: 'manual', message: 'Passwords do not match' })
        } else {
            mutate({
                variables: { user: { username, email, password } }
            })
        }
    }

    return (
        <main>
            <section className="absolute w-full h-full">
                <div className="absolute top-0 w-full h-full bg-gray-900 back-image"></div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                            <ModalLoaderComponent Show={loading} />
                            <AlertComponent color="red" title="Error" message={error?.message} Show={error} />
                            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                <div className="rounded-t mb-0 px-6 py-6">
                                    <div className="text-center mb-3">
                                        <h6 className="text-gray-600 text-lg font-bold">
                                            Sign Up
                                    </h6>
                                    </div>
                                    <hr className="mt-6 border-b-1 border-gray-400" />
                                </div>
                                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {inputs.map((el, index) => (
                                            <div key={index} className="relative w-full mb-3">
                                                <label
                                                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                                    htmlFor={el.name}
                                                >
                                                    {el.label}
                                                </label>
                                                <input
                                                    type={el.type}
                                                    id={el.name}
                                                    name={el.name}
                                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                                                    placeholder={el.placeholder}
                                                    ref={register({
                                                        required: { value: el.required, message: el.requiredMSG },
                                                        pattern: { value: el.patt, message: el.pattMSG }
                                                    })}
                                                />
                                                <span className="text-red-500">
                                                    {errors[el.name] && errors[el.name].message}
                                                </span>
                                            </div>
                                        ))}
                                        <div className="text-center mt-6">
                                            <button
                                                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                                type="submit"
                                                style={{ transition: "all .15s ease" }}
                                            >
                                                Register
                                            </button>
                                            <div className="mt-4">
                                                <Link
                                                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                    to="/login"
                                                >
                                                    Login here
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
