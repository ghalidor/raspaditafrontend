export class caja {
    id: number;
    local_id: number;
    local_nombre: string;
    nombre: string;
    fecharegistro: Date;
    fecharegistro_string:string;
    fechaupdated: Date;
    estado: boolean;
    estado_string:string;
    clase:string;
}

export class cajaNuevo {
    local_id: number;
    nombre: string;
}

export class cajaEditar {
    id: number;
    local_id: number;
    nombre: string;
    estado: boolean;
}