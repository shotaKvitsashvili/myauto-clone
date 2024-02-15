import React, { useState } from 'react'
import Image from 'next/image'

type Props = {
    car: ICarItems
}

function CarListItem({ car }: Props) {
    const [imgVersion, setImgVersion] = useState(1)
    const { photo, photo_ver, car_id, pic_number } = car

    const maxPics = Math.min(4, pic_number)

    return (
        <div className='p-4 rounded-[14px] mb-[10px] bg-white'>
            <div className='relative w-fit group'>
                <Image
                    src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_${imgVersion}.jpg?v=${photo_ver}`}
                    alt='33'
                    width={200}
                    height={200}
                />

                <div
                    className="absolute h-full w-full hidden group-hover:grid top-0 left-0"
                    style={{
                        gridTemplateColumns: `repeat(${maxPics}, minmax(0, 1fr))`
                    }}>
                    {
                        [...Array(maxPics)].map((_, i) => <div
                            onMouseOver={() => setImgVersion(i + 1)}
                            className='flex items-end justify-center'
                        >
                            yuu
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default CarListItem