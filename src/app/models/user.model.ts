export class UserModel {
    CODIGO: string;
    RUT: string;
    NOMBRE: string;
    EMAIL: string; 
    CLAVE: string; 
    NIVELU: number;
    EMPRESA: number;
    TIPO: number;
    status: number;

constructor() {
        this.CODIGO = '';
        this.RUT = '';
        this.NOMBRE = '';
        this.EMAIL = '';
        this.CLAVE = '';
        this.NIVELU = 0;
        this.EMPRESA = 0;
        this.TIPO = 0;
        this.status = 1;
    }
}
