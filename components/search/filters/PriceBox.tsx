import React, { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import PriceInput from './PriceInput'
import { Context } from '@/context'
import { CurrencyEnums } from '@/enums/filters'
import useCarFilteringData, { TfilterTypes } from '@/hooks/useCarFilteringData'
import { UseFormRegister } from 'react-hook-form'

type Props = {
    register: UseFormRegister<TfilterTypes>
}

const currencyList = [
    {
        id: CurrencyEnums.lari,
        currency: <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.98466 2.55309C4.83129 2.55309 4.64213 2.57119 4.41718 2.60741V6.15185H3.52761V2.82469C2.91411 3.10535 2.47444 3.52634 2.20859 4.08766C1.95297 4.63992 1.82515 5.32798 1.82515 6.15185C1.82515 6.82181 1.96319 7.42387 2.23926 7.95802C2.51534 8.48313 2.91411 8.89959 3.43558 9.20741C3.95705 9.51523 4.58078 9.66914 5.30675 9.66914H8.92638V11H0.644172V9.72346H2.14724V9.66914C1.66667 9.43374 1.26278 9.10782 0.935583 8.69136C0.618609 8.2749 0.383436 7.82222 0.230061 7.33333C0.0766871 6.83539 0 6.35103 0 5.88025C0 5.20123 0.143149 4.56296 0.429448 3.96543C0.715746 3.35885 1.12474 2.83827 1.65644 2.4037C2.19836 1.96914 2.82209 1.66584 3.52761 1.49383V0H4.41718V1.33086C4.64213 1.31276 4.83129 1.3037 4.98466 1.3037C5.10736 1.3037 5.30164 1.31276 5.56749 1.33086V0H6.45706V1.49383C7.18303 1.6749 7.81186 1.9963 8.34356 2.45803C8.88548 2.9107 9.29448 3.45844 9.57055 4.10123C9.85685 4.74403 10 5.42757 10 6.15185H8.17485C8.17485 5.32798 8.04192 4.63992 7.77607 4.08766C7.51023 3.52634 7.07055 3.10535 6.45706 2.82469V6.15185H5.56749V2.60741C5.38344 2.57119 5.18916 2.55309 4.98466 2.55309Z" />
        </svg>
    },
    {
        id: CurrencyEnums.dollar,
        currency: <svg width="8" height="11" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41916 12V10.6784C5.23598 10.6258 5.94213 10.446 6.53762 10.1392C7.51254 9.63945 8 8.83726 8 7.7326C8 6.89534 7.64429 6.24658 6.93286 5.7863C6.50074 5.51014 5.65756 5.19233 4.40335 4.83288V2.32767C4.93033 2.35836 5.29395 2.52932 5.4942 2.84055C5.61014 3.02027 5.68918 3.30521 5.73134 3.69534H7.81029C7.77867 2.64329 7.31756 1.88274 6.42696 1.4137C5.93686 1.12 5.26233 0.944658 4.40335 0.887671V0H3.6524V0.874521C3.11487 0.909589 2.70646 0.964384 2.42716 1.0389C1.96869 1.15726 1.55237 1.37205 1.17821 1.68329C0.888374 1.92438 0.663089 2.21151 0.50236 2.54466C0.34163 2.87781 0.261265 3.24822 0.261265 3.65589C0.261265 4.27397 0.468106 4.80219 0.881787 5.24055C1.29547 5.6789 2.00558 6.02082 3.01211 6.2663L3.6524 6.42411V9.23178C3.05164 9.14411 2.64849 8.95342 2.44297 8.65973C2.31123 8.47123 2.20846 8.10082 2.13469 7.54849H0.000408866C-0.0154006 8.76274 0.427265 9.62192 1.3284 10.126C1.83958 10.4066 2.61424 10.5951 3.6524 10.6915V12H4.41916ZM3.65239 4.64877C3.2677 4.54794 2.98313 4.43835 2.79868 4.32C2.46668 4.1052 2.30069 3.8137 2.30069 3.44548C2.30069 3.10794 2.41135 2.84164 2.63268 2.64657C2.85402 2.45151 3.19392 2.34959 3.65239 2.34082V4.64877ZM4.40335 6.6411V9.21206C4.81966 9.16822 5.12268 9.08932 5.31239 8.97534C5.64439 8.7737 5.81039 8.42521 5.81039 7.92986C5.81039 7.55288 5.65493 7.2548 5.34401 7.03562C5.15957 6.9085 4.84601 6.77699 4.40335 6.6411Z" />
        </svg>

    }
]

function PriceBox({ register }: Props) {
    const { currency, updateCurrency } = useContext(Context)

    return (
        <div className='px-6 pt-4 pb-11 border-t border-gray-100'>
            <div className="flex justify-between mb-3">
                <span className='text-xs text-black-800 font-[500]'>ფასი</span>
                <div className='relative flex items-center  w-[48px] border border-gray-200 rounded-full'>
                    <AnimatePresence initial={false}>
                        {
                            currencyList.map(({ currency: curr, id }) => {
                                const isActive = currency === id

                                return <div
                                    onClick={() => updateCurrency(id)}
                                    className={`relative h-full w-1/2 cursor-pointer`}
                                    key={id}
                                >
                                    {
                                        !isActive && <div className={`absolute top-1/2 -translate-y-1/2 right-1 left-2 text-xs [&_svg_path]:fill-[#8C929B]`}>
                                            {curr}
                                        </div>
                                    }
                                    {
                                        isActive && <motion.div
                                            layoutId={`bg`}
                                            key={id}
                                            className=" bg-black-800 left-0 top-0 h-6 w-6 rounded-full [&_svg_path]:fill-white flex justify-center items-center"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        >
                                            <motion.div
                                                initial={{ x: 10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -10, opacity: 1 }}
                                                className={id === CurrencyEnums.lari ? 'pb-[1px]' : ''}
                                            >
                                                {curr}
                                            </motion.div>
                                        </motion.div>
                                    }
                                </div>
                            })
                        }
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <PriceInput label='დან' className='shrink-0 flex-1' register={register} name='priceFrom' />
                <div className='h-[2px] w-[6px] bg-[#8C929B] rounded-full' />
                <PriceInput label='მდე' className='shrink-0 flex-1' register={register} name='priceTo' />
            </div>
        </div>
    )
}

export default PriceBox