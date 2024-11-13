// interfaces
interface Endpoints {
    america: string
    europe: string
}

interface Flags {
    png: string
    svg: string
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
    languages: Language
    capital: []
    maps: Map
    population: number
}

interface Language {
    [key: string]: string
}

export type{
    Endpoints,
    Flags,
    Name,
    Map,
    Country
}