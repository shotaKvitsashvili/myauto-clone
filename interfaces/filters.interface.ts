interface IManufacturer {
    man_id: string,
    man_name: string,
    is_car: string,
    is_spec: string,
    is_moto: string
}

interface IFilterCategories {
    category_id: string,
    category_type: number,
    has_icon: number,
    title: string,
    seo_title: string,
    vehicle_types: number[]
}