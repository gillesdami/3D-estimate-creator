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
    const objectsAvailble = await (await fetch('/objectsAvailable.json')).json();
    const modelList = await (await fetch('getModelList.php')).json();
    
    async function railway(objectEditedName = null) {
        const o = objectsAvailble[objectEditedName];

        await loadPopover("section_category");
        const sectionInput = document.querySelector("input[name=section]");
        const categoryInput = document.querySelector("input[name=category]");
        const activatedCheckbox = document.querySelector("input[name=activated]");
        sectionInput.value = o.section || '';
        categoryInput.value = o.category || '';
        activatedCheckbox.checked = o.activated || true;
        document.querySelector("i#section-list").innerText = list("section");
        document.querySelector("i#category-list").innerText = list("category");
        await clickNext();
        o.section = sectionInput.value;
        o.category = categoryInput.value;
        o.activated = activatedCheckbox.checked;

        await loadPopover("importdae");
        const importdaeInput = document.querySelector("input[name=importdae]");
        let loaderIcon = document.querySelector("img#loader_icon");
        if(!modelList.includes(`${objectEditedName}/${objectEditedName}.dae`)) {
            await inputFileAccepted(importdaeInput, `${objectEditedName}/${objectEditedName}.dae`, loaderIcon);
        }
        document.querySelector("input[name=next]").disabled = false;
        await clickNext();

        await loadPopover("importimg");
        const importimgInput = document.querySelector("input[name=importimg]");
        loaderIcon = document.querySelector("img#loader_icon");
        if(!modelList.includes(`${objectEditedName}/image.jpg`)) {
            await inputFileAccepted(importimgInput, `${objectEditedName}/image.jpg`, loaderIcon);
        }
        document.querySelector("input[name=next]").disabled = false;
        await clickNext();
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

    async function inputFileAccepted(input, fileName, loaderIcon) {
        return new Promise(r => {
            const handler = async function() {
                try {
                    loaderIcon.style.display = "";
                    await uploadModel(input, fileName);
                    input.removeEventListener("changed", handler);
                    loaderIcon.style.display = "none";
                    r();
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
})();