// ==========================================
// 1. VYHLEDÁNÍ HTML ELEMENTŮ
// ==========================================

// Najdeme tlačítko pro přidávání úkolů
const tlacitkoPridatUkol = document.querySelector("#tlacitko-pridat");

// Najdeme vstupní políčko
const vstupniPole = document.querySelector("#vstupni-pole");

// Najdeme seznam úkolů
const seznamUkolu = document.querySelector("#seznam-ukolu");

// Najdeme počítadlo úkolů
const pocitadloUkolu = document.querySelector("#pocitadlo-ukolu");


// ==========================================
// 2. NAČTENÍ ÚKOLŮ Z LOCALSTORAGE
// ==========================================

// Načteme uložené úkoly z prohlížeče
// JSON.parse převede uložený text zpátky na JavaScriptové pole
// Pokud žádné úkoly neexistují, vytvoříme prázdné pole

let seznamVsechUkolu = JSON.parse(localStorage.getItem("mojeUkoly")) || [];


// ==========================================
// 3. FUNKCE PRO AKTUALIZACI POČÍTADLA
// ==========================================

function aktualizovatPocetUkolu() {

    // Zjistíme, kolik úkolů se právě nachází v HTML seznamu
    const aktualniPocetUkolu = seznamUkolu.children.length;

    // Zobrazíme aktuální počet úkolů
    pocitadloUkolu.textContent = "Tvoje úkoly: " + aktualniPocetUkolu;

}


// ==========================================
// 4. FUNKCE PRO ZOBRAZENÍ VŠECH ÚKOLŮ
// ==========================================

function zobrazitVsechnyUkoly() {

    // Nejdříve vyčistíme HTML seznam
    seznamUkolu.innerHTML = "";

    // Projdeme všechny úkoly uložené v našem poli
    seznamVsechUkolu.forEach(function(textUkolu, indexUkolu) {

        // Vytvoříme HTML element pro celý úkol
        const novyUkol = document.createElement("li");

        // Vytvoříme element pro text úkolu
        const textNovehoUkolu = document.createElement("span");

        // Vytvoříme tlačítko pro smazání úkolu
        const tlacitkoSmazatUkol = document.createElement("button");


        // Vložíme text úkolu do vytvořeného elementu
        textNovehoUkolu.textContent = textUkolu;


        // Nastavíme text mazacího tlačítka
        tlacitkoSmazatUkol.textContent = "✕";

        // Přidáme popisek pro čtečky obrazovky
        tlacitkoSmazatUkol.setAttribute("aria-label", "Smazat úkol");


        // ==========================================
        // 5. OZNAČENÍ ÚKOLU JAKO HOTOVÉHO
        // ==========================================

        textNovehoUkolu.addEventListener("click", function() {

            // Přidáme nebo odebereme CSS třídu hotovyukol
            textNovehoUkolu.classList.toggle("hotovyukol");

        });


        // ==========================================
        // 6. SMAZÁNÍ ÚKOLU
        // ==========================================

        tlacitkoSmazatUkol.addEventListener("click", function() {

            // Odstraníme úkol z našeho JavaScriptového pole
            // indexUkolu určuje, který úkol chceme odstranit
            seznamVsechUkolu.splice(indexUkolu, 1);

            // Uložíme aktualizované pole do localStorage
            localStorage.setItem("mojeUkoly", JSON.stringify(seznamVsechUkolu));

            // Znovu zobrazíme všechny úkoly
            zobrazitVsechnyUkoly();

            // Aktualizujeme počítadlo úkolů
            aktualizovatPocetUkolu();

        });


        // ==========================================
        // 7. VLOŽENÍ ELEMENTŮ DO HTML
        // ==========================================

        // Vložíme text a mazací tlačítko do celého úkolu
        novyUkol.appendChild(textNovehoUkolu);
        novyUkol.appendChild(tlacitkoSmazatUkol);

        // Vložíme celý úkol do seznamu na stránce
        seznamUkolu.appendChild(novyUkol);

    });

}


// ==========================================
// 8. PŘIDÁVÁNÍ NOVÝCH ÚKOLŮ
// ==========================================

tlacitkoPridatUkol.addEventListener("click", function() {

    // Zkontrolujeme, jestli uživatel nezadal prázdný text
    if (vstupniPole.value.trim() === "") {

        console.log("Kliknul jsi, ale tam nic není!");

        return;
    }


    // Získáme text z inputu a odstraníme přebytečné mezery
    const textNovehoUkolu = vstupniPole.value.trim();


    // Přidáme nový úkol do našeho JavaScriptového pole
    seznamVsechUkolu.push(textNovehoUkolu);


    // Uložíme aktualizované pole do localStorage
    localStorage.setItem("mojeUkoly", JSON.stringify(seznamVsechUkolu));


    // Vymažeme vstupní políčko
    vstupniPole.value = "";


    // Znovu zobrazíme všechny úkoly
    zobrazitVsechnyUkoly();

    // Aktualizujeme počítadlo
    aktualizovatPocetUkolu();

});


// ==========================================
// 9. SPUŠTĚNÍ FUNKCÍ PO OTEVŘENÍ STRÁNKY
// ==========================================

// Načteme a zobrazíme všechny uložené úkoly
zobrazitVsechnyUkoly();

// Aktualizujeme počítadlo při otevření stránky
aktualizovatPocetUkolu();