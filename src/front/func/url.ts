export function urlParams() {
    return new URL(window.location.href).searchParams
}

export function updateUrlParams(params: Record<string, string>) {
    const url = new URL(window.location.href)
    Object.keys(params).forEach(key => {
        url.searchParams.set(key, params[key])
    })
    history.replaceState(null, "", url)
}