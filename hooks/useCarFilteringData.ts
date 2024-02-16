import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getCarManufacturers, getCars, getCategories, getCount } from '@/constants/endpoints'
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
    register,
    reset
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

  const { data: cars, isFetching: carsFetching, refetch: refetchCars, isLoading: carsLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: () => makeHttpRequest<{ data: ICarData }>('GET', getCars + `?${filterQuery.trim()}`)
  })

  const { data: count, isFetching: countFetching, refetch: refetchCount } = useQuery({
    queryKey: ['count'],
    queryFn: () => makeHttpRequest<{ data: { count: number }[] }>('GET', getCount + `?${filterQuery.trim()}`)
  })

  useEffect(() => {
    if (period || sortOrder) refetchCars()
  }, [period, sortOrder])

  useEffect(() => {
    refetchCount()
  }, [filterQuery])

  return {
    manufacturers,
    categories,
    amount: cars?.data.meta.total,
    cars,
    carsFetching,
    carsLoading,
    vehicleId: typeID,
    refetchCars,
    control,
    watch,
    register,
    reset,
    count: count?.data[0]?.count
  }
}

export default useCarFilteringData