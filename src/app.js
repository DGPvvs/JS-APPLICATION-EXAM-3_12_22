import {initPath, getUserDate, page, render, logout} from './lib.js';

import {homeView} from './views/homeView.js';
import {loginView} from './views/loginView.js';
import {registerView} from './views/registerView.js';
import {catalogView} from './views/catalogView.js';
import {navView} from './views/navView.js';
import {createView} from './views/createView.js';
import {detailsView} from './views/detailsView.js';
import {editView} from './views/editView.js';

initPath('/data/albums');

const main = document.querySelector('main');
const nav = document.querySelector('nav');


page(decorateNav);
page(decorateContext);
page('/index.html', '/');
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', catalogView);
page('/create', createView);
page('/catalog/:id', detailsView);
page('/edit/:id', editView);
page('/logout', onLogout);

page.start();

function decorateContext(ctx, next){
    ctx.render = renderMain;
    next();
}

function decorateNav(ctx, next){    
    let user = getUserDate();
    ctx.user = user;
    render(navView(ctx), nav);    
    
    next();
}

function renderMain(templateResult){
    render(templateResult, main);
}

function onLogout(){
    logout();
    page.redirect('/');
}

function empty(d)
{
    console.log(d);
}