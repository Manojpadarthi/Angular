class Acessor{
    

    //constructor 
    constructor(private _firstName:string,private _lastName:string)
    {
        
    }

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(_firstName: string) {
        this._firstName = _firstName;
    }
   
   public get lastName(): string {
        return this._lastName;
    }
    public set lastName(_lastName: string) {
        this._lastName = _lastName;
    }
    
    
}

let myAccessor = new Acessor('Manoj','Padarthi');

console.log(myAccessor.firstName);
console.log(myAccessor.lastName);
