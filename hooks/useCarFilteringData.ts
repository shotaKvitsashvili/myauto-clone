import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getCarManufacturers, getCars, getCategories } from '@/constants/endpoints'
import makeHttpRequest from '@/utils/makeHttpRequest'
import { useForm } from 'react-hook-form'
import { Context } from '@/context'

type Props = {}

type Toption = {
  val: string | number
  text: string
}

export type TfilterTypes = {
  typeID: string;
  manufacturer: Toption[],
  categories: Toption[],
  forRent: string,
  priceFrom: string,
  priceTo: string,
  period: string
  sortOrder: string
}

function useCarFilteringData() {
  const { currency } = useContext(Context)

  const {
    control,
    watch,
    register
  } = useForm<TfilterTypes>()

  const typeID = watch('typeID') ?? '0'
  const manufacturersIds = watch('manufacturer')?.join('-') ?? ''
  const categoriesIds = watch('categories')?.join('.') ?? ''
  const forRent = watch('forRent') ?? 1
  const priceFrom = watch('priceFrom') ?? ''
  const priceTo = watch('priceTo') ?? ''
  const period = watch('period') ?? ''
  const sortOrder = watch('sortOrder') ?? ''

  const filterQuery = `
  Page=1&
  TypeID=${typeID}&
  ForRent=${forRent}&
  Mans=${manufacturersIds}&
  Cats=${categoriesIds}&
  PriceFrom=${priceFrom}&
  PriceTo=${priceTo}&
  Period=${period}&
  SortOrder=${sortOrder}&
  CurrencyID=${currency}
  `

  const { data: manufacturers, } = useQuery({
    queryKey: ['manufacturers'],
    queryFn: () => makeHttpRequest<IManufacturer[]>('GET', getCarManufacturers)
  })

  const { data: categories } = useQuery({
    queryKey: ['cats'],
    queryFn: () => makeHttpRequest<{ data: IFilterCategories[] }>('GET', getCategories)
  })

  const { data: cars, isLoading: carsLoading, refetch: refetchCars } = useQuery({
    queryKey: ['cars'],
    queryFn: () => makeHttpRequest<{ data: ICarData }>('GET', getCars + `?${filterQuery.trim()}`)
  })


  return {
    manufacturers,
    categories,
    amount: cars?.data.meta.total,
    cars,
    carsLoading,
    refetchCars,
    control,
    watch,
    register
  }
}

export default useCarFilteringData