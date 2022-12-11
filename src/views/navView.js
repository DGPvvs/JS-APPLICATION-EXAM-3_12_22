import { html } from '../lib.js';

const navUserTempl = (u) => html`<div>
<a href="/catalog">Dashboard</a>
</div>

<!-- Logged-in users -->
<div class="user">
<a href="/create">Add Album</a>
<a href="/logout">Logout</a>
</div>
`;

const navGuestTempl = () => html`<div>
<a href="/catalog">Dashboard</a>
</div>

<!-- Guest users -->
<div class="guest">
<a href="/login">Login</a>
<a href="/register">Register</a>
</div>`;



export function navView(ctx) {
  if (ctx.user != null) {
    return navUserTempl(ctx.user);
  }

  return navGuestTempl();
}