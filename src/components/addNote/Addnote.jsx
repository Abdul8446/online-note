"use client"
import React, { useState } from 'react'
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import axios from 'axios';

function Addnote({ refresh }) {
    const [note, setNote] = useState('')
    const { getUser } = useContext(UserContext);
    const user = getUser();
    const handleSubmit = () => {
        const data = {
            user: user._id,
            note
        }
        axios.post('/api/notes', data).then((res) => {
            if (res.status == 201) {
                alert('note added')
                setNote('')
                refresh()
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className='text-white text-center'>Add new note</p>
            <textarea id="multi-line-input" aria-label="multi-line input" cols="30"
                rows="10" className="m-1 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder='Add a new Note'
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <div className='flex-row text-center p-4'>
                <button type="button" className="w-full m-4 p-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-200 font-semibold text-blue-500 hover:text-white hover:bg-blue-500 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default Addnote