import React from 'react'

export default function Dropdown(props) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor={props.title} >{props.title}</label>

            <div className="mt-1 relative">
                <select
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:bg-indigo-50"
                    value={props.currency}
                    onChange={(e) => props.setCurrencies(e.target.value)}
                >
                    {props.currencies.map((curr) => {
                        return (
                            <option value={curr} key={curr}>{curr}</option>
                        );
                    })}
                </select>
            </div>
        </div>
    )
}
