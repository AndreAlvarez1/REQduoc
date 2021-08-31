export class ReqModel {
    id: number;
    ASIGNATURAID: number;
    TIENDAID: number;
    NUMSEMANA: number; 
    USERID: string; 
    status: number;

constructor() {
        this.id = 0;
        this.ASIGNATURAID = 0;
        this.TIENDAID = 0;
        this.NUMSEMANA = 0;
        this.USERID = ''; 
        this.status = 1;
    }
}
