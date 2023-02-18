export interface IHandbookItem {
    id: number | null;
    name: string | null;
    description: string | null;
}

export interface IEngine {
    engine_id: number;
    horse_power: number;
    volume: number;
    name: string

    torgue: number;
    type: string;
    fuel_type: string;

}