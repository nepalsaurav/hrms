import React, { useEffect, useRef, useState } from 'react'
import FocusTrap from 'focus-trap-react'
import { Form, useActionData } from 'react-router-dom'

import type { Error } from './Types';
const MyForm: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const form = useRef<HTMLFormElement>(null)
    const errors: Error = useActionData() || {}
    useEffect(() => {
        if (Object.keys(errors).length != 0) {
            setLoading(false)
            form?.current?.reset()
        }
    }, [errors])

    const handleLoginFormSubmit = () => {
        setLoading(true)
    }
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">User Login</h2>
                            <p className="text-red-600">{errors.general}</p>
                            <hr />
                            <FocusTrap>
                                <Form method="post" action="/login" ref={form} onSubmit={handleLoginFormSubmit}>
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="label-text text-lg">Username</span>
                                        </div>
                                        <input type="text" name="username" placeholder="eg. John Doe" className="input input-bordered w-full max-w-xs" autoFocus required />
                                    </label>
                                    <br />
                                    <label className="form-control w-full max-w-xs">
                                        <div className="label">
                                            <span className="text-lg label-text">Password</span>
                                        </div>
                                        <input type="password" name="password" placeholder="password" className="input input-bordered w-full max-w-xs" required />
                                    </label>
                                    <br />
                                    <button type="submit" className="btn btn-primary btn-wide">
                                        {loading && <span className="loading loading-spinner"></span>}
                                        Login
                                    </button>
                                </Form>
                            </FocusTrap>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default MyForm;
