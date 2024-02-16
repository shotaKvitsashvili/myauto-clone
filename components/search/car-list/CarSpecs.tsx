import React, { useContext } from 'react'
import Image from 'next/image'

import { EngineTypes, FuelTypes } from '@/enums/cars'
import Link from 'next/link'
import { locations } from '@/constants/locations'
import { Context } from '@/context'
import { CurrencyEnums } from '@/enums/filters'
import { DollarSvg, LariSvg } from '@/components/ui/CurrencySvg'

type Props = {
    engine_volume: number
    fuel_type_id: number
    car_run: number
    gear_type_id: number
    right_wheel: boolean
    location_id: number
    car_id: number
    car_model: string
    prod_year: number
    customs_passed: boolean
    price_value: number
    price_usd: number
}

type TCarSpecs = {
    icon: string
    desc: string
}

function CarSpecs(props: Props) {
    const {
        engine_volume,
        fuel_type_id,
        car_run,
        gear_type_id,
        right_wheel,
        location_id,
        car_id,
        car_model,
        prod_year,
        customs_passed,
        price_value,
        price_usd
    } = props

    const location = locations.find(({ id }) => id === location_id)

    const { currency, updateCurrency } = useContext(Context)

    const isLari = currency === CurrencyEnums.lari

    return (
        <>
            <div className='hidden lg:flex justify-between items-center'>
                <h2 className='text-black-800 text-sm'>
                    <Link href={`/product/${car_id}`} className='flex items-center w-[clamp(300px,40%,400px)]'>
                        {/* title იმიტომ წერია რომ მანქანის სახელი ვერ ვნახე API-ში */}
                        <span className="line-clamp-1">Title - {car_model}</span>
                        <span className='text-black-500 inline-block pl-2 shrink-0'> {prod_year} წ</span>
                    </Link>
                </h2>

                <div className='flex items-center gap-4 shrink-0'>
                    <div className={`flex items-center text-xs ${customs_passed ? 'text-[#26B753]' : 'text-[#FF3B30]'} `}>
                        {
                            customs_passed ? <>
                                <Image
                                    width={16}
                                    height={16}
                                    alt={'check'}
                                    src={`/icons/check-green.svg`}
                                    className='object-contain'
                                />
                                <span>განბაჟებული</span>
                            </>
                                :
                                <>
                                    {/** api-ში ვერ მივხვდი განვადების ფასს რა ლოგიკით ითვლიდა ან როგორ მოქონდა, ასერომ სტატიკურად 1000 იყოს ვიზუალურად რომ ჩანდეს */}
                                    განბაჟება 1000₾
                                </>
                        }
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={`https://flagcdn.com/16x12/${location?.flag?.toLowerCase() ?? 'ge'}.png`} alt={location?.title ?? ''} />
                        <span className='text-xs text-black-600'>{location?.title ?? 'თბილისი'}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-4 mt-6 w-fit">
                    <CarSpecsItem
                        icon='engine.svg'
                        desc={(engine_volume / 1000).toFixed(2) + 'დატ. ' + FuelTypes[fuel_type_id]}
                    />
                    <CarSpecsItem
                        icon='car-run.svg'
                        desc={car_run.toLocaleString().replaceAll(',', ' ') + ' კმ'}
                    />
                    <CarSpecsItem
                        icon='gear.svg'
                        desc={EngineTypes[gear_type_id]}
                    />
                    <CarSpecsItem
                        icon='wheel.svg'
                        desc={right_wheel ? 'მარჯვენა' : 'მარცხენა'}
                    />
                </div>

                <div className='hidden items-center gap-2 lg:flex'>
                    {isLari ? price_value : price_usd}

                    <div
                        className='w-6 h-6 rounded-full grid place-items-center bg-[#F2F3F6] cursor-pointer'
                        onClick={() => updateCurrency(
                            isLari ? CurrencyEnums.dollar : CurrencyEnums.lari
                        )}
                    >
                        {isLari ? <LariSvg /> : <DollarSvg />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CarSpecs


function CarSpecsItem({ icon, desc }: TCarSpecs) {
    return <div className='flex gap-3 items-center'>
        <Image
            width={16}
            height={16}
            alt={desc}
            src={`/icons/${icon}`}
            className='object-contain'
        />
        <span className='text-xs text-black-900'>{desc}</span>
    </div>
}