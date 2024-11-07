import React from 'react'

function Payout() {
    return (
        <div className="bg-white rounded-lg shadow px-7 py-8  mx-auto">
            <div className="flex justify-between pb-12">
                <div>
                    <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Time period</h4>
                    <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">15 Jul - 21 Jul, 2024</p>
                </div>
                <div>
                    <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Orders</h4>
                    <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">0</p>
                </div>
                <div>
                    <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Payout date</h4>
                    <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">24 Jul, 2024</p>
                </div>
                <div>
                    <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Estimated amount</h4>
                    <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">₹199.8</p>
                </div>
                <div>
                    <h4 className="text-[#92A5B5] font-xl font-normal font-inter text-center mb-6">Transactions</h4>
                    <p className="text-[#4A5E6D] font-xl font-normal font-inter text-center">View</p>
                </div>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Total orders</h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">0</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Customer Payable (A)</h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹0.00</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Service fees & payment mechanism fees (B)
                </h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹0.00</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Government charges (C)
                </h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹0.00</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Other order level deductions (D)
                </h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹0.00</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Investments in growth services & miscellaneous deductions (E)
                </h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹199.80</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Investments in Hyperpure (F)
                </h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹0.00</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Total Additions (G)
                </h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹0.00</p>
            </div>
            <div className="flex justify-between border-y py-4">
                <h4 className="text-[#323F49] font-xl font-normal font-inter">Estimated net payout (ABC-D-E-F+G)</h4>
                <p className="text-[#323F49] font-xl font-normal font-inter">₹199.80</p>
            </div>
        </div>
    )
}

export default Payout