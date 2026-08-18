# Diamond Takarítás Győr

Statikus weboldal a Diamond Takarítás Győr lakossági takarítási szolgáltatásaihoz.
A tartalom és a SEO-struktúra a fejlesztői specifikáció alapján készült.

**Élő oldal:** https://lukacsartur13.github.io/diamondtakaritas/
(a végleges cím a tervek szerint: https://diamondtakaritas.hu/)

## Felépítés

```
site/                          a publikált weboldal
├── index.html                 Főoldal
├── szolgaltatasok/            Szolgáltatások
├── kapcsolat/                 Kapcsolat + ajánlatkérő űrlap
├── adatkezelesi-tajekoztato/  Adatkezelési tájékoztató (vázlat)
├── impresszum/                Impresszum (vázlat)
├── robots.txt, sitemap.xml
└── assets/                    style.css, main.js, képek és logók
.github/workflows/deploy.yml   automatikus GitHub Pages deploy
OLVASSEL.md                    fejlesztői átadási dokumentum
```

Nincs build lépés és nincs külső függőség: egyetlen CSS- és egyetlen JS-fájl,
saját tárhelyről kiszolgált képekkel.

## Helyi futtatás

```bash
cd site && python3 -m http.server 4321
```

Ezután: http://localhost:4321

## Élesítés előtti teendők

A teljes lista az [OLVASSEL.md](OLVASSEL.md) fájlban. A legfontosabbak:
valós telefonszám / e-mail / nyitvatartás, az ajánlatkérő űrlap szerveroldali
bekötése, a képek felhasználási jogának tisztázása, a jogi oldalak véglegesítése,
valamint a GA4 / Google Tag Manager beillesztése.
