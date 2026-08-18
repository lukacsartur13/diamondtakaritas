# Diamond Takarítás Győr – weboldal

A `site/` mappa a `diamond-takaritas-gyor-fejlesztoi-seo-szovegezes.docx` specifikáció alapján
elkészített statikus weboldalt tartalmazza. Minden szöveg a specifikációból származik.

## Fájlszerkezet

```
site/
├── index.html                          Főoldal
├── szolgaltatasok/index.html           Szolgáltatások
├── kapcsolat/index.html                Kapcsolat + ajánlatkérő űrlap (#arajanlat)
├── adatkezelesi-tajekoztato/index.html Adatkezelési tájékoztató (vázlat, kitöltendő)
├── impresszum/index.html               Impresszum (vázlat, kitöltendő)
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/style.css                   Teljes stíluslap (sötétkék + fehér + arany)
    ├── js/main.js                      Mobil menü, GA4 események, űrlapvalidálás
    └── img/                            Ide kerülnek a képek (lásd OLVASSEL.txt)
```

## Designrendszer (v2 – „editorial luxe”)

A vizuális irány az awwwards nominees oldalán látható aktuális trendekre épül:
teljes képernyős cinematikus hero, oversized display-tipográfia, ritkított verzál
kislabelek, hajszálvonalas számozott indexek, sötét editorial felületek egyetlen
akcentusszínnel, kinetikus szalag és scroll-vezérelt megjelenés.

**Színek** (CSS-változók a `:root`-ban)

| Token | Érték | Használat |
|---|---|---|
| `--ink` / `--ink-2` | `#080D1B` / `#0E1730` | sötét szekciók, hero, lábléc |
| `--ivory` | `#F6F3ED` | világos szekciók (meleg, nem rideg fehér) |
| `--gold` / `--gold-lt` | `#B58F45` / `#D8BC85` | CTA, kislabelek, hajszálvonalak, számok |

A szekciók szándékosan váltakoznak sötét és ivory között; a világos-sötét váltás adja
a ritmust. Osztályok: `.s-ink`, `.s-ink-2`, `.s-ivory`, `.s-paper`.

**Whitespace és rács.** Szekciónkénti függőleges levegő `clamp(84px, 11vw, 172px)`,
konténer 1340 px, oldalmargó `clamp(20px, 4vw, 56px)`. Az editorial rács `.split`
(5/7 vagy 7/5 arány), a bal oszlop sok helyen `position: sticky`, így görgetés közben
a cím megáll, a tartalom fut mellette.

**Tipográfia.** Display: nagy kontrasztú talpas (rendszerkészlet: Iowan Old Style /
Palatino / Georgia), szöveg: rendszer sans. Külső betűtípus-hivatkozás nincs, így
nincs CDN-függés, extra kérés és Google Fonts-os GDPR-kérdés. Ha egyedi betűtípust
szeretne (pl. Fraunces + Inter), elég a `--font-display` és `--font-sans` változót
átírni, és a fájlokat saját tárhelyről `@font-face`-szel betölteni.

**Mozgás.**

- Cím-megjelenés: a `data-split` címek szavakra bomlanak, és maszk mögül úsznak fel.
- Blokk-megjelenés: `data-reveal` (fade + felúszás), `data-reveal="fade"`,
  `data-reveal="clip"` (bal-jobb kitakarás); `data-stagger` a lépcsőzetes időzítéshez.
- Parallax: `data-parallax="0.05"` a képkereteken, rAF-fal, scrollhoz kötve.
- Fejléc: 40 px után letisztul és elhalványul lefelé görgetve, felfelé azonnal visszatér.
- Felül vékony aranyszínű haladásjelző sáv, alul mobilon sticky CTA sáv 420 px után.
- Kinetikus marquee a szolgáltatásnevekkel (hover-re megáll).
- Egyedi kurzor (aranykarika, linkeken kitágul) és mágneses fő CTA-k – csak egérrel.
- `prefers-reduced-motion: reduce` esetén minden animáció kikapcsol, a tartalom
  azonnal látszik.

**Interakciók.** Számozott szolgáltatásindex arany fényátsuhanással és forgó
nyíllal; a szolgáltatások oldalon sticky oldalsó index, amely görgetés közben jelöli
az aktuális szakaszt; teljes képernyős mobilmenü nagy talpas menüpontokkal.

## Logóhasználat

A `T.png` (fehér) és `T-2.png` (fekete) logóból készültek a webes változatok:

| Fájl | Hol jelenik meg |
|---|---|
| `logo-feher-400/800.webp` | fejléc (42 px magas, görgetéskor 34 px), lábléc, mobilmenü |
| `logo-feher-800.webp` | lábléc nagy vízjel (10% átlátszóság) |
| `logo-fekete-400/800.webp` | az ajánlatkérő űrlap kártyájának fejléce (világos felület) |
| `jel-fekete-256.webp` | a „Köszönjük megkeresését!” visszajelzés jele |
| `favicon.ico`, `apple-touch-icon.png`, `icon-512.png` | böngészőfül és mobil kezdőképernyő – sötétkék háttéren a fehér gyémántjel, így világos és sötét felületen is látszik |
| `og-diamond-takaritas-gyor.jpg` | közösségi megosztás: enteriőrfotó sötét átmenettel és fehér logóval |

A fejléc és a lábléc sötét háttéren áll, ezért ott mindenhol a fehér változat szerepel;
a fekete változat a világos (ivory/fehér) felületekre való. A logó eredetileg 2000×2000
képpontos, nagyrészt üres PNG volt – a webes fájlok levágott, méretre szabott WebP-k.
Ha később vektoros (SVG) logó készül, azt érdemes ezekre cserélni.

## Helyi megtekintés

A linkek gyökér-relatívak (`/szolgaltatasok/`), ezért webszerver szükséges:

```bash
cd "site" && python3 -m http.server 4321
```

Ezután: http://localhost:4321

## Ami már megvalósult

- Teljes designrendszer (lásd fent), 5 kész oldal, konzolhiba nélkül.
- Logó beépítve fejlécbe, láblécbe, az űrlapkártyára, favicon és OG-kép is belőle készült.
- Képek beépítve: főoldali hero és részletkép, mind az öt szolgáltatáshoz saját fotó,
  plusz közösségi megosztási (OG) kép. Mind WebP, két méretben, `srcset` + `sizes`
  szerint tálalva, a hero `fetchpriority="high"`, a többi `loading="lazy"`.
- Oldalanként pontosan egy H1; a navigáció, lábléc és CTA címkék nem H1-esek.
- Fejléc logóval, Főoldal / Szolgáltatások / Kapcsolat navigációval és kiemelt
  „Ingyenes árajánlat” gombbal; mobilon lenyíló menü.
- Mobil sticky alsó sáv: „Hívjon most” (tel:) és „Árajánlatot kérek”.
- Minden CTA a `/kapcsolat/#arajanlat` szakaszra visz, kivéve a telefonos CTA-kat.
- Telefonszám `tel:`, e-mail `mailto:` linkként mindenhol.
- Oldalanként egyedi title, meta description, canonical, robots és Open Graph címkék
  a specifikáció szövegével.
- JSON-LD `LocalBusiness` a főoldalon (placeholder értékekkel), `FAQPage` a főoldalon és
  a kapcsolat oldalon – csak a ténylegesen látható kérdés-válasz blokkokra.
  `aggregateRating` és `Review` szándékosan NINCS benne.
- Ajánlatkérő űrlap a specifikáció szerinti mezőkkel, magyar telefonszám- és
  e-mail-validálással, kötelező adatkezelési jelölőnégyzettel, honeypot spamvédelemmel,
  köszönő üzenettel.
- GA4 / GTM `dataLayer` események: `form_submit`, `form_error`, `click_to_call`,
  `click_email`, `click_navigation`, `click_cta` (CTA pozícióval együtt).
- Nincs kitalált ügyfélvélemény, értékelés, biztosítási állítás, válaszidő-ígéret vagy
  elégedettségi garancia. Nincs irodai, céges, ipari vagy Airbnb-takarításra utaló tartalom.
- Ár sehol nem szerepel, csak egyedi árajánlat.

## Élesítés előtti teendők

1. **Placeholder adatok cseréje** (mindenhol `+36XXXXXXXXX`, `+36 XX XXX XXXX`,
   `info@diamondtakaritas.hu`, nyitvatartás, cím):
   - fejléc, lábléc, mobil sticky sáv, kapcsolat oldal, JSON-LD, impresszum, adatkezelési tájékoztató.
2. **Űrlap bekötése**: a `kapcsolat/index.html` `form action="/kuldes"` értéke placeholder.
   A küldést szerveroldali végponthoz kell kötni (mailer / form API / CRM webhook), és a
   `assets/js/main.js` `showSuccess()` hívását a sikeres válaszhoz kötni. Szerveroldali
   spamvédelem javasolt a honeypot mellé.
3. **Képjogok és referenciafotók**: a weboldalon a megrendelő által megadott fotók
   szerepelnek, WebP-be konvertálva, két méretben (`srcset`), `width`/`height` és leíró
   alt szöveggel (lista: `site/assets/img/OLVASSEL.txt`). Élesítés előtt tisztázni kell a
   felhasználási jogot (saját fotó vagy érvényes stock licenc). A képek belsőépítészeti
   enteriőrök, nem elvégzett munkákról készült referenciák, ezért az alt szövegek a
   látható enteriőrt írják le – valós referenciafotók esetén ezekre érdemes cserélni.
4. **GTM / GA4**: a konténer kódjának beillesztése a `<head>` részbe (a helye kommenttel jelölve
   a `index.html`-ben). A `form_submit` eseményt Google Ads konverzióként is importálni kell.
5. **Jogi oldalak véglegesítése**: az adatkezelési tájékoztató és az impresszum szögletes
   zárójeles mezőit valós adatokkal kell kitölteni, és a szöveget jogi jóváhagyásra bocsátani.
6. **Domain és hosting**: HTTPS, egységes www / nem-www 301-es átirányítás,
   `sitemap.xml` és `robots.txt` élesítése a valós domainnel, Google Search Console tulajdon
   ellenőrzés. A `sitemap.xml`-ben szereplő URL-eket a végleges domainre kell cserélni.
7. **Fejlesztői dobozok törlése**: a sárga, szaggatott keretes `.dev-note` blokkok és a
   HTML-ben lévő „FEJLESZTŐI TEENDŐ” kommentek élesítés előtt eltávolítandók.
8. **Böngésző-gyorsítótár**: a CSS/JS módosítása után élesben érdemes verziószámot
   tenni a hivatkozásokra (`style.css?v=2`), különben a látogatóknál a régi fájl maradhat.
9. **Ellenőrzés**: LocalBusiness markup validálása (Rich Results Test), minden belső link és
   CTA tesztelése, mobil sticky CTA és `tel:` linkek ellenőrzése, duplikált metaadatok kizárása.
