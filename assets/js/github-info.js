function fetchGitHubInformation(event) {

    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");

    let username = $("#gh-username").val();

    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GutHub username</h2>`);
        return;
    };

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="./assets/css/loader.gif" alt="Loading..." /img>
        </div>`);
    
    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
        )
    .then(
        function (firstResponse, secondResponse) {
            userData = firstResponse[0];
            repoData = secondResponse[0];

            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(repoInformationHTML(repoData));
        },
        function (response) {
            if (response.status === 404) {
                $("#gh-user-data").html(`<h2>No information found on ${username}</h2>`);
            } else if (response.status === 403) {
                var resetTime = new Date(response.getResponseHeader('X-RateLimit-Reset') * 1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
            } else {
                console.log(response)
                $("#gh-user-data").html(`<h2>Error: ${response.responseJSON.message}</h2>`)
            }
        }
    );
};

function userInformationHTML(user) {
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
};

function repoInformationHTML(repos) {
    console.log(repos);
    console.log(repos.length);
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No Repos!</div>`
    }

    var listItemsHTML = repos.map(function(repo){
        return `
            <li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </li>`
    });

    return `<div class="clearfix repo-list">
                <p><strong>Repo list:</strong></p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`
        
}

$(document).ready(fetchGitHubInformation);