const axios = require('axios');

const fetchGithubInfo = async (url) => {
    console.log(`Fetching ${url}`);

    const githubInfo = await axios(url);

    return {
        name : githubInfo.data.name,
        bio : githubInfo.data.bio,
        repos_url : githubInfo.data.repos_url,
    };
};

const fetchUserInfo = async (names) => {
    const requests = names.map((name) => {
        const url = `https://api.github.com/users/${name}`;

        return fetchGithubInfo(url).then((response) => {
            return response;
        });
    });

    // console.log("Requests:" ,requests)// pending
    return Promise.all(requests);
};

fetchUserInfo(['sindresorhus','yyx990803','gaearon']).then((response) => {
    console.log(response)
})