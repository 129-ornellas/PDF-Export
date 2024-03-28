import express from 'express';
import puppeteer from 'puppeteer';
import 'dotenv/config'
const app = express();
const port = 3000;

const browser = await puppeteer.launch({headless: false});
var page = await browser.newPage();

// login inicial

await page.goto('http://localhost/gestao/');

await page.type('#ds_login', process.env.DS_LOGIN);
await page.type('#ds_senha', process.env.DS_SENHA);

const login = await page.waitForSelector('#submit_login');
await login.evaluate(b => b.click());

const mosaico = await page.waitForSelector('#headerSmall > div > div > div:nth-child(2) > a');
await mosaico.evaluate(b => b.click());

const moduloRel = await page.waitForSelector('#modulos > div > a:nth-child(3) > div');
await moduloRel.evaluate(b => b.click());

const pastaRelatorios = await page.waitForSelector('#barra_pesquisa_relatorio > div:nth-child(2) > div.tree--small.tree > ul > li > div');
await pastaRelatorios.evaluate(b => b.click());

const pastaAcademicos = await page.waitForSelector('#barra_pesquisa_relatorio > div:nth-child(2) > div.tree--small.tree > ul > li > ul > li:nth-child(1) > div > span > span');
await pastaAcademicos.evaluate(b => b.click());

const selecionaRelatorio = await page.waitForSelector('#tela-impressao-documento-vue-app > div.container > div > div.row.parent > div.animated.bounceInRight.div-impressao > div > div > div > div > div > div > div > div:nth-child(2) > div.tree--small.tree > ul > li > ul > li.tree-node.has-child.expanded.selected.draggable > ul > li.tree-node.has-child.draggable > div > span');
await selecionaRelatorio.evaluate(b => b.click());

const selecionaRelatorio2 = await page.waitForSelector('#barra_pesquisa_relatorio > div:nth-child(2) > div.tree--small.tree > ul > li > ul > li.tree-node.has-child.expanded.draggable > ul > li.tree-node.has-child.expanded.selected.draggable > ul > li:nth-child(4) > div > span');
await selecionaRelatorio2.evaluate(b => b.click());

const selecionaRelatorio3 = await page.waitForSelector('#tela-impressao-documento-vue-app > div.container > div > div.row.parent > div.animated.bounceInRight.div-impressao > div > div > div > div > div > div > div > div:nth-child(2) > div.tree--small.tree > ul > li > ul > li.tree-node.has-child.expanded.draggable > ul > li.tree-node.has-child.expanded.draggable > ul > li.tree-node.has-child.expanded.selected.draggable > ul > li:nth-child(2) > div');
await selecionaRelatorio3.evaluate(b => b.click());

await new Promise(resolve => setTimeout(resolve, 3000));

await page.type('#nr_anosemestre', '20231', {delay: 700});

const visualizaRelatorio = await page.waitForSelector('#botao_visualiza_rel');

await new Promise(resolve => setTimeout(resolve, 7000));

await visualizaRelatorio.evaluate(b => b.click());

await new Promise(resolve => setTimeout(resolve, 10000));

const guias = await browser.pages();

await new Promise(resolve => setTimeout(resolve, 2000));

page = guias[guias.length - 1]

await new Promise(resolve => setTimeout(resolve, 2000));

// const header = await page.waitForSelector('#cabecalho-relatorio');

// const headerContent = await page.evaluate(element => element.outerHTML, header);

const headerContent = '<h1>ABABA</h1>'

await new Promise(resolve => setTimeout(resolve, 12000));

const puppeteerOptions = {
    path: 'relatorio.pdf',
    // margin: { top: '100px'},
    format: 'A4',
    displayHeaderFooter: true,
    preferCSSPageSize: true,
    headerTemplate: headerContent
}
const exportPDF = await page.pdf(puppeteerOptions);