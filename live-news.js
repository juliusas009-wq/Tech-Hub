import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const newsContainer = document.getElementById("newsContainer");

async function loadNews() {

    newsContainer.innerHTML = "<p>Loading latest news...</p>";

    try {

        const querySnapshot = await getDocs(collection(db, "news"));

        newsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {

            const news = doc.data();

            newsContainer.innerHTML += `

            <div class="news-card">

                <img src="${news.image}" alt="${news.title}">

                <div>

                    <span>${news.category}</span>

                    <h3>${news.title}</h3>

                    <p>${news.summary}</p>

                    <small>${news.date} | ${news.author}</small>

                    <br><br>

                    <a href="${news.link}" class="read-btn">
                        Read More
                    </a>

                </div>

            </div>

            `;

        });

    } catch (error) {

        newsContainer.innerHTML = "<p>Unable to load news.</p>";

        console.error(error);

    }

}

loadNews();