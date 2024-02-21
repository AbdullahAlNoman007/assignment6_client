import { ReactNode } from "react";

export type Tacc = {
    path: string;
    element: ReactNode;
}

export type Troutes = {
    key: string;
    name: string;
    element?: ReactNode;
    children?: Troutes[]
}
export type Tregister = {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
}
export type Tlogin = {
    email: string;
    password: string;
}

export type Tuser = {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}

export interface Tauth {
    user: Tuser | null;
    token: string | null
}

export interface Tproduct {
    _id?: string;
    name: string;
    price: number;
    quantity: number;
    releaseDate?: Date;
    brand: string;
    model: string;
    operatingSystem: 'andriod' | 'iOS';
    ram: string;
    waterResistance: boolean;
    storageCapacity: string;
    screenSize: string;
    cameraQuality: string;
    batteryLife: string;
}

