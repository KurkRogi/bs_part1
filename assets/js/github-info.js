function fetchGitHubInformation(event) {

    let username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GutHub username</h2>`);
        return;
    };

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="./assets/css/loader.gif" alt="Loading..." /img>
        </div>`);
    
    $.when($.getJSON(`https://api.github.com/users/${username}`))
    .then(
        function (response) {
            $("#gh-user-data").html(userInformationData(response))
        },
        function (response) {
            if (response.status === 404) {
                $("#gh-user-data").html(`<h2>No information found on ${username}</h2>`);
            } else {
                console.log(response)
                $("#gh-user-data").html(`<h2>Error: ${response.responseJSON.message}</h2>`)
            }
        }
    );
};

function userInformationData(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" alt="${user.login}" width="80" height="80" />
                </a>
            </div>
            <p> Followers: ${user.followers} - Following: ${user.following} <br>
            Repos: ${user.public_repos}
            </p>
        </div>`
}