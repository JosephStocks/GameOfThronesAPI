$(() => {
    let url = "https://www.anapioficeandfire.com/api/characters?pageSize=50";

    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status == 200) {
            let linkString = this.getAllResponseHeaders()
                .split("\n")
                .filter((eachString) => {
                    return eachString.trim().toLowerCase().startsWith("link");
                });
            const regex = /(?<=page=)\d+/gm;
            let finalString = linkString[0]
                .split(",")
                .filter((eachStr) => eachStr.trim().endsWith(`rel="last"`))[0];
            let numPages = Number(regex.exec(finalString)[0]);
            grabAllCharacterData(numPages);
        }
    };

    request.open("GET", url);
    request.send();

    console.log(request);

    const grabAllCharacterData = (numPages) => {
        let apiPageURLs = [];
        for (let i = 1; i <= numPages; i++) {
            apiPageURLs.push(
                `https://www.anapioficeandfire.com/api/characters?page=${i}&pageSize=50`
            );
        }
        Promise.all(apiPageURLs.map((url) => fetch(url)))
            .then((responseArr) => {
                return Promise.all(
                    responseArr.map((response) => response.json())
                );
            })
            .then((resultsArr) => console.log(processData(resultsArr.flat())));
    };

    const processData = (characterObjects) => {
        let charArr = characterObjects.filter(
            (characterObj) => characterObj.allegiances.length > 0
        );
        let count = 0;
        for (const character of charArr) {
            renderCharacter(character);
            count++;
            // if (count > 70) {
            //     break;
            // }
        }
    };

    const renderCharacter = (character) => {
        if (character.name.length > 0) {
            let resultsDiv = document.querySelector("#results");
            let newCardHTML = `
        <button id="card" data-apiurl="${
            character.url
        }" href="https://www.google.com/" class="block group transition-all duration-1000 bg-white hover:shadow-2xl border border-blueGray-200 hover:border-2 hover:border-white min-h-40">
            <div class="front">
                <div id="name" class="text-3xl p-4 flex flex-row flex-wrap justify-center content-center">
                    <div class="text-center whitespace-pre-line">${character.name.replace(
                        " ",
                        "\n"
                    )}</div>
                </div>
                <!-- <div id="info-bottom" class="pb-4 px-4">
                    <div class="text-lg">
                        <div id="line1">
                            Gender:&nbsp;
                            <span>${character.gender}</span>
                        </div>
                    </div>                   
                </div> -->
            </div>
            <div class="back hidden">
            <div id="name" class="text-3xl p-4 flex flex-row flex-wrap justify-center content-center">
                <div class="allegiance-name text-center whitespace-pre-line"></div>
            </div>
        </div>
        </button>`;
            resultsDiv.insertAdjacentHTML("beforeend", newCardHTML);
            observer.observe(resultsDiv.lastElementChild);
        }
    };

    $("#results").on("mouseenter", "button", function () {
        this.classList.add("bg-red-500", "text-sm");
        this.children[0].classList.add("hidden");
        this.children[1].classList.remove("hidden");
        $.getJSON(this.dataset.apiurl).done((data) => {
            console.log(data);
            if (data.allegiances.length > 0) {
                $.getJSON(data.allegiances[0]).done((data) => {
                    // data.name
                    this.querySelector(".allegiance-name").textContent =
                        data.name;
                });
            }
        });
    });

    $("#results").on("mouseleave", "button", function () {
        this.classList.remove("bg-red-500", "text-sm");
        this.children[0].classList.remove("hidden");
        this.children[1].classList.add("hidden");
    });
});

let options = {
    root: null,
    rootMargin: "1000px",
    threshold: 0,
};

const observer = new IntersectionObserver(
    (entries) => {
        entries
            .filter((entry) => entry.isIntersecting)
            .forEach((entry) => {
                let button = entry.target;
                $.getJSON(button.dataset.apiurl).done((data) => {
                    console.log(data);
                    if (data.allegiances.length > 0) {
                        $.getJSON(data.allegiances[0]).done((data) => {
                            button.querySelector(
                                ".allegiance-name"
                            ).textContent = data.name;
                        });
                    }
                });
            });
    },
    {
        root: null,
        threshold: 0,
        rootMargin: "1000px",
    }
);
