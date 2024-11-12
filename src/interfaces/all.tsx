// interfaces
interface Endpoints {
    america: string,
    europa: string
}

interface Flags {
    png: string,
    svg: string,
    alt: string
}

interface Name {
    official: string
    common: string
}

interface Map {
    googleMaps: string
    openStreetMaps: string
}

interface Country {
    flags: Flags
    name: Name
    languages: []
    capital: []
    maps: Map
    population: number
}

export type{
    Endpoints,
    Flags,
    Name,
    Map,
    Country
}