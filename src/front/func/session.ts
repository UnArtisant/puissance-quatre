import {PlayerSession} from "../../lib/types/GameType";

export function saveSession(session: PlayerSession): PlayerSession {
    localStorage.setItem("playerId", session.id)
    localStorage.setItem("name", session.name)
    localStorage.setItem("signature", session.signature)
    return session
}

export function getSession(): PlayerSession | null {
    const id = localStorage.getItem("playerId")
    const name = localStorage.getItem("name")
    const signature = localStorage.getItem("signature")

    if (!id || !name || !signature) {
        return null
    }

    return {id, name, signature}

}
export function logout() : void {
    localStorage.clear()
}