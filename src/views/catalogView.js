import { html, catalogData, getUserDate } from '../lib.js';

const catalogTempl = (m, isUser) => html`<section id="dashboard">
<h2>Albums</h2>
${m.length == 0
? html`<h2>There are no albums added yet.</h2>`
:html`<ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    ${m.map(x => card(x))}    
</ul>`}

<!-- Display an h2 if there are no posts -->
</section>`;

const card = (mem) => html`<li class="card">
    <img src="${mem.imageUrl}" alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${mem.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${mem.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${mem.sales}</span></p>
    <a class="details-btn" href="/catalog/${mem._id}">Details</a>
</li>`;

export async function catalogView(ctx) {
    const user = getUserDate();
    let ofers = await catalogData();
    ctx.render(catalogTempl(ofers, user != null));
}

async function bonus(ofers) {
    const size = await bonusSize();

    if (size > 0) {
        for (const iterator of ofers) {
            const data = {
                id: iterator._id,
                count: '0',
            };
            await postApplicationData(data);
        }
    }
}
