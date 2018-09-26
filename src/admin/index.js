const toArray = obj =>
    Object.keys(obj).map(key => {
        obj[key]["name"] = key;
        return obj[key]
    });

const toMap = arr => {
    const res = {};
    arr.forEach(e => {
        res[e.name] = Object.assign({}, e);
        delete res[e.name].name;
    });

    return res;
};

const checkUniqueApparel = root => {
    let res = null;
    root.forEach(e => {
        let apparels = [];
        e.apparels.forEach(ap => apparels.push(ap.type));
        if (apparels.find((element, index) => (apparels.indexOf(element) !== index))) res = e;
    });

    return res;
};

const handleFiles = (root, modelList) => {
    root.forEach(e => {
        e['files'] = [];
        modelList.forEach(model => {
            if (e.files.indexOf(model) === -1 && model.includes(e.name)) {
                const fileName = model.split("models/")[1];
                e.files.push(fileName);
            }
        })
    });
};

const handleButtonsFiles = (editor) => {
    let i = 0;

    editor.getValue().forEach(e => {
        let currentFiles = editor.getEditor('root.' + i + '.files');
        if (currentFiles) {
            let filesDiv = currentFiles.container.childNodes[2].childNodes[0];

            if (filesDiv.hasChildNodes()) {
                for (let currentChild = 0; currentChild < filesDiv.childNodes.length; currentChild++) {
                    let inputTextFile = filesDiv.childNodes[currentChild].childNodes[0].childNodes[1];
                    let buttonsDiv = filesDiv.childNodes[currentChild].childNodes[2];

                    if (buttonsDiv.childNodes.length < 2) {

                        let inputSelectFile = document.createElement("input");
                        inputSelectFile.type = "file";

                        inputSelectFile.addEventListener("change", () => {
                            if (inputSelectFile.files) {
                                postModel(inputTextFile, inputSelectFile);
                            }
                        });

                        buttonsDiv.appendChild(inputSelectFile);
                    }
                }
            }
        }
        i++;
    });
};

const postModel = (inputTextFile, input) => {
    if (inputTextFile.value === "") {
        alert("Merci de remplir le champs de texte [nom item]/[nom du fichier].dae");
        return;
    } else if(typeof  input.files[0] === 'undefined') {
        alert("Fichier manquant, merci de selectionner un fichier avant d'upload !");
        return;
    }

    console.log(input.files[0]);

    let data = new FormData();
    data.append('fileName', inputTextFile.value);
    data.append('model', input.files[0], inputTextFile.value);

    fetch('postModel.php', {
        method: 'POST',
        body: data
    }).then(value => {
        if (value.status === 200) {
            alert("Fichier upload avec succes !");
        }
    }, error => {
        console.log(error);
    });
};

const deleteModel = (fileName) => {
    (async () => {
        await fetch('deleteModel.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fileName})
        });
    })();
};

const uploadJSON = file => {
    (async () => {
        const rawResponse = await fetch('postObjectsAvailable.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: file
        });
        const content = await rawResponse.json();

    })();
};

const findDeletedFile = (root, initialRoot) => {
    let deletedFile = null;
    root.forEach(obj => {
        const initialObj = initialRoot.find(initialObj => initialObj.name === obj.name && initialObj.category === obj.category);
        if (initialObj) {
            initialObj.files.forEach(initialFile => {
                const fileInRoot = obj.files.find(file => file === initialFile);
                if (!fileInRoot) {
                    deletedFile = initialFile;
                }
            });
        }
    });

    return deletedFile;
};

(async function () {
    const initialState = await (await fetch('/objectsAvailable.json')).json();
    const modelList = await (await fetch('getModelList.php')).json();

    let initialStateArray = toArray(initialState);
    handleFiles(initialStateArray, modelList);

    const JSONEditorOptions = {
        schema: {
            type: "array",
            title: "Objects",
            items: {
                headerTemplate: "{{self.name}}",
                type: "object",
                properties: {
                    activated: {
                        propertyOrder: 4,
                        type: "boolean",
                        format: "checkbox"
                    },
                    apparels: {
                        propertyOrder: 5,
                        type: "array",
                        items: {
                            type: "object",
                            headerTemplate: "{{self.type}}",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: ["Toit pagode", "Rideau", "Plancher", "Lestage", "Pignon", "Croix de saint andre", "Barre de pignon", "Toit travee", "Rideau Longueur", "Rideau Largeur"]
                                },
                                values: {
                                    type: "array",
                                    headerTemplate: "options (doit correspondre au nom du fichier)",
                                    items: {
                                        headerTemplate: " ",
                                        type: "string",
                                        minLength: 1
                                    },
                                    options: {
                                        "disable_array_reorder": true
                                    }
                                }
                            },
                            options: {
                                "collapsed": true
                            },
                        },
                        options: {
                            "disable_array_reorder": true
                        }
                    },
                    category: {
                        propertyOrder: 3,
                        type: "string",
                        minLength: 1
                    },
                    name: {
                        propertyOrder: 1,
                        type: "string",
                        links: [{
                            rel: "image",
                            href: "/models/{{self}}/image.jpg",
                            mediaType: "image/jpg"
                        }],
                        minLenght: 1
                    },
                    price: {
                        propertyOrder: 7,
                        type: "object",
                        properties: {
                            "ILE DE FRANCE": {type: "number"},
                            "PACA": {type: "number"},
                            "OCCITANIE": {type: "number"},
                            "GRAND EST": {type: "number"},
                            "AUVERGNE RHONE ALPES": {type: "number"},
                            "PAYS DE LA LOIRE": {type: "number"},
                            "CENTRE VAL DE LOIRE": {type: "number"},
                            "NOUVELLE AQUITAINE": {type: "number"},
                            "BOURGOGNE FRANCHE COMPTE": {type: "number"},
                            "NORMANDIE": {type: "number"},
                            "HAUTS DE FRANCE": {type: "number"},
                            "BRETAGNE": {type: "number"}
                        },
                        options: {
                            "collapsed": true,
                            "disable_array_reorder": true
                        },
                    },
                    section: {
                        propertyOrder: 2,
                        type: "string",
                        minLength: 1
                    },
                    settings: {
                        propertyOrder: 8,
                        type: "array",
                        items: {
                            type: "object",
                            headerTemplate: "{{self.type}}",
                            properties: {
                                type: {
                                    type: "string",
                                    enum: ["hmin"]
                                },
                                value: {
                                    type: "object",
                                    properties: {
                                        "Toit pagode": {type: "number"},
                                        "Rideau": {type: "number"},
                                        "Plancher": {type: "number"},
                                        "Lestage": {type: "number"},
                                        "Pignon": {type: "number"},
                                        "Croix de saint andre": {type: "number"},
                                        "Barre de pignon": {type: "number"},
                                        "Toit travee": {type: "number"},
                                        "Rideau Longueur": {type: "number"},
                                        "Rideau Largeur": {type: "number"}
                                    }
                                }
                            },
                            options: {
                                "collapsed": true,
                                "disable_array_reorder": true
                            },
                        },
                        options: {
                            "collapsed": true,
                            "disable_array_reorder": true
                        },
                    },
                    files: {
                        propertyOrder: 6,
                        type: "array",
                        items: {
                            type: "string"
                            /*rel: "attachement",
                            href: "/models/{{self}}",//TODO requires getModelList.php
                            download: true*/
                        },
                        options: {
                            "collapsed": true,
                            "disable_array_reorder": true
                        },
                    }
                },
                options: {
                    "collapsed": true
                },
            }
        },
        startval: toArray(initialState),
        no_additional_properties: true,
        required_by_default: true,
        disable_array_delete_last_row: true,
        disable_properties: true,
        disable_edit_json: true
    };

    const jsonDOM = document.querySelector("json");
    const editor = new JSONEditor(jsonDOM, JSONEditorOptions);

    editor.on('change', function () {
        // Pour ajouter les boutons select file et upload file
        handleButtonsFiles(editor);

        // Trouver le fichier supprimé
        const deletedFile = findDeletedFile(editor.getValue(), initialStateArray);
        initialStateArray = editor.getValue();
        if (deletedFile) {
            console.log("deletedFile :: ", deletedFile);
            deleteModel(deletedFile);
        }

        // Pour checker qu'il n'y a pas d'erreur
        let errors = editor.validate();

        // Pour vérifier que chaque apparels d'un element est unique
        const elementWithNoUniqueApparels = checkUniqueApparel(editor.getValue());

        if (elementWithNoUniqueApparels != null) {
            alert('L\'item : ' + elementWithNoUniqueApparels.name + ' a deux apparels du meme type.' +
                ' Merci de modifier au moins un des deux types');
            errors.push({
                message: "apparels identiques sur un item",
                property: elementWithNoUniqueApparels
            })
        }

        // Traitement des erreurs
        if (errors.length) {
            console.log(errors);
            document.getElementById("save").disabled = true;
        } else {
            document.getElementById("save").disabled = false;
        }
    });

    document.getElementById("save").addEventListener("click", () => {
        const json = toMap(editor.getValue().map(obj => {
            delete obj.files;
            return obj;
        }));

        console.log(json);
        const jsonFile = new File([JSON.stringify(json)], "objectsAvailable.json", {type: "application/json"})

        let data = new FormData();
        data.append('objectsAvailable', jsonFile);

        fetch('postObjectsAvailable.php', {
            method: 'POST',
            body: data
        }).then(value => {
            if (value.status === 200) {
                alert("Fichier upload avec succes !");
            }
        }, error => {
            alert(error);
        });
    });
})();
