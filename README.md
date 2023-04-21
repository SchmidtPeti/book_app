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
- [x] Regisztrációhoz Google regisztrálás hozzáadása (illetve a felhasználónév kiegészítése, felhasználó profilkép)
- [x] Funkció hozzáadása a könyvek mentéséhez, dátummal a felhasználói profilban, a mentett könyvek megjelenítése címmel
- [x] Könyvek olvasásának követésére lehetőség
- [x] Egy könyvnek külön oldal létrehozása, ahová például a mentett könyvek irányít, de van lehetőség máshonnan is oda menni.
- [x] Egyéni könyvek hozzáadása a könyv olvasáshoz, amit esetleg az oldal nem ismer.
- [x] A könyvekhez egy az oldalhoz egyéni érdeklési szám meghatározása

## Hátralévő feladatok

- [ ] Értesítési rendszer
- [ ] Felhasználók számára lehetővé tenni a könyvekekre haladási tervet meghatározni és annak eseményekeinek exportálását naptárba
- [ ] Komponensek refaktorlása és a front-end megjelenő szöveg átírása magyarrá
- [ ] Források megjelenítése, Moly és Citatum
- [ ] Stílus javítása és további tesztek írása
- [ ] Error pages (without login saved books)
- [ ] Az oldal teljes magyarrá tétele
- [ ] Dokumentáció és tesztadat adatbázis -> tesztek írása
- [ ] Extra: sUrl link figyelés, hogy minden kisebb akciónak legyen, külön url-je
- [ ] Extra: mások is láthatják, hogy mennyien olvassák most azt a könyvet és hogyan 
haladnak vele
- [ ] Extra: cache methód, ami képes a régi keresések tárolására, így nem kell újra api-t hívni

[Az élő weboldal itt tekinthető meg](https://book-app-inky.vercel.app/)

## Hogyan tesztelhetem?

A weboldal főbb funkciói a következők:

### Főoldal
![Főoldal](https://i.postimg.cc/d01rgcNL/Web-capture-21-4-2023-165838-book-app-inky-vercel-app.jpg)

Az oldal több aloldalt tartalmaz, többek között a könyvkeresőt, a könyvajánlót, valamint a regisztrációs és bejelentkezési felületeket.

### Könyvkereső
![Könyvkereső](https://i.postimg.cc/5ywC84yk/Web-capture-21-4-2023-17020-book-app-inky-vercel-app.jpg)

A könyvkereső a könyv nevének beírásával működik, főleg klasszikus művekre. Az ajánlás rész is elérhető, és a back-end optimalizálásával a keresés gyorsabbá vált. Ha a keresés nem talál eredményt, a rendszer ezt is jelzi:

![Nincs találat](https://i.postimg.cc/pLPDYFDQ/Web-capture-21-4-2023-17743-book-app-inky-vercel-app.jpg)

### Könyvajánló
![Könyvajánló](https://i.postimg.cc/BSbBVHRM/Web-capture-21-4-2023-17057-book-app-inky-vercel-app.jpg)

A könyvajánló max. 3 címke kiválasztásával ajánl könyveket az idézetek kedveltsége alapján. Például:

![Találat](https://i.postimg.cc/2rhFMzXR/Web-capture-21-4-2023-17226-book-app-inky-vercel-app.jpg)

### Bejelentkezés és regisztráció
![Bejelentkezés](https://i.postimg.cc/y8n0f8PM/Web-capture-21-4-2023-1735-book-app-inky-vercel-app.jpg)
![Regisztráció](https://i.postimg.cc/s2N7rHbK/Web-capture-21-4-2023-17436-book-app-inky-vercel-app.jpg)

A regisztráció Google-fiókkal is lehetséges.

### Könyvek hozzáadása és követése
Bejelentkezés után könyveket adhat hozzá a könyvajánlóból vagy a keresőből:

![Könyv hozzáadása](https://i.postimg.cc/3rppsB1C/Web-capture-21-4-2023-17533-book-app-inky-vercel-app.jpg)

A hozzáadott könyveket megtekintheti és követheti is:

![Könyvek követése](https://i.postimg.cc/zJ0k702y/Web-capture-21-4-2023-17610-book-app-inky-vercel-app.jpg)

