import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'

import VehicleTypes from './VehicleTypes'
import MultiSelect from '@/components/ui/MultiSelect'
import { VehicleEnums } from '@/enums/filters'
import DropDown from '@/components/ui/DropDown'
import PriceBox from './PriceBox'
import Btn from '@/components/ui/Btn'
import { TfilterTypes } from '@/hooks/useCarFilteringData'
import { Control, UseFormRegister, UseFormReset } from 'react-hook-form'
import Drawer from '@/components/ui/Drawer'
import { AnimatePresence } from 'framer-motion'

type Props = {
	categories: {
		data: IFilterCategories[];
	} | undefined,
	vehicleId: number | string
	manufacturers: IManufacturer[] | undefined
	control: Control<TfilterTypes>
	register: UseFormRegister<TfilterTypes>
	reset: UseFormReset<TfilterTypes>
	refetchCars: any
	count: number | undefined
}

const dropdownItems = [
	{
		text: 'იყიდება',
		val: 0
	},
	{
		text: 'ქირავდება',
		val: 1
	}
]

const Content = ({ categories, control, manufacturers, refetchCars, register, reset, vehicleId, placement, count, setShowFilters }: Props & { placement: string, setShowFilters?: Dispatch<SetStateAction<boolean>> }) => (
	<div className='lg:w-[250px] h-full lg:h-fit bg-white lg:bg-transparent'>
		<VehicleTypes control={control} reset={reset} />
		<div key={'multiselect-' + vehicleId}>
			<div className='p-6 flex flex-col gap-5'>
				<DropDown
					control={control}
					name='forRent'
					label='გარიგების ტიპი'
					title='აირჩიე'
					options={dropdownItems}
				/>

				<MultiSelect
					control={control}
					name="manufacturer"
					optionType='checkBox'
					label="ყველა მწარმოებელი"
					topLabel='მწარმოებელი'
					options={
						manufacturers?.length
							?
							manufacturers?.filter(manufacturer => {
								switch (vehicleId) {
									case VehicleEnums.car:
										return manufacturer.is_car === '1'
									case VehicleEnums.tractor:
										return manufacturer.is_spec === '1'
									case VehicleEnums.motorcycle:
										return manufacturer.is_moto === '1'

									default: return manufacturer
								}
							})
								?.map(({ man_id, man_name }) => (
									{
										val: man_id,
										text: man_name
									}
								))
							:
							[]
					}
				/>

				<MultiSelect
					control={control}
					name="categories"
					optionType='badge'
					label="ყველა კატეგორია"
					topLabel='კატეგორია'
					options={
						categories?.data?.length
							?
							categories
								?.data
								?.filter(({ vehicle_types }) => vehicle_types.includes(Number(vehicleId)))
								?.map(({ category_id, title }) => (
									{
										val: category_id,
										text: title
									}
								))
							:
							[]
					}
				/>
			</div>

			<PriceBox register={register} id={placement} />

			<div className='px-6 pt-4 pb-5 bg-white shadow-[0_2px_16px_#272A3721]'>
				<Btn
					color='primary'
					text={'ძებნა' + '-' + count}
					onClick={() => {
						refetchCars()
						setShowFilters && setShowFilters(false)
						typeof window !== 'undefined' && window.scrollTo({
							top: 0,
							behavior: 'smooth'
						})
					}}
				/>
			</div>
		</div>
	</div>
)

function CarFilters(props: Props) {
	const [showFilters, setShowFilters] = useState<boolean>(false)

	return (
		<>
			<div className='w-full md:w-fit sticky top-3 lg:mr-5 z-2 bg-white md:rounded-t-xl border border-gray-200 self-start hidden lg:block'>
				<Content {...props} placement="desktop" />
			</div>

			<div className="bg-white w-full top-[66px] sm:top-[76px] left-0 px-4 py-4 shadow-[0px_6px_12px_rgba(0,0,0,0.07)] lg:hidden">
				<div
					className='lg:hidden flex items-center h-8 w-fit bg-white text-xs text-black-800 px-3 rounded-md border border-black-800'
					onClick={() => setShowFilters(true)}
				>
					<Image
						src="/icons/filter.svg"
						alt='arrow'
						width={20}
						height={20}
						onClick={() => setShowFilters(false)}
					/>
					<span>ფილტრი</span>
				</div>
			</div>

			<AnimatePresence>
				{
					showFilters && <Drawer setShowDrawer={setShowFilters} direction='left'>
						<div className='flex items-center justify-between bg-white top-0 h-16 border-b-[16px] border-[#f7f8fa]'>
							<Image
								src="/icons/chevron-left.svg"
								alt='arrow'
								width={20}
								height={20}
								onClick={() => setShowFilters(false)}
							/>
							<span>დეტალური ფილტრი</span>
							<div />
						</div>
						<Content {...props} placement="mobile" setShowFilters={setShowFilters} />
					</Drawer>
				}
			</AnimatePresence>
		</>
	)
}

export default CarFilters