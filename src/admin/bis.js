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
    const modelList = document.querySelector("ul#model-list");
    const popover = document.querySelector("div#popover");
    const objectsAvailble = await (await fetch('/objectsAvailable.json')).json();
    const modelList = await (await fetch('getModelList.php')).json();
    
    async function railway(objectEditedName = null) {
        const o = objectsAvailble[objectEditedName];

        loadPopover("section_category");
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

        loadPopover("importdae");
        const importdaeInput = document.querySelector("input[name=importdae]");
        const loaderIcon = document.querySelector("src#loader_icon");
        if(!modelList.includes(`${objectEditedName}/${objectEditedName}.dae`)) {
            await inputFileAccepted(importdaeInput, `${objectEditedName}/${objectEditedName}.dae`, loaderIcon);
        }
        importdaeInput.disabled = false;
        await clickNext();

        loadPopover("importimg");
        const importdaeInput = document.querySelector("input[name=importimg]");
        const loaderIcon = document.querySelector("src#loader_icon");
        if(!modelList.includes(`${objectEditedName}/image.jpg`)) {
            await inputFileAccepted(importdaeInput, `${objectEditedName}/image.jpg`, loaderIcon);
        }
        importdaeInput.disabled = false;
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
        new Promise(r => {
            const handler = function() {
                try {
                    loaderIcon.style.display = "";
                    uploadModel(input, fileName);
                    input.removeEventListener("changed", handler);
                    r();
                } catch (e) {
                    loaderIcon.style.display = "none";
                    alert("Upload failed");
                }
            };

            input.addEventListener("changed", handler);
        });
    }

    async function clickNext() {
        return new Promise(r => {
            document.querySelector("input[name=next]").addEventListener("click", r);
        });
    }

    function list(prop) {
        return Object.values(objectsAvailble).map(o => o[prop]).join(", ");
    }

    async function loadPopover(template) {
        popover.innerHTML = await (await fetch('templates/${template}.html')).text();
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
        while (modelList.firstChild) { modelList.removeChild(modelList.firstChild); }

        for(object in objectsAvailble) {
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
            
            modelList.appendChild(li);
        }
    }

    async function saveChanges() {
        try {
            const jsonFile = new File([JSON.stringify(objectsAvailble)], "objectsAvailable.json", {type: "application/json"})

            let data = new FormData();
            data.append('objectsAvailable', jsonFile);

            const resp = await fetch('postObjectsAvailable.php', { method: 'POST', body: data });

            if (resp.status === 200) {
                alert("Fichier upload avec succes !");
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