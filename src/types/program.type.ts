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

export interface TuserInfo {
    _id: string;
    name: string;
    email: string;
    role: string;
    __v: 0;
}
export interface TproductData {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    releaseDate: string;
    brand: string;
    model: string;
    operatingSystem: 'andriod' | 'iOS';
    ram: string;
    waterResistance: boolean;
    storageCapacity: string;
    screenSize: string;
    cameraQuality: string;
    batteryLife: string;
    __v: number;
}

export interface Tresponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T[]
}

export type Tfilter = { name: string, value: boolean | React.Key }
