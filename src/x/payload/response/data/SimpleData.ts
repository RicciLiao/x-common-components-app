import {ResponseData} from "./ResponseData";

interface Blank extends ResponseData {
}

interface Bool extends ResponseData {
    data: boolean,
}

interface Str extends ResponseData {
    data: string,
}

interface Collection<T extends ResponseData> extends ResponseData {
    data: T[]
}

interface BrokenHttp extends ResponseData {
    status: number;
    message: string;
    date: number;
}


export {
    type Blank,
    type Bool,
    type Str,
    type BrokenHttp,
    type Collection,
}
