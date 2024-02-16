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
        carsFetching,
        control,
        register,
        reset,
        refetchCars,
        count
    } = useCarFilteringData()

    return (
        <div className='flex flex-col lg:flex-row'>
            <CarFilters
                categories={categories}
                vehicleId={vehicleId}
                manufacturers={manufacturers}
                control={control}
                register={register}
                reset={reset}
                refetchCars={refetchCars}
                count={count}
            />
            <div className='flex-1'>
                <div className='flex lg:items-center lg:justify-between flex-col lg:flex-row px-4 lg:p-0'>
                    <div className='flex items-center gap-1 text-black-800 my-6 lg:m-0'>
                        {carsFetching ? <Loader /> : amount}
                        <span>განცხადება</span>
                    </div>
                    <Filters control={control} />
                </div>
                <div className={`${carsFetching ? 'opacity-50 pointer-events-none' : ''}`}>
                    <CarList />
                </div>
            </div>
        </div>
    )
}

export default Search