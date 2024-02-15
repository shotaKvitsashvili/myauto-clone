import React from 'react'

import VehicleTypes from './VehicleTypes'
import MultiSelect from '@/components/ui/MultiSelect'
import { VehicleEnums } from '@/enums/filters'
import DropDown from '@/components/ui/DropDown'
import PriceBox from './PriceBox'
import Btn from '@/components/ui/Btn'
import { TfilterTypes } from '@/hooks/useCarFilteringData'
import { Control, UseFormRegister } from 'react-hook-form'

type Props = {
	categories: {
		data: IFilterCategories[];
	} | undefined,
	vehicleId: number
	manufacturers: IManufacturer[] | undefined
	control: Control<TfilterTypes>
	register: UseFormRegister<TfilterTypes>
	refetchCars: any
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

function CarFilters({ categories, vehicleId, manufacturers, control, register, refetchCars }: Props) {
	return (
		<div className='w-fit sticky top-3 md:mr-5 z-2 bg-white rounded-t-xl border border-gray-200 self-start'>
			<div className='lg:w-[250px]'>
				<VehicleTypes control={control} />
				<div key={'multiselect-' + vehicleId} className=''>
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
										?.filter(({ vehicle_types }) => vehicle_types.includes(vehicleId))
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

					<PriceBox register={register} />
					<div className='px-6 pt-4 pb-5 bg-white shadow-[0_2px_16px_#272A3721]'>
						<Btn
							color='primary'
							text='ძებნა'
							onClick={() => {
								refetchCars()
								typeof window !== 'undefined' && window.scrollTo({
									top: 0,
									behavior: 'smooth'
								})
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CarFilters