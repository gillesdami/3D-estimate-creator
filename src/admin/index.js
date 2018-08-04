const JSONEditorOptions = {
    schema: {}
};

const jsonDOM = document.querySelector("json");
const editor = new JSONEditor(jsonDOM, JSONEditorOptions);