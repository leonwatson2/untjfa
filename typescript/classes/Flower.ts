export class Member{
  constructor(
  public name:string,
  public email:string,
  public birthday:string,
  public password:string
  ){}  
}
export class MemberSignup{
	constructor(
  public name:string,
  public email:string,
  public password:string
  ){}	
}
export class Flower{
 constructor(
  public name:string,
  public email:string,
  public birthday:string,
  public interests:Interest[]
  ){}
}

export class Interest{
  public id:number;
  public name:string;
}