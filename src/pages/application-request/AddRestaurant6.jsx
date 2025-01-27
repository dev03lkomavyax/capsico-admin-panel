import Plan from '@/components/Plan'
import { Badge, Check } from 'lucide-react'
import React from 'react'

const AddRestaurant6 = () => {
    return (
        <div className='grid grid-cols-3 gap-5 items-center'>
            {/* <Plan /> */}
            <div className="p-6 max-w-xl">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-black" />
                        <h2 className="text-lg font-medium">Subscription plan</h2>
                    </div>
                    <div className="text-2xl font-bold">$10</div>
                </div>

                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 mb-6">
                    5% Discount
                </Badge>

                <ul className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <li key={i} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-black shrink-0" />
                            <span className="text-gray-600">Lorem ipsum dolor sit amet</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AddRestaurant6