
import React from 'react'
import classNames from 'classnames'
import TimeAgo from 'timeago-react'
import * as timeago from 'timeago.js';
import ka from 'timeago.js/lib/lang/ka'

import { VipTypes } from '@/enums/cars'
import dynamic from 'next/dynamic';

const Pencil = dynamic(() => import('/public/icons/pencil.svg')) as React.FC<React.SVGProps<SVGSVGElement>>
const CarCompare = dynamic(() => import('/public/icons/car-compare.svg')) as React.FC<React.SVGProps<SVGSVGElement>>
const Heart = dynamic(() => import('/public/icons/heart.svg')) as React.FC<React.SVGProps<SVGSVGElement>>


timeago.register('ka', ka)

type Props = {
    order_number: number
    views: number
    order_date: string
}

const svgClass = `[&_path]:hover:fill-primary cursor-pointer`

function CarVipSection({ order_number, views, order_date }: Props) {
    return (
        <div className="flex items-center justify-between pt-3 lg:pt-0 border-t border-[#E4E7EB] mt-4 lg:border-none lg:mt-7">
            <div className="flex items-center gap-4">
                {
                    order_number
                        ?
                        <div className={
                            classNames('text-white text-[10px] px-2 py-1 text-center rounded-full font-bold text-uppercase whitespace-nowrap hidden lg:block', {
                                'bg-primary': order_number === VipTypes['s-vip'],
                                'bg-secondary': order_number === VipTypes.vip,
                                'bg-secondary-yellow': order_number === VipTypes['vip +']
                            })
                        }
                        >
                            {VipTypes[order_number]}
                        </div>
                        :
                        ''
                }
                <div className='flex items-center text-xs text-black-600 gap-1'>
                    <span>{views} ნახვა</span>
                    <div className='w-1 h-1 rounded-full bg-black-500' />
                    <TimeAgo
                        datetime={order_date}
                        live={false}
                        locale='ka'
                    />
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <Pencil className={svgClass} />
                <CarCompare className={svgClass} />
                <Heart className={svgClass} />
            </div>
        </div>
    )
}

export default CarVipSection
