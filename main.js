$(document).ready(function () {
    fetch("https://randomuser.me/api/?results=20")
        .then(res => res.json())
        .then(data => {
            const users = data.results;
            console.log(users)
            const userContainer = document.getElementById("user-container");
            function generateUsers(user) {
                const col = document.createElement("div");
                col.classList.add("col-sm-6", "col-lg-4", "mb-4");
                // col.style.maxWidth = "";

                const card = document.createElement("div");
                card.classList.add("card");

                const img = document.createElement("img");
                img.src = user.picture.large;
                img.classList.add("rounded-circle");

                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");
                cardBody.style.textAlign = "center";

                const name = document.createElement("h5");
                name.textContent = `${user.name.first} ${user.name.last}`;
                name.classList.add("card-title");
                name.style.textAlign = "center";

                const email = document.createElement("p");
                email.textContent = user.email;
                email.classList.add("card-text");

                const phone = document.createElement("p");
                phone.textContent = user.phone;
                phone.classList.add("card-text");

                cardBody.appendChild(email);
                cardBody.appendChild(phone);

                card.appendChild(name);
                card.appendChild(img);
                card.appendChild(cardBody);

                col.appendChild(card);
                userContainer.appendChild(col);
            }
            users.forEach(user => generateUsers(user));

            const searchInput = document.getElementById("search-input");
            searchInput.addEventListener("input", event => {
                const filteredUsers = users.filter(user => {
                    const name = `${user.name.first} ${user.name.last}`;
                    return name.toLowerCase().includes(event.target.value.toLowerCase());
                });

                // Clear existing cards
                userContainer.innerHTML = "";

                // Generate user cards for filtered data
                filteredUsers.forEach(user => generateUsers(user));
            });
        })
        .catch(error => console.log(error));
});