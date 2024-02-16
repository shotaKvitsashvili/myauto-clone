import React, { useContext } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import ListItemImages from './ListItemImages'
import CarSpecs from './CarSpecs'
import CarVipSection from './CarVipSection'
import Ads from './Ads'
import { CurrencyEnums } from '@/enums/filters'
import { Context } from '@/context'
import { DollarSvg, LariSvg } from '@/components/ui/CurrencySvg'
import Link from 'next/link'
import { VipTypes } from '@/enums/cars'

type Props = {
    car: ICarItems
}

function CarListItem({ car }: Props) {
    const { currency, updateCurrency } = useContext(Context)

    const {
        photo,
        photo_ver,
        car_id,
        pic_number,
        prod_year,
        location_id,
        prom_color,
        engine_volume,
        fuel_type_id,
        car_run,
        gear_type_id,
        right_wheel,
        order_number,
        views,
        car_model,
        order_date,
        active_ads,
        dealer_title,
        stickers,
        dealerId,
        customs_passed,
        price_value,
        price_usd
    } = car

    const isLari = currency === CurrencyEnums.lari

    return (
        <div className={
            classNames(
                'lg:rounded-[14px] lg:mb-[10px] bg-white',
                {
                    'border border-[#59D8C9] !bg-[#F0F9F7]': prom_color
                }
            )
        }>
            <div className={'p-4 flex items-stretch flex-col lg:flex-row gap-4'}>
                <div className='flex lg:hidden'>
                    {
                        order_number
                            ?
                            <div className={
                                classNames('text-white mr-2 text-[10px] px-2 py-1 text-center rounded-full font-bold text-uppercase whitespace-nowrap hidden lg:block', {
                                    'bg-primary': order_number === VipTypes['s-vip'],
                                    'bg-secondary': order_number === VipTypes.vip,
                                    'bg-secondary-yellow': order_number === VipTypes['vip +']
                                })
                            }
                            >
                                {VipTypes[order_number]}
                            </div>
                            :
                            <></>
                    }

                    <h2 className='text-black-800 text-sm'>
                        <Link href={`/product/${car_id}`} className='flex items-center w-[clamp(300px,40%,400px)]'>
                            {/* title იმიტომ წერია რომ მანქანის სახელი ვერ ვნახე API-ში */}
                            <span className="line-clamp-1">Title - {car_model}</span>
                            <span className='text-black-500 inline-block pl-2 shrink-0'> {prod_year} წ</span>
                        </Link>
                    </h2>
                </div>

                <div className="flex justify-between lg:hidden">
                    <div className='flex items-center gap-2'>
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

                    <div className={`flex lg:hidden items-center text-xs ${customs_passed ? 'text-[#26B753]' : 'text-[#FF3B30]'} `}>
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
                </div>

                <ListItemImages photo={photo} car_id={car_id} photo_ver={photo_ver} pic_number={pic_number} />

                <div className="flex-1">
                    <CarSpecs
                        engine_volume={engine_volume}
                        fuel_type_id={fuel_type_id}
                        car_run={car_run}
                        gear_type_id={gear_type_id}
                        right_wheel={right_wheel}
                        car_id={car_id}
                        car_model={car_model}
                        location_id={location_id}
                        prod_year={prod_year}
                        customs_passed={customs_passed}
                        price_value={price_value}
                        price_usd={price_usd}
                    />

                    <CarVipSection
                        order_number={order_number}
                        views={views}
                        order_date={order_date}
                    />
                </div>
            </div>
            {
                (active_ads || stickers) && <Ads
                    active_ads={active_ads}
                    dealer_title={dealer_title}
                    stickers={stickers}
                    dealerId={dealerId}
                    prom_color={prom_color}
                />
            }
        </div>
    )
}

export default CarListItem