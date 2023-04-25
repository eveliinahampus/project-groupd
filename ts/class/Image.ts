class Image {
  id: number
  img_titel: string
  img_name: string
  user_id: number

  constructor(id:number ,title:string ,name:string, user_id:number) {
    this.id = id
    this.img_titel = title
    this.img_name = name
    this.user_id = user_id
  }
}

export { Image }