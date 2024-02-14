import React, { useState } from 'react'
import VehicleTypes from './VehicleTypes'
import MultiSelect from '@/components/ui/MultiSelect'
import { useQuery } from '@tanstack/react-query'
import makeHttpRequest from '@/utils/makeHttpRequest'
import { VehicleEnums } from '@/enums/filters'
import { getCarManufacturers, getCategories } from '@/constants/endpoints'

type Props = {}

function CarFilters({ }: Props) {
	const [vehicleId, setVehicleId] = useState<number>(0)

	const { data: manufacturers, } = useQuery({
		queryKey: ['manufacturers'],
		queryFn: () => makeHttpRequest<IManufacturer[]>('GET', getCarManufacturers)
	})

	const { data: categories } = useQuery({
		queryKey: ['cats'],
		queryFn: () => makeHttpRequest<{ data: IFilterCategories[] }>('GET', getCategories)
	})

	const getVehicleId = (id: number) => {
		setVehicleId(id)
	}
	console.log(vehicleId);

	console.log(manufacturers?.filter(manufacturer => {
		if (vehicleId === VehicleEnums.car) {
			return manufacturer.is_car === '1';
		}
		if (vehicleId === VehicleEnums.tractor) {
			return manufacturer.is_spec === '1';
		}
		if (vehicleId === VehicleEnums.motorcycle) {
			return manufacturer.is_moto === '1';
		} else {
			return false;
		}
	}));


	return (
		<div className='w-fit sticky bottom-12 md:mr-5 z-2 bg-white rounded-t-xl border border-gray-200'>
			<div className='lg:w-[250px]'>

				<VehicleTypes getVehicleId={getVehicleId} />
				<div key={'multiselect-' + vehicleId} className='p-6 flex flex-col gap-5'>

					<MultiSelect
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
						} />

					<MultiSelect
						optionType='badge'
						label="ყველა კატეგორია"
						topLabel='კატეგორია'
						options={
							categories?.data?.length
								?
								categories?.data?.map(({ category_id, title }) => (
										{
											val: category_id,
											text: title
										}
									))
								:
								[]
						} />
				</div>
			</div>
		</div >
	)
}

export default CarFilters