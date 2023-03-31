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

## Hátralévő feladatok

- [ ] Megjelenítés: Citatum, oldalszám és kategória a kártyán
- [ ] Biztosítani, hogy csak egy könyvcím kerüljön lekérdezésre
- [ ] Regisztráció, bejelentkezés és könyvajánlás oldalak implementálása
- [ ] 1-2 alapvető teszt írása
- [ ] Részletes keresőfunkció létrehozása könyvajánlásokhoz, bemeneti validáció hozzáadása
- [ ] Regisztráció implementálása felhasználói adatokkal, bejelentkezéskor a felhasználónév és profilkép megjelenítése
- [ ] Funkció hozzáadása a könyvek mentéséhez a felhasználói profilban, a mentett könyvek megjelenítése címmel és borítóképpel
- [ ] Keresési eredmények elemzése és egyedi pontszám létrehozása a könyvnek
- [ ] Felhasználók számára lehetővé tenni a könyvek olvasását és események exportálását naptárba
- [ ] Stílus javítása és további tesztek írása
- [ ] Dokumentáció és tesztadat adatbázis

[Az élő weboldal itt tekinthető meg](https://book-app-inky.vercel.app/)

## Hogyan tesztelhetem?

1. Látogasson el a főoldalra: ![Főoldal](https://i.postimg.cc/MT9f8Yqt/konyv-ajanlas-1.png)
2. Írjon be egy könyvcímet (például "Tüskevár") és kattintson a "Search" gombra.
3. Az eredmények megjelennek egy könyvkártyán, ahol további információk találhatók a könyvről: ![Eredmény könyvkártya](https://i.postimg.cc/wTyySJPc/konyv-ajanlas-2.png)
4. A könyvkártyán található lenyíló listákra kattintva (például BookQuotes, BookCitations, BookEditions és BookReviews) további részletek jelennek meg a könyvről.
