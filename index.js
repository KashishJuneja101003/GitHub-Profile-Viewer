function displayUser(result){
    const {avatar_url, name, bio, followers, following, public_repos, html_url} = result;

    if(!html_url){
        document.getElementById("userProfile").innerHTML = `<h1>User Not Found</h1>`;
        return;
    }

    if(!bio) bio=''


     document.getElementById("userProfile").innerHTML = `
            <!-- Left -->
            <div class="flex flex-col justify-between gap-3">
                <img class="w-40 rounded-[50%]" src=${avatar_url} id="img" alt="">
                <p class="text-2xl font-bold">${name}</p>
                <p class="w-100">${bio}</p>
            </div>

            <!-- Right -->
            <div class="space-y-15">
                <!-- Up -->
                 <div class="flex gap-5 text-2xl">
                    <div class="flex flex-col items-center">
                        <p class="font-bold">Followers</p>
                        <p>${followers}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="font-bold">Following</p>
                        <p>${following}</p>
                    </div>
                    <div class="flex flex-col items-center">
                        <p class="font-bold">Repositories</p>
                        <p>${public_repos}</p>
                    </div>
                 </div>

                 <!-- Down -->
                  <a href="${html_url}" target="_blank" class="border-2 flex p-1 justify-center border-white rounded-xl">
                    Visit Profile
                  </a>
            </div>`;
}

async function fetchUser(name) {
  const response = await fetch(`https://api.github.com/users/${name}`);
  const result = await response.json();
  displayUser(result);
}


document.getElementById("search").addEventListener("click", () => {
    document.getElementById("userProfile").innerHTML = `<span class="loader"></span>`;
    const name = document.getElementById("name").value;
    document.getElementById("userProfile").style.display = 'flex';
    fetchUser(name);
});
