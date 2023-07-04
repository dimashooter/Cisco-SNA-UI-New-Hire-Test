type Gender = 'Male' | 'Female'

export interface User {
  id:number | null,
  name:string | null,
  jobTitle:string | null,
  tenure:number | null,
  gender: Gender | null
}
