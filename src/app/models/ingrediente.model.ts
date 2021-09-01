export class IngredienteModel {
    id: number;
    ENCREQID: number;
    CODIGO: string;
    CANTIDAD: number; 
    UNIDAD: string; 
    status: number;
    DESCRIPCIO: string;

constructor() {
        this.id = 0;
        this.ENCREQID = 0;
        this.CODIGO = '';
        this.CANTIDAD = 0; 
        this.status = 1;
        this.UNIDAD = '';
        this.DESCRIPCIO = '';
    }
}
