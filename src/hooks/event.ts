export const EVENT_STORE: Record<string, Set<EventHandler>> = {}

interface EventHandler<T = any> {
    (data: T): void
}

export function addListener<T>(name: string, handler: EventHandler<T>) {
    if (!EVENT_STORE[name]) {
        EVENT_STORE[name] = new Set<EventHandler>()
    }
    EVENT_STORE[name].add(handler)
}

export function removeListener(name: string, handler?: EventHandler) {
    if (!EVENT_STORE[name]) return
    if (!handler) {
        return delete EVENT_STORE[name]
    }
    EVENT_STORE[name].delete(handler)
}

export function emitEvent<T>(name: string, data: T) {
    if (!EVENT_STORE[name]) return
    EVENT_STORE[name].forEach((handler: EventHandler<T>) => handler(data))
}
