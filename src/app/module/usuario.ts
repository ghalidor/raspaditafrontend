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
    check:boolean;
}

export class UsuarioLogin {
    nombre: String;
    password: String;
}

export class usuarioNuevo {
    rol_id:number;
    local_id: number;
    nombre: string;
    password: string;
}

export class usuarioEditar {
    id: number;
    usuariolocal_id:number;  
    local_id: number;
    usuariorol_id:number;
    rol_id: number;
    nombre: string;
    estado: boolean;
}


export class usuarioCajaNuevo {
    caja_id:number;
    local_id: number;
    usuario_id: number;
}

export class usuarioCajaRespuesta{
    nombre:string;
    id: number;
    caja_id: number;
    caja_nombre: string;
    local_id: number;
    local_nombre: string;
    token: string;
    response: number;
    message: string;
}
