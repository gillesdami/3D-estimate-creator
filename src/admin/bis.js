/* Railway :
∘ Section
∘ Category
∘ Importer fichier principal du produit
∘ Name à partir du nom du fichier
∘ Activated
∘ Image/photo du produit
∘ Price du produit principal logique directe --> renseigne le prix à la main et valable pour toutes les régions
∘ Apparels
‣ Type de l'apparel (de base vide pour éviter l'alert qui dit que deux apparels ont le même nom)
‣ Upload du fichier
‣ Nom de l'apparel en fonction du nom du fichier
‣ Prix de l'apparel logique directe --> renseigne le prix à la main et valable pour toutes les régions
∘ Settings avec to*/
(async function() {
    const modelListElement = document.querySelector("ul#model-list");
    const popover = document.querySelector("div#popover");
    const nouveauModelInput = document.querySelector("input[name=new]");
    const objectsAvailble = await (await fetch('/objectsAvailable.json')).json();
    const modelList = await (await fetch('getModelList.php')).json();
    
    const apparelsTypes = ["Pignon","Croix de saint andre","Barre de pignon","Toit pagode","Toit travee","Plancher","Rideau","Rideau Longueur","Rideau Largeur","Lestage","Structure pignon","Renforcement"];
    const settingsMappings = {"Toit pagode": {name: "hmin", type: "number", description: "Hauteur en metres à laquelle est placé le toit par rapport au sol."}, "Toit travee": {name: "hmin", type: "number", description: "Hauteur en metres à laquelle est placé le toit par rapport au sol."}};
    const regions = ["ILE DE FRANCE","PACA","OCCITANIE","GRAND EST","AUVERGNE RHONE ALPES","PAYS DE LA LOIRE","CENTRE VAL DE LOIRE","NOUVELLE AQUITAINE","BOURGOGNE FRANCHE COMPTE","NORMANDIE","HAUTS DE FRANCE","BRETAGNE"];

    async function railway(objectEditedName = null) {
        // nom
        if(!objectEditedName) {
            objectEditedName = prompt("Quel est le nom de l'objet ?");
            if(!objectEditedName) return;
        }

        objectsAvailble[objectEditedName] = objectsAvailble[objectEditedName] || {};
        const o = Object.assign({}, objectsAvailble[objectEditedName]);

        // section_category
        await loadPopover("section_category");
        const sectionInput = document.querySelector("input[name=section]");
        const categoryInput = document.querySelector("input[name=category]");
        const descriptionInput = document.querySelector("input[name=description]");
        const activatedCheckbox = document.querySelector("input[name=activated]");
        const traveesCheckbox = document.querySelector("input[name=travee]");
        const areaInput = document.querySelector("input[name=area]");
        sectionInput.value = o.section || '';
        categoryInput.value = o.category || '';
        descriptionInput.value = o.description || '';
        activatedCheckbox.checked = !!o.activated;
        traveesCheckbox.checked = !!o.area;
        areaInput.value = o.area;
        areaInput.disabled = !o.area;
        traveesCheckbox.addEventListener("click", () => areaInput.toggleAttribute("disabled"));
        document.querySelector("i#section-list").innerText = list("section");
        document.querySelector("i#category-list").innerText = list("category");
        await clickNext();// apply
        o.section = sectionInput.value;
        o.category = categoryInput.value;
        o.description = descriptionInput.value;
        o.activated = activatedCheckbox.checked;
        o.travee = traveesCheckbox.checked;
        if(!traveesCheckbox.checked) o.area = ""; else o.area = areaInput.value;

        // importdae
        await loadPopover("importdae");
        const importdaeInput = document.querySelector("input[name=importdae]");
        let loaderIcon = document.querySelector("img#loader_icon");
        if(!modelList.includes(`${objectEditedName}/${objectEditedName}.dae`)) {
            await inputFileAccepted(importdaeInput, `${objectEditedName}/${objectEditedName}.dae`, loaderIcon);
        }
        document.querySelector("input[name=next]").disabled = false;
        await clickNext();

        // importimg
        await loadPopover("importimg");
        const importimgInput = document.querySelector("input[name=importimg]");
        loaderIcon = document.querySelector("img#loader_icon");
        if(!modelList.includes(`${objectEditedName}/image.jpg`)) {
            await inputFileAccepted(importimgInput, `${objectEditedName}/image.jpg`, loaderIcon);
        }
        document.querySelector("input[name=next]").disabled = false;
        await clickNext();

        // prix
        await loadPopover("prix");
        o.price = o.price || {};
        for (region of regions) {
            document.querySelector(`input[name="${region}"]`).value = o.price[region] || 0;
        }
        await clickNext();// apply
        for (region of regions) {
            o.price[region] = Number(document.querySelector(`input[name="${region}"]`).value);
        }

        // apparels
        await loadPopover("apparels");
        const apparealTypeSelector = document.querySelector("select[name=rowtype]");
        const addRowButton = document.querySelector("input[name=addrow]");
        addRowButton.addEventListener("click", () => addApparealRow(apparealTypeSelector.value, objectEditedName));
        o.apparels = o.apparels || [];
        for (appareal of o.apparels) {
            for (apparealValue of appareal.values) {
                addApparealRow(appareal.type, objectEditedName, apparealValue, o.settings);
            }
        }
        await clickNext();// apply
        o.settings = [];
        o.apparels = [];
        const rows = document.querySelectorAll("div.row");
        for (row of rows) {
            const rowtype = row.querySelector("input[name=rowtype]").value;
            let apparel = o.apparels.find(a => a.type === rowtype)
            if(!apparel) {
                apparel = {type: rowtype, values: []};
                o.apparels.push(apparel);
            }

            price = {} ;
            for (region of regions) {
                price[region] = Number(row.querySelector(`input[name="${region}"]`).value);
            }
            
            const rowname = row.querySelector("input[name=rowname]").value;
            apparel.values.push({
                name: rowname,
                price
            });
            
            //settings
            const rowsettingElement = row.querySelector("input[name=rowsetting]");
            if(rowsettingElement) {
                o.settings.push({type: rowsettingElement.id, value: {[rowtype]: Number(rowsettingElement.value)}});
            }
        }

        // save all
        objectsAvailble[objectEditedName] = o;
        await saveChanges();
        location.reload();
    }

    function addApparealRow(type, dirName, apparealValue = {price: {}}, settings) {console.log(apparealValue)
        const mainElement = document.querySelector("div#rows");
        const rowElement = document.createElement("div");
        rowElement.className = "row";
        rowElement.innerHTML = `
            <input name="delete" type="button" value="X">
            <p>type: ${type}<p>
            <input name="rowtype" type="hidden" value="${type}">
            <label for="rowname">
                nom: 
                <input name="rowname" type="text" value="${apparealValue.name || ''}">
            </label>
            <label for="rowfile">
                fichier dae: 
                <input type="file" name="rowfile"><img src="loading.gif" style="display:none;">
            </label>
            ${
                settingsMappings[type] ? `
            <label>${settingsMappings[type].description}
                <input type="${settingsMappings[type].type}" name="rowsetting" id="${settingsMappings[type].name}" 
                value="${settings[0].value["Toit pagode"]}">
            </label>
                ` : ``
            }
            <p>Indiquez les prix applicables en euro (ex: 100.50):</p>
            <label for="ILE DE FRANCE">
                ILE DE FRANCE:
                <input name="ILE DE FRANCE" type="number" value="${apparealValue.price["ILE DE FRANCE"] || 0}"> €
            </label>
            <label for="PACA">
                PACA:
                <input name="PACA" type="number" value="${apparealValue.price["PACA"] || 0}"> €
            </label>
            <label for="OCCITANIE">
                OCCITANIE:
                <input name="OCCITANIE" type="number" value="${apparealValue.price["OCCITANIE"] || 0}"> €
            </label>
            <label for="GRAND EST">
                GRAND EST:
                <input name="GRAND EST" type="number" value="${apparealValue.price["GRAND EST"] || 0}"> €
            </label>
            <label for="AUVERGNE RHONE ALPES">
                AUVERGNE RHONE ALPES:
                <input name="AUVERGNE RHONE ALPES" type="number" value="${apparealValue.price["AUVERGNE RHONE ALPES"] || 0}"> €
            </label>
            <label for="PAYS DE LA LOIRE">
                PAYS DE LA LOIRE:
                <input name="PAYS DE LA LOIRE" type="number" value="${apparealValue.price["PAYS DE LA LOIRE"] || 0}"> €
            </label>
            <label for="CENTRE VAL DE LOIRE">
                CENTRE VAL DE LOIRE:
                <input name="CENTRE VAL DE LOIRE" type="number" value="${apparealValue.price["CENTRE VAL DE LOIRE"] || 0}"> €
            </label>
            <label for="NOUVELLE AQUITAINE">
                NOUVELLE AQUITAINE:
                <input name="NOUVELLE AQUITAINE" type="number" value="${apparealValue.price["NOUVELLE AQUITAINE"] || 0}"> €
            </label>
            <label for="BOURGOGNE FRANCHE COMPTE">
                BOURGOGNE FRANCHE COMPTE:
                <input name="BOURGOGNE FRANCHE COMPTE" type="number" value="${apparealValue.price["BOURGOGNE FRANCHE COMPTE"] || 0}"> €
            </label>
            <label for="NORMANDIE">
                NORMANDIE:
                <input name="NORMANDIE" type="number" value="${apparealValue.price["NORMANDIE"] || 0}"> €
            </label>
            <label for="HAUTS DE FRANCE">
                HAUTS DE FRANCE:
                <input name="HAUTS DE FRANCE" type="number" value="${apparealValue.price["HAUTS DE FRANCE"] || 0}"> €
            </label>
            <label for="BRETAGNE">
                BRETAGNE:
                <input name="BRETAGNE" type="number" value="${apparealValue.price["BRETAGNE"] || 0}"> €
            </label>
        `;

        //<input type="file" name="rowfile"><img src="loading.gif" style="display:none;">
        const fileinput = rowElement.querySelector("input[name=rowfile]");
        const imgElement = rowElement.querySelector("img");
        const rownameInput = rowElement.querySelector("input[name=rowname]");
        const deleteInput = rowElement.querySelector("input[name=delete]");

        deleteInput.addEventListener("click", () => mainElement.removeChild(rowElement));
        rownameInput.addEventListener("input", () => fileinput.disabled = !rownameInput.value);
        fileinput.disabled = !rownameInput.value;

        inputFileAccepted(fileinput, () => `${dirName}/${rownameInput.value}.dae`, imgElement);

        mainElement.append(rowElement);
    }

    async function uploadModel(input, fileName) {
        let data = new FormData();
        data.append('fileName', fileName);
        data.append('model', input.files[0], fileName);
    
        const resp = await fetch('postModel.php', { method: 'POST', body: data });
        if(resp.status !== 200) {
            throw resp.status;
        }
    };

    async function inputFileAccepted(input, fileNameOrFn, loaderIcon) {
        return new Promise(r => {
            const handler = async function() {
                try {
                    let fileName = fileNameOrFn;
                    if(typeof fileNameOrFn === "function") fileName = fileNameOrFn();

                    loaderIcon.style.display = "";
                    await uploadModel(input, fileName);
                    input.removeEventListener("changed", handler);
                    loaderIcon.style.display = "none";
                    r();
                    alert("fichier uploadé");
                } catch (e) {
                    loaderIcon.style.display = "none";
                    alert("Upload failed");
                }
            };

            input.addEventListener("change", handler);
        });
    }

    async function clickNext() {
        return new Promise(r => {
            document.querySelector("input[name=next]").addEventListener("click", r);
        });
    }

    function list(prop) {
        return Array.from(new Set(Object.values(objectsAvailble).map(o => o[prop]))).join(", ") + ".";
    }

    async function loadPopover(template) {
        popover.innerHTML = await (await fetch(`templates/${template}.html`)).text();
    }

    function remove(objectToRemove) {
        if (confirm(`supprimer définitivement '${objectToRemove}'`)) {
            delete objectsAvailble[objectToRemove];
            generateModelList();
            saveChanges();
        }
    }

    function generateModelList() {
        //clear list
        while (modelListElement.firstChild) { modelListElement.removeChild(modelListElement.firstChild); }

        for(let object in objectsAvailble) {
            const text = document.createElement("p");
            text.innerText = object;

            const updateButton = document.createElement("button");
            updateButton.innerText = "modifier";
            updateButton.addEventListener("click", () => railway(object));

            const removeButton = document.createElement("button");
            removeButton.innerText = "supprimer";
            removeButton.addEventListener("click", () => remove(object));

            const li = document.createElement("li");
            li.appendChild(text);
            li.appendChild(updateButton);
            li.appendChild(removeButton);
            
            modelListElement.appendChild(li);
        }
    }

    async function saveChanges() {
        try {
            const jsonFile = new File([JSON.stringify(objectsAvailble)], "objectsAvailable.json", {type: "application/json"})

            let data = new FormData();
            data.append('objectsAvailable', jsonFile);

            const resp = await fetch('postObjectsAvailable.php', { method: 'POST', body: data });

            if (resp.status === 200) {
                alert("Modifications sauvegardés !");
            } else {
                throw resp.status;
            }
        } catch {
            alert("Une erreur est survenue");
            location.reload();
        }
    }

    generateModelList();
    
    nouveauModelInput.addEventListener("click", () => railway());
})();