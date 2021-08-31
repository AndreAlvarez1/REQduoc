export class ParamsModel {
    user : {
             codigo:string;
             nombre: string;
             nivelu: number;
             email: string;
            }

   constructor() {
    this.user = {
                    codigo: '',
                    nombre: '',
                    nivelu: 0,
                    email: ''
                }
   }

}
