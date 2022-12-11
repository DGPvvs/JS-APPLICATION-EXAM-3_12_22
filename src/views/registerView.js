import {html, register} from '../lib.js';

const registerTempl = (onSubmit) => html`<section id="register">
<div class="form">
  <h2>Register</h2>
  <form @submit=${onSubmit} class="login-form">
    <input type="text" name="email" id="register-email" placeholder="email" />
    <input type="password" name="password" id="register-password" placeholder="password" />
    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
    <button type="submit">register</button>
    <p class="message">Already registered? <a href="/login">Login</a></p>
  </form>
</div>
</section>`;

export function registerView(ctx){
    ctx.render(registerTempl(onSubmit));

    async function onSubmit(e){
        e.preventDefault();        

        const formData = new FormData(e.target);
        
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('re-password').trim();

        if (email == '' || password == '') {
            return alert('There are empty field');
        }

        if (password != repeatPass) {
            return alert('Please repeat password');
        }

        await register(email, password);

        ctx.page.redirect('/catalog');
    }
}

