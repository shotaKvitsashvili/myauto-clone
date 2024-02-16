import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import Image from 'next/image'
import Link from 'next/link'

type Props = {
    car_id: number
    pic_number: number
    photo_ver: number
    photo: string
}

function ListItemImages({ car_id, pic_number, photo_ver, photo }: Props) {
    const [imgVersion, setImgVersion] = useState(1)

    const maxPics = Math.min(4, pic_number)

    return (
        <Link href={`/product/${car_id}`}>
            <div className='relative w-full lg:w-fit h-full group' onMouseLeave={() => setImgVersion(1)}>
                <div className="relative w-full lg:w-[180px] h-full rounded-lg overflow-hidden">
                    <Image
                        src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_${imgVersion}.jpg?v=${photo_ver}` ?? '/images/default-img.png'}
                        alt='33'
                        layout='fill'
                        placeholder='blur'
                        objectFit='cover'
                        priority
                        className='hidden lg:block'
                        blurDataURL={`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_${imgVersion}.jpg?v=${photo_ver}` ?? '/images/default-img.png'}
                    />

                    <div className='flex lg:hidden overflow-auto'>
                        <Swiper
                            slidesPerView={1}
                            className='w-full'
                            spaceBetween={12}
                            onSlideChange={({ activeIndex }) => {
                                setImgVersion(activeIndex + 1)
                            }}
                        >
                            {
                                [...Array(maxPics)].map((_, i) => (
                                    <SwiperSlide key={i}>
                                        <div className='relative h-[256px] w-full flex-1 shrink-0'>
                                            <Image
                                                src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_${i + 1}.jpg?v=${photo_ver}` ?? '/images/default-img.png'}
                                                alt='33'
                                                layout='fill'
                                                placeholder='blur'
                                                objectFit='cover'
                                                priority
                                                blurDataURL={`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_${i + 1}.jpg?v=${photo_ver}` ?? '/images/default-img.png'}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    {
                        imgVersion === 4 && <div className='absolute z-[99] pointer-events-none flex flex-col w-full h-full inset-0 items-center text-center justify-center bg-[#272a37cc]'>
                            <Image
                                src="/icons/default-pic.svg"
                                alt='default'
                                width={24}
                                height={24}
                            />
                            <div className="flex items-end mt-4">
                                <span className='flex text-bold text-[32px] leading-none text-white'>
                                    +{pic_number - 4}
                                </span>
                                <span className='flex text-white opacity-70 ml-1 mb-[2px]'>
                                    ფოტო
                                </span>
                            </div>
                        </div>
                    }
                </div>

                <div
                    className="absolute h-full w-full hidden group-hover:grid top-0 left-0"
                    style={{
                        gridTemplateColumns: `repeat(${maxPics}, minmax(0, 1fr))`
                    }}>
                    {
                        [...Array(maxPics)].map((_, i) => <div
                            onMouseOver={() => setImgVersion(i + 1)}
                            className='flex items-end justify-center group pb-2 group/thumb-item last-of-type:pr-1 first-of-type:pl-1'
                        >
                            <div className='w-[80%] rounded h-[3px] bg-white group-hover/thumb-item:bg-primary indicator' />
                        </div>)
                    }
                </div>
            </div>
        </Link>
    )
}

export default ListItemImages