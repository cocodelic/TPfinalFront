import React from 'react'

const useMap = () => {
    const tagsMap = new Map()

    const array = [
        {
            type: 'input',
            element: <input></input>
        },
        {
            type: 'textarea',
            element: <textarea></textarea>
        },
        {
            type: 'select',
            element: <select></select>
        }
    ]

    const setMap = (tags) => {
        tags.map((tag) => {
            tagsMap.set(tag.type, tag.element)
        })
    }

    return {
        tagsMap,
        setMap
    }
}

export default useMap