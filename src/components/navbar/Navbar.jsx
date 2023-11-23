"use client";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import Link from 'next/link'
import React from 'react'

function Navbar() {
    const { getUser, logout, isLogged } = useContext(UserContext);
    const user = getUser();
    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <Link href="/" className="flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Online Notes
                </Link>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
                    <Link className="font-medium text-blue-500" href="/" aria-current="page">{user.name}</Link>
                    {
                        isLogged() ? (
                            <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" onClick={() => {
                                logout()
                            }}>
                                Logout
                            </button>

                        ) : (
                            <Link href='/login'>
                                <button type="button" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                    logIn
                                </button>
                            </Link>
                        )
                    }
                </div>
            </nav>
        </header >
    )
}

export default Navbar