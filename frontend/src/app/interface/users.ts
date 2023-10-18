export interface Usuarios {
    error: string;
    body: Usuarios[];
}
export interface registrarUsuarios {
    id: any;
    nombre: string;
    edad: string;
    profesion: string;
}

export interface Login{
    usuario: string;
    password: string;
}
