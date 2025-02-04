import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import CreateCustomModelFirst from './CreateCustomModelFirst'
import CreateCustomModelSecond from './CreateCustomModelSecond'
import CreateCustomModelThird from './CreateCustomModelThird'

const CreateCustomModel = ({ createCustomModel, setCreateCustomModel }) => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({})

    const handleStepOne = (data) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setStep(2)
    }

    const handleStepTwo = (data) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setStep(3)
    }

    const handleStepThree = (data) => {
        setFormData((prev) => ({ ...prev, ...data }))
        setCreateCustomModel(false)
    }

    return (
        <Dialog open={createCustomModel} onOpenChange={setCreateCustomModel}>
            <DialogContent className="sm:max-w-[425px] w-full overflow-y-scroll h-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Offer</DialogTitle>
                </DialogHeader>
                {step === 1 && <CreateCustomModelFirst onSubmit={handleStepOne} />}
                {step === 2 && <CreateCustomModelSecond onSubmit={handleStepTwo} />}
                {step === 3 && <CreateCustomModelThird onSubmit={handleStepThree} />}
            </DialogContent>
        </Dialog>
    )
}

export default CreateCustomModel