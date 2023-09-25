export class puntojuego {
    id: number;
    local_id: number;
    local_nombre: string;
    nro_punto: string;
    ip: string;
    fecharegistro: Date;
    fecharegistro_string:string;
    estado: boolean;
    estado_string:string;
    clase:string;
}

export class puntojuegoNuevo {
    local_id: number;
    nro_punto: string;
    ip: string;
}

export class puntojuegoEditar {
    id: number;
    local_id: number;
    nro_punto: string;
    ip: string;
    estado: boolean;
}