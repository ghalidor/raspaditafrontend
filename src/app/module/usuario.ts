export class usuario {
    id: number;
    usuariorol_id:number;
    rol_id: number;
    rol_nombre: string;
    usuariolocal_id:number;
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

export class usuarioNuevo {
    rol_id:number;
    local_id: number;
    nombre: string;
    password: string;
}

export class usuarioEditar {
    id: number;
    local_id: number;
    rol_id: number;
    nombre: string;
    estado: boolean;
}