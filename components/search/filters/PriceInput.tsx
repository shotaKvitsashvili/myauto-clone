import { TfilterTypes } from '@/hooks/useCarFilteringData';
import classNames from 'classnames';
import React, { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
    label: string
    className?: string
    register: UseFormRegister<TfilterTypes>
    name: keyof TfilterTypes
};

function PriceInput({ label, className, register, name }: Props) {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numRegex = /^\d*\.?\d*$/

        if (!inputValue.length || Number(inputValue) < 1) {
            return setValue('')
        }

        if (!(numRegex.test(inputValue))) {
            return;
        } else {
            setValue(inputValue);
        }
    };

    return (
        <div className={className ?? ''}>
            <div className='relative border border-[#C2C9D8] pl-3 pr-1 rounded-md text-black-600 cursor-pointer'>
                <input
                    {...register(name, {
                        onChange: handleChange
                    })}
                    type='text'
                    value={value}
                    className='
                        [appearance:textfield] 
                        [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none
                        placeholder:text-black-600 
                        placeholder:text-xs 
                        truncate 
                        text-black w-full 
                        !outline-none 
                        pt-4 
                        text-xs
                        peer
                '
                />
                <h2
                    className={
                        classNames(
                            `
                            transition-all 
                            origin-left 
                            absolute 
                            text-xs 
                            pointer-events-none 
                            top-1/2 
                            -translate-y-1/2 
                            peer-focus-within:top-2 
                            peer-focus-within:scale-75
                            `,
                            {
                                'top-2 scale-75': value.length
                            }
                        )
                    }>
                    {label}
                </h2>
            </div>
        </div>
    );
}

export default PriceInput;
