# Szakdolgozat könyvajánló app - Schmidt Péter - ELTE IK

## Elvégzett feladatok

- [x] Létrehoztam az alkalmazás alapvető elrendezését
- [x] Implementáltam API hívásokat a könyvadatok lekérdezéséhez
- [x] Komponenseket hoztam létre a könyv információk megjelenítéséhez
- [x] Implementáltam lenyíló menüket a BookQuotes, BookCitations, BookEditions és BookReviews számára
- [x] Stílusosítottam a komponenseket Bootstrap segítségével
- [x] API teszteket írtam
- [x] Felbontottam a projektet kisebb komponensekre
- [x] Horogokat használtam az állapotkezeléshez és a prop drilling elkerüléséhez
- [x] Létrehoztam egy proxy-t a Citatum API-hoz
- [x] Megjelenítés: Citatum, oldalszám és kategória a kártyán
- [x] Biztosítani, hogy csak egy könyvcím kerüljön lekérdezésre
- [x] Regisztráció, bejelentkezés és könyvajánlás oldalak implementálása
- [x] Felhasználó Navbar kijelentkezés dropdown lehetőséggel
- [x] Regisztráció implementálása felhasználói adatokkal, bejelentkezéskor a felhasználónév megjelenítése

## Hátralévő feladatok

- [ ] Regisztrációhoz Google regisztrálás hozzáadása illetve a felhasználónév kiegészítése, felhasználó profilkép
- [ ] Funkció hozzáadása a könyvek mentéséhez, dátummal a felhasználói profilban, a mentett könyvek megjelenítése címmel és borítóképpel
- [ ] Könyvek olvasásának követésére lehetőség
- [ ] A könyvekhez egy az oldalhoz egyéni érdeklési szám meghatározása
- [ ] Egy könyvnek külön oldal létrehozása, ahová például a mentett könyvek irányít, de van lehetőség máshonnan is oda menni.
- [ ] Egyéni könyvek hozzáadása a könyv olvasáshoz, amit esetleg az oldal nem ismer.
- [ ] Értesítési rendszer
- [ ] Felhasználók számára lehetővé tenni a könyvekekre haladási tervet meghatározni és annak eseményekeinek exportálását naptárba
- [ ] Komponensek refaktorlása és a front-end megjelenő szöveg átírása magyarrá
- [ ] Források megjelenítése, Moly és Citatum
- [ ] Stílus javítása és további tesztek írása
- [ ] Error pages (without login saved books)
- [ ] Dokumentáció és tesztadat adatbázis -> tesztek írása
- [ ] Extra: sUrl link figyelés, hogy minden kisebb akciónak legyen, külön url-je
- [ ] Extra: mások is láthatják, hogy mennyien olvassák most azt a könyvet és hogyan 
haladnak vele
- [ ] Extra: cache methód, ami képes a régi keresések tárolására, így nem kell újra api-t hívni

[Az élő weboldal itt tekinthető meg](https://book-app-inky.vercel.app/)

## Hogyan tesztelhetem?

1. Látogasson el a főoldalra: ![Főoldal](https://i.postimg.cc/MT9f8Yqt/konyv-ajanlas-1.png)
2. Írjon be egy könyvcímet (például "Tüskevár") és kattintson a "Search" gombra.
3. Az eredmények megjelennek egy könyvkártyán, ahol további információk találhatók a könyvről: ![Eredmény könyvkártya](https://i.postimg.cc/wTyySJPc/konyv-ajanlas-2.png)
4. A könyvkártyán található lenyíló listákra kattintva (például BookQuotes, BookCitations, BookEditions és BookReviews) további részletek jelennek meg a könyvről.
