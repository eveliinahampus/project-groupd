class Restaurant {
  id: number
  restaurant_name: string
  phone_number: string
  street_address: string
  city: string
  zip_code: string

  constructor( id:number, restaurant_name:string, phone_number:string, street_address:string, city:string, zip_code:string) {
    this.id = id
    this.restaurant_name = restaurant_name
    this.phone_number = phone_number
    this.street_address = street_address
    this.city = city
    this.zip_code = zip_code
  }
}

export { Restaurant }