export class apertura {
    id: number;
    caja_id: number;
    caja_nombre: string;
    local_id: number;
    local_nombre: string;
    fechaoperacion: Date;
    fechaoperacion_string:string;
    fechaapertura: Date;
    fechaapertura_string:string;
    nro_apertura:number;
    fechacierre: Date;
    fechacierre_string:string;
    usuario_id: number;
    usuario_nombre: string;
    estado: boolean;
    estado_string:string;
    clase:string;
}

export class aperturaNuevo{
    caja_id: number;  
    local_id: number;
}

export class aperturaCerrar {
    id: number;
    caja_id: number;  
    local_id: number;
}