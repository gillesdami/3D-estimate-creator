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
                    activated: {type: "boolean"},
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
                                    items: {type: "string"}
                                }
                            }
                        }
                    },
                    category: {type: "string"},
                    name: {
                        type: "string",
                        links: [{
                            rel: "image",
                            href: "/models/{{self}}/image.jpg",
                            mediaType: "image/jpg"
                        }]
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
                        }
                    },
                    section: {type: "string"},
                    
                    settings: {
                        type: "array",
                        items: {
                            type: "object",
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
                            }
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
        required_by_default: true
    };
    
    const jsonDOM = document.querySelector("json");
    const editor = new JSONEditor(jsonDOM, JSONEditorOptions);

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
