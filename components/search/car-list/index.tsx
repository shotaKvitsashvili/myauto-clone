import useCarFilteringData from '@/hooks/useCarFilteringData'
import React, { useState } from 'react'
import Image from 'next/image'
import CarListItem from './CarListItem'

type Props = {}

function CarList({ }: Props) {
    const { cars } = useCarFilteringData()

    return (
        <div className='mt-4'>
            {
                cars?.data.items.map((product) => (
                    <CarListItem car={product} />
                ))
            }
        </div>
    )
}

export default CarList