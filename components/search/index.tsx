import React from 'react'
import CarFilters from './filters'
import CarList from './car-list'
import useCarFilteringData from '@/hooks/useCarFilteringData'
import Filters from './car-list/Filters'

type Props = {}

const Loader = () => (
    <div className="flex w-fit items-center gap-1">
        {
            [...Array(3)].map((_, i) => (
                <div className='w-1 h-1 bg-black-800 rounded-full animate-ping' style={{ animationDelay: i / 10 + 's' }} />
            ))
        }
    </div>
)

function Search({ }: Props) {
    const {
        categories,
        vehicleId,
        manufacturers,
        amount,
        carsLoading,
        control,
        register,
        refetchCars
    } = useCarFilteringData()

    return (
        <div className='flex'>
            <CarFilters
                categories={categories}
                vehicleId={vehicleId}
                manufacturers={manufacturers}
                control={control}
                register={register}
                refetchCars={refetchCars}
            />
            <div className='flex-1'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1 text-black-800'>
                        {carsLoading ? <Loader /> : amount}
                        <span>განცხადება</span>
                    </div>
                    <Filters control={control} />
                </div>
                <CarList />
            </div>
        </div>
    )
}

export default Search