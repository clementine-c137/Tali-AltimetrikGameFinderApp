const urlKey = 'https://api.rawg.io/api/platforms?c171203ffd95417e994a2949e49ca0f8';

const loadRawg = async function() {
    const catalog = await fetch(urlKey, {
        method: 'GET',

    })
    const responseJson = await  response.json();
    if (response.status === 200) {
        console.log(response);
    }
}

