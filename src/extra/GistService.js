export async function fetchGists() {
    // const url = `https://api.github.com/users/${username}/gists`;
    const url = 'http://localhost:8081/gists';

    return await fetchData(url);
}

export async function fetchFileContent(file) {
    return await fetchData(file.raw_url.slice(0, file.raw_url.indexOf(file.filename) - 1), false);
}

async function fetchData(url, isJson = true) {
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json',
        },
    });

    if (res.status >= 200 && res.status < 300) {
        if (!isJson) {
            var text = (await res.blob()).text();
        }
        return res ? (isJson ? res.json() : await text) : []
    }

    const error = new Error(res.statusText || res.status);
    error.response = res;
    return Promise.reject(error);
}