import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

import { VehicleEnums } from '@/enums/filters'
import { Control, Controller, UseFormReset } from 'react-hook-form'
import { TfilterTypes } from '@/hooks/useCarFilteringData'

const Car = dynamic(() => import('/public/icons/car.svg')) as React.FC<React.SVGProps<SVGSVGElement>>
const Tractor = dynamic(() => import('/public/icons/Tractor.svg')) as React.FC<React.SVGProps<SVGSVGElement>>
const Motorcycle = dynamic(() => import('/public/icons/motorcycle.svg')) as React.FC<React.SVGProps<SVGSVGElement>>

type TcomponentName = 'car' | 'tractor' | 'motorcycle'

const vehicles: Array<{ id: number, componentName: TcomponentName }> = [
    {
        id: VehicleEnums.car,
        componentName: 'car',
    },
    {
        id: VehicleEnums.tractor,
        componentName: 'tractor',
    },
    {
        id: VehicleEnums.motorcycle,
        componentName: 'motorcycle',
    }
]

type Props = {
    control: Control<any>
    reset: UseFormReset<TfilterTypes>
}

function VehicleTypes({ control, reset }: Props) {
    const [vehicleId, setVehicleId] = useState<number>(0)

    const renderActiveVehicle = (componentName: TcomponentName): React.ReactNode => {
        switch (componentName) {
            case 'car':
                return <Car />;
            case 'tractor':
                return <Tractor />;
            case 'motorcycle':
                return <Motorcycle />;
            default:
                return <></>;
        }
    };

    useEffect(() => {
        reset({
            categories: [],
            manufacturer: [],
            priceFrom: '',
            priceTo: '',
            forRent: '0',
            typeID: vehicleId.toString()
        })
    }, [vehicleId])

    return (
        <Controller
            control={control}
            defaultValue={0}
            name='typeID'
            render={({ field }) => (
                <div className='grid grid-cols-3 border-b border-b-gray-200'>
                    {
                        vehicles.map(({ id, componentName }) => {
                            const isActive = vehicleId === id;

                            return <div
                                onClick={() => {
                                    setVehicleId(id)
                                    field.onChange(id)
                                }}
                                className={`
                                    flex 
                                    justify-center 
                                    items-center 
                                    relative 
                                    h-12 
                                    cursor-pointer
                                    transition-all
                                    duration-300
                                    even:border-x
                                    even:border-x-gray-100
                                    first-of-type:rounded-tl-xl
                                    last-of-type:rounded-tr-xl
                                    [&_svg]:transition-all
                                    [&_path]:transition-all
                                    ${isActive ? '[&_svg]:fill-primary [&_path]:fill-primary ' : 'bg-[#F9F9FB]'}
                                `}
                            >
                                {renderActiveVehicle(componentName)}

                                {
                                    isActive && <motion.div
                                        layoutId={`line`}
                                        className="absolute z-10 bg-primary w-[calc(100%+2px)] h-[1px] -bottom-[1px] -left-[1px]"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                }

                            </div>
                        })
                    }
                </div>
            )}
        />
    )
}

export default VehicleTypes