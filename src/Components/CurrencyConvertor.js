import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown';
import { HiArrowsRightLeft } from "react-icons/hi2";

export default function CurrencyConvertor() {

    // Currencies =>  http://api.frankfurter.app/currencies
    // Convertor =>  http://api.frankfurter.app/latest?amount=1&from=USD&to=INR


    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);

    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");

    const [convertedAmount,setConvertedAmount] = useState(null)

    const setAmountFunc = (e) => {
        setAmount(e)
        // console.log("amount :- ", amount)
    }

    const fetchCurrencies = async () => {
        try {
            const response = await fetch('https://api.frankfurter.app/currencies')
            const data = await response.json()

            setCurrencies(Object.keys(data))
            // console.log(data)
        }
        catch (err) {
            console.log("Error :- ", err)
        }
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const convertCurrency = async () => {
        if(!amount)return
        try{
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json();

            setConvertedAmount(data.rates[toCurrency])
            
        }catch(err){
            console.log("Erro :- ",err)
        }
    }

    const swapCurrencies = () => {
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }

    
    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
            <h2 className="mb-5 text-2xl font-semibold text-gray-700">
                Currency Convertor
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <Dropdown 
                    currencies={currencies} 
                    title="From : " 
                    currency={fromCurrency}    
                    setCurrencies={setFromCurrency}
                />
                 
                <div className="flex justify-center -mb-5 sm:mb-0">
                    <button 
                        className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                        onClick={swapCurrencies}
                    >
                        <HiArrowsRightLeft className="text-xl text-gray-700"/>
                    </button>
                </div>

                <Dropdown 
                    currencies={currencies} 
                    title="To : "
                    currency={toCurrency}     
                    setCurrencies={setToCurrency}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Amount:</label>
                <input
                    type="number"
                    value={amount}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
                    onChange={(e) => setAmountFunc(e.target.value)}
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={convertCurrency}
                >
                    Convert
                </button>
            </div>

            {convertedAmount && (
                <div className="mt-4 text-lg font-medium text-right text-green-600">
                    Converted Amount : {convertedAmount}
                </div>
            )}

            
        </div>
    )
}
