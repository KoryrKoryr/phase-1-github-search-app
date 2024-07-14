document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("github-form");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search").value.trim();

    // Make API request to search for users
    const usersResponse = await fetch(
      `https://api.github.com/search/users?q=${searchInput}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const usersData = await usersResponse.json();

    // Display user search results
    userList.innerHTML = "";
    usersData.items.forEach((user) => {
      const userItem = document.createElement("li");
      userItem.textContent = user.login;
      userList.appendChild(userItem);

      userItem.addEventListener("click", async () => {
        // Make API request to get user's repositories
        const reposResponse = await fetch(user.repos_url, {
          headers: {
            Accept: "application/vnd.github.v3+json",
          },
        });
        const reposData = await reposResponse.json();

        // Display user's repositories
        reposList.innerHTML = "";
        reposData.forEach((repo) => {
          const repoItem = document.createElement("li");
          repoItem.textContent = repo.name;
          reposList.appendChild(repoItem);
        });
      });
    });
  });
});
// // Variable to store the current search type
// let searchType = "user"; // Default to searching for users

// // Function to toggle the search type
// function toggleSearchType() {
//   searchType = searchType === "user" ? "repo" : "user";
//   // You can update the UI here to reflect the current search type
// }

// // Event listener for the toggle button
// document.getElementById("toggleButton").addEventListener("click", function () {
//   toggleSearchType();
// });

// // Function to perform the search based on the current search type
// function performSearch(keyword) {
//   if (searchType === "user") {
//     // Search for users by keyword
//     // Add your logic here
//     console.log("Searching for users with keyword:", keyword);
//   } else {
//     // Search for repos by keyword
//     // Add your logic here
//     console.log("Searching for repos with keyword:", keyword);
//   }
// }
