import DropDown from '@/components/ui/DropDown';
import { TfilterTypes } from '@/hooks/useCarFilteringData';
import React from 'react'
import { Control } from 'react-hook-form';

type Props = {
    control: Control<TfilterTypes>
}

interface Ifilter {
    val: number | string;
    text: string;
}

const sortBy: Ifilter[] = [
    {
        val: 1,
        text: "თარიღი კლებადი"
    },
    {
        val: 2,
        text: "თარიღი ზრდადი"
    },
    {
        val: 3,
        text: "ფასი კლებადი"
    },
    {
        val: 4,
        text: "ფასი ზრდადი"
    },
    {
        val: 5,
        text: "გარბენი კლებადი"
    },
    {
        val: 6,
        text: "გარბენი ზრდადი"
    }
];

const datePosted: Ifilter[] = [
    {
        val: "1h",
        text: "ბოლო 1 საათი"
    },
    {
        val: "2h",
        text: "ბოლო 2 საათი"
    },
    {
        val: "3h",
        text: "ბოლო 3 საათი"
    },
    {
        val: "1d",
        text: "ბოლო 1 დღე"
    },
    {
        val: "2d",
        text: "ბოლო 2 დღე"
    },
    {
        val: "3d",
        text: "ბოლო 3 დღე"
    },
    {
        val: "1w",
        text: "ბოლო 1 კვირა"
    },
    {
        val: "2w",
        text: "ბოლო 2 კვირა"
    },
    {
        val: "3w",
        text: "ბოლო 3 კვირა"
    }
];


function Filters({ control }: Props) {

    return (
        <div className='flex items-stretch gap-2'>
            <DropDown
                title={'პერიოდი'}
                options={datePosted}
                label={''}
                wrapperClassName='min-w-[140px]'
                control={control}
                name='period'
            />

            <DropDown
                title={'სორტირება'}
                options={sortBy}
                label={''}
                wrapperClassName='min-w-[164px]'
                control={control}
                name='sortOrder'
            />
        </div>
    )
}

export default Filters