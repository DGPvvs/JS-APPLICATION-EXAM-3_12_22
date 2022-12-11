import { html, deleteData, detailsData, getUserDate, post, get } from '../lib.js';

const detailsTempl = (s, isOwner, userData, onDelete, onLike, tottalLike, isClick) => html`<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src="${s.imageUrl}" alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${s.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${s.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${s.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${s.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${s.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${tottalLike}</span></div>

  <!--Edit and Delete are only for creator-->
  <div id="action-buttons">
    ${isOwner
    ? html`<a href="/edit/${s._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="" id="delete-btn">Delete</a>`
    :``}

    ${userData != null && !isOwner && isClick == 0
        ? html`<a @click=${onLike} href="" id="like-btn">Like</a>`
        :``}  
</div>
</section>`;

export async function detailsView(ctx) {

    const shoe = await detailsData(ctx.params.id);
    const userData = getUserDate();
    let tottalLike = await get(`/data/likes?where=albumId%3D%22${ctx.params.id}%22&distinct=_ownerId&count`);

    let isClick = 0
    let albumId = ctx.params.id;

    if (userData != null && tottalLike != 0) {
      try {
        isClick = await get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userData.id}%22&count`);        
      } catch (error) {
        isClick = 0        
      }            
    }
    
    console.log(userData?.id == shoe._ownerId);
    ctx.render(detailsTempl(shoe, userData?.id == shoe._ownerId, userData, onDelete, onLike, tottalLike, isClick));

    async function onDelete(e) {
        e.preventDefault();
        if (confirm('Are you sure?')) {
            await deleteData(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }

    async function onLike(e){
      e.preventDefault();
      let target = e.target;

      const dataId = ctx.params.id;

      target.style.display = 'none';
      await post('/data/likes', {dataId});
      ctx.page.redirect(`/catalog/${ctx.params.id}`);
    }
}