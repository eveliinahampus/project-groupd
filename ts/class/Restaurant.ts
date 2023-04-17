class Restaurant {
  id: number
  name: string
  phone_number: string
  street_address: string
  city: string
  zip_code: string

  constructor( id:number, name:string, phone_number:string, street_address:string, city:string, zip_code:string) {
    this.id = id
    this.name = name
    this.phone_number = phone_number
    this.street_address = street_address
    this.city = city
    this.zip_code = zip_code
  }
}

export { Restaurant }