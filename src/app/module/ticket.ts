export class ticket {
    id: number;
    nroticket: string;
    caja_id: number;
    caja_nombre: string;
    puntojuego_id: number;
    puntojuego_ip: string;
    puntojuego_nombre: string;
    credito: number;
    monto: number;
    fecharegistro: Date;
    fecharegistro_string: string;
    fechaupdated: Date;
    fechaupdated_string: string;
    estado: number;
    estado_string: string;
    clase:string
}

export class ticketNuevo {
    caja_id: number;
    puntojuego_id: number;
    credito: number;
    monto: number;
}

export class ticketCobrar {
    nroticket: number;
    caja_id: number;
}
