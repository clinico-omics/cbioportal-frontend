export type PathwayRecord = {
    pathwayId: string,
    pathwayScore: string,
    pathwayUrl: string,
    pathwayName: string,
    species: string,
    revision: number,
    hugoGeneSymbol: string,
};

export type PathwayRawRecord = {
    id: string,
    name: string,
    revision: number,
    species: string,
    url: string,
    score: { [key: string]: string; }
}