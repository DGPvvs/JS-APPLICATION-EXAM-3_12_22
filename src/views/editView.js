import { html, detailsData, editData, validateData } from '../lib.js';

const editTempl = (s, onSubmit) => html`<section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit=${onSubmit} class="edit-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${s.singer}/>
    <input type="text" name="album" id="album-album" placeholder="Album" .value=${s.album}/>
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${s.imageUrl}/>
    <input type="text" name="release" id="album-release" placeholder="Release date" .value=${s.release}/>
    <input type="text" name="label" id="album-label" placeholder="Label" .value=${s.label}/>
    <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${s.sales}/>

    <button type="submit">post</button>
  </form>
</div>
</section>`;

export async function editView(ctx){
    const shoe = await detailsData(ctx.params.id);

    ctx.render(editTempl(shoe, onSubmit));

    async function onSubmit(e){

        e.preventDefault();
        const form = e.target;

        let fields = Object.fromEntries(new FormData(form));
        fields = validateData(fields) 

        if (!fields) {
            return alert('There are empty field');            
        }
        await editData(shoe._id, fields);
        e.target.reset();
        ctx.page.redirect(`/catalog/${shoe._id}`);        					
    }
}