import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import useOutsideClick from '@/hooks/useOutsideClick';
import Btn from './Btn';
import { Control, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';

type Toption = {
    val: string | number
    text: string
}

type Props = {
    optionType: 'checkBox' | 'badge'
    options: Toption[]
    label: string
    topLabel?: string
    control: Control<any>
    name: string
}


const MultiSelect = ({ options, optionType, label, topLabel, control, name }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedOptions, setSelectedOptions] = useState<Array<Toption>>([]);
    const [searchKey, setSearchKey] = useState<string>('')

    const floatingLabel = isOpen || selectedOptions.length > 0

    const inputRef = useRef<HTMLInputElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useOutsideClick(containerRef, () => setIsOpen(false))

    const optionsString = selectedOptions
        .map((option, index) => (
            option.text
        ))
        .toString()

    const toggleOption = (option: Toption, field: ControllerRenderProps<FieldValues, "">) => {
        const { val, text } = option;
        let updatedOptions: Toption[];

        if (selectedOptions.some((item) => item.val === val)) {
            updatedOptions = selectedOptions.filter((item) => item.val !== val);
        } else {
            updatedOptions = [...selectedOptions, option];
        }

        setSelectedOptions(updatedOptions);

        field.onChange(updatedOptions.map((option) => option.val));
    };


    useEffect(() => {
        isOpen ? inputRef.current?.focus() : setSearchKey('')
    }, [isOpen])

    return (
        <Controller
            control={control}
            name={name}
            render={(({ field }) => (
                <div>
                    {topLabel ? <span className='text-black-800 text-xs mb-2 inline-block'>{topLabel}</span> : <></>}
                    <div className='relative' ref={containerRef}>
                        <div onClick={() => setIsOpen(!isOpen)}>
                            <div className='relative border border-[#C2C9D8] pl-3 pr-1 rounded-md text-black-600 cursor-pointer'>
                                <h2
                                    className={`transition-all origin-left absolute text-xs pointer-events-none ${floatingLabel ? 'top-0 scale-75' : 'top-1/2 -translate-y-1/2'}`}>
                                    {label}
                                </h2>

                                <div className='h-[40px] flex items-center'>
                                    <input
                                        className={`placeholder:text-black-600 placeholder:text-xs truncate text-black w-full !outline-none pt-4 text-xs`}
                                        type="text"
                                        readOnly={!isOpen}
                                        value={searchKey}
                                        onChange={e => setSearchKey(e.target.value)}
                                        placeholder={
                                            optionsString
                                        }
                                    />

                                    <div className='shrink-0 w-8 h-8 rounded-full hover:bg-[#f2f3f6] transition-all flex justify-center items-center'>
                                        <Image
                                            src={selectedOptions.length ? "/icons/close.svg" : "/icons/chevron-down.svg"}
                                            alt='arrow'
                                            width={selectedOptions.length ? 18 : 10}
                                            height={selectedOptions.length ? 18 : 10}
                                            className={`${isOpen ? 'rotate-180' : ''}  object-contain object-center`}
                                            onClick={(e) => {
                                                if (selectedOptions.length) {
                                                    e.stopPropagation()
                                                    setSelectedOptions([])
                                                    field.onChange([])
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {
                                isOpen && <motion.div
                                    className='absolute top-[calc(100%+10px)] rounded-lg flex flex-col border border-[#D8DBE2] shadow-sm z-[9999] w-full px-2 bg-white'
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 10, opacity: 0 }}
                                >
                                    <div className={`max-h-[310px] overflow-auto mt-2 multiselect-scroll pb-3 ${optionType === 'checkBox' ? '' : 'flex flex-wrap gap-3'}`}>
                                        {options.filter(({ text }) => text.trim().toLowerCase().includes(searchKey.trim().toLocaleLowerCase())).map((option, index) => {
                                            // const isChecked = selectedOptions.includes(option)
                                            const isChecked = selectedOptions.some(opt => opt.val === option.val && opt.text === option.text);

                                            return optionType === 'checkBox'
                                                ?
                                                <label className='w-full flex items-center gap-4 cursor-pointer px-4 py-[10px] md:text-xs xl:text-sm font-medium'>
                                                    <div className={`${isChecked ? 'bg-success border-transparent' : ''} flex items-center justify-center w-[24px] h-[24px] rounded-md border shrink-0`}>
                                                        <Image
                                                            src="/icons/check.svg"
                                                            alt={option.text}
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </div>
                                                    <input
                                                        type='checkbox'
                                                        onChange={() => toggleOption(option, field as any)}
                                                        checked={isChecked}
                                                        className='hidden'
                                                    />
                                                    {option.text}
                                                </label>
                                                :
                                                <label
                                                    className={`
                                                flex items-center min-h-8 px-3 py-1 border rounded-lg text-xs md:text-sm cursor-pointer transition-all
                                                ${isChecked ? 'bg-[#e8f8f0] border-[#1aba6b]' : 'border-[#F2F3F6] md:hover:border-[#F2F3F6]'}
                                                `}
                                                    onClick={() => toggleOption(option, field as any)}
                                                >
                                                    <div className='w-fit flex items-center gap-[6px]'>
                                                        <Image
                                                            src={isChecked ? "/icons/check-green.svg" : "/icons/plus.svg"}
                                                            alt={option.text}
                                                            width={16}
                                                            height={16}
                                                        />
                                                        {option.text}
                                                    </div>
                                                </label>
                                        })}
                                    </div>

                                    <div className="mb-4 mt-1">
                                        <Btn color='black' text='არჩევა' onClick={() => setIsOpen(false)} />
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            ))}
        />
    );
};

export default MultiSelect;
