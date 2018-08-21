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

(async function () {
    const initialState = await (await fetch('/objectsAvailable.json')).json();

    const JSONEditorOptions = {
        schema: {
            type: "array",
            title: "Objects",
            items: {
                headerTemplate: "{{self.name}}",
                type: "object",
                properties: {
                    activated: {
                        type: "boolean",
                        format: "checkbox"
                    },
                    apparels: {
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
                                    items: {
                                        type: "string",
                                        minLength: 1
                                    }
                                }
                            },
                            options: {
                                "collapsed": true
                            },
                        }
                    },
                    category: {
                        type: "string",
                        minLength: 1
                    },
                    name: {
                        type: "string",
                        links: [{
                            rel: "image",
                            href: "/models/{{self}}/image.jpg",
                            mediaType: "image/jpg"
                        }],
                        minLenght: 1
                    },
                    price: {
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
                            "collapsed": true
                        },
                    },
                    section: {
                        type: "string",
                        minLength: 1
                    },
                    settings: {
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
                                "collapsed": true
                            },
                        }
                    },
                    files: {
                        type: "array",
                        items: {
                            type: "string",//file...
                            rel: "attachement",
                            href: "/models/{{self}}",//TODO requires getModelList.php
                            download: true
                        }
                    }
                }
            }
        },
        startval: toArray(initialState),
        no_additional_properties: true,
        required_by_default: true,
        disable_array_delete_last_row: true,
    };

    const jsonDOM = document.querySelector("json");
    const editor = new JSONEditor(jsonDOM, JSONEditorOptions);

    editor.on('change', function () {
        let errors = editor.validate();
        const elementWithNoUniqueApparels = checkUniqueApparel(editor.getValue());

        if (elementWithNoUniqueApparels != null) {
            alert('L\'item : ' + elementWithNoUniqueApparels.name + ' a deux apparels du meme type.' +
                ' Merci de modifier au moins un des deux types');
            errors.push({
                message: "apparels identiques sur un item",
                property: elementWithNoUniqueApparels
            })
        }

        if (errors.length) {
            // errors is an array of objects, each with a `path`, `property`, and `message` parameter
            // `property` is the schema keyword that triggered the validation error (e.g. "minLength")
            // `path` is a dot separated path into the JSON object (e.g. "root.path.to.field")
            console.log(errors);
            document.getElementById("save").disabled = true;
        } else {
            document.getElementById("save").disabled = false;
        }
    });

    document.getElementById("save").addEventListener("click", () => {
        const json = toMap(editor.getValue());

        Object.values(json).map(obj => {
            obj.files.filter(() => false/*isModified*/).forEach(f => {
                //upload file
            });

            delete obj.files;
        });

        console.log(json);
    });
})();
