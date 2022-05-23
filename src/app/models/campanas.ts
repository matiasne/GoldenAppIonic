export class Campana{
    public id:any;
    public nombre:any;

	constructor(){  
    }
    
    public asignarValores(init?: Partial<Campana>) {
        Object.assign(this, init);
    }
}