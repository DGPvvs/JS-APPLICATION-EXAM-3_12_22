import {html, createData, validateData} from '../lib.js';

const createTempl = (onSubmit) => html`<section id="create">
<div class="form">
  <h2>Add Album</h2>
  <form @submit=${onSubmit} class="create-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" name="album" id="album-album" placeholder="Album" />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" name="release" id="album-release" placeholder="Release date" />
    <input type="text" name="label" id="album-label" placeholder="Label" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>`;


export async function createView(ctx){
    ctx.render(createTempl(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        const form = e.target;
        
        let fields = Object.fromEntries(new FormData(form));
        fields = validateData(fields) 

        if (!fields) {
            return alert('There are empty field');            
        }

        await createData(fields);
        e.target.reset();
        ctx.page.redirect('/catalog');
    }
}