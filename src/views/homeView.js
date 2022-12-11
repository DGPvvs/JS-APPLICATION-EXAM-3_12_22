import { html } from '../lib.js';

const homeTempl = (m) => html`<section id="home">
<img src="./images/landing.png" alt="home" />

<h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right
    here!</span></h2>
</section>`;

export async function homeView(ctx) {
    //let ofers = await homeData();
    ctx.render(homeTempl(null));
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
