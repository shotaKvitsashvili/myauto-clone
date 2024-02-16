import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


// მომიწია fake sticker-ების გამოყენება, რადგან ვერანაირად ვერ ვნახე API-ში, თუ როგორ გამომეტანა, ლოგიკა ვერ დავინახე რის მიხედვით გამოქონდა ვებში, იმედია ამ ერთს მაპატიებთ :)) 

const fakeStickers = [
    {
        name: 'სასწრაფოდ',
        icon: 'urgent-alert.svg'
    },
    {
        name: 'იდიალურ მდგომარეობაში',
        icon: 'ideal.svg'
    },
    {
        name: 'სუფთა ისტორია',
        icon: 'clean-history.svg'
    }
]

type Props = {
    active_ads: number
    dealer_title: string
    stickers: number
    dealerId: number | null
    prom_color: number
}

function Ads({ active_ads, dealer_title, stickers, dealerId, prom_color }: Props) {
    return (
        <div className={`bg-inherit px-4 py-[10px] rounded-b-[14px] border-t ${prom_color ? 'border-[#CEE8E5]' : 'border-[#EEF2F7]'}`}>
            {
                active_ads ? <Link href={`/dealers/${dealerId}`}>
                    {dealer_title}
                    
                    <div className="flex items-center gap-2">
                        <Image
                            src="/icons/tabs.svg"
                            alt={dealer_title}
                            width={10}
                            height={6}
                            className='mt-1'
                        />
                        <span className='text-xs text-black-600'>ყველა განცხადება ({active_ads})</span>
                    </div>
                </Link>
                    :
                    <div className='flex items-center gap-2 w-full overflow-auto'>
                        {
                            fakeStickers.map(({ name, icon }) => (
                                <div key={name} className={`flex items-center shrink-0 gap-[6px] p-[6px] px-2 rounded-full ${prom_color ? 'bg-white' : 'bg-[#F4F4F5]'}`}>
                                    <Image
                                        src={`/icons/${icon}`}
                                        alt={name}
                                        width={12}
                                        height={12}
                                    />
                                    <span className='text-xs text-[#454857]'>{name}</span>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Ads