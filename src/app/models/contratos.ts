export class Contrato{
    public CD_CONTRATO:any;
    public ID_COSECHA:any;

	constructor(
		
		){  
    }
    
    public asignarValores(init?: Partial<Contrato>) {
        Object.assign(this, init);
    }
}