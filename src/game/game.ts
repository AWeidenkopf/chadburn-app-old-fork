export interface GameState {
    // mapping between teams and points
    score: Map<string, number>

    // the team whose turn it is
    teamInTurn: string
}