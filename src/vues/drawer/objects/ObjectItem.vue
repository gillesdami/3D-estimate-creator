<template>
    <div class="objectItem" v-on:click="clickedObjectItem">
        <img class="objectItemIcon" :src="`models/${ name }/image.jpg`"/>
        <div class="objectItemTitle">
            {{ name }}
            <p>{{ item.description }}</p>
        </div>
    </div>
</template>

<script>
    import { actionCreator, ADD_OBJECT_DISPLAYED, SHOW_DETAILS_PANEL } from '../../../actions';
    import { $select } from '../../../sagas/vue';
    import { objectsDisplayed } from '../../../selectors';

    export default {
        name: "object-item",
        methods: {
            objectsDisplayed: function () {
                return $select(objectsDisplayed);
            },
            isAllValidate: function () {
                let isOneNotValidated = false;

                this.objectsDisplayed().forEach(obj => {
                    if (obj.isValidated === false)
                        isOneNotValidated = true;
                });

                return !isOneNotValidated;
            },
            clickedObjectItem: function () {
                const generateUid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                    /[xy]/g,
                    function (c) {
                        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });

                const uid = generateUid();

                if(this.item.section !== "Mobilier") {
                    this.item.apparels = this.item.apparels.map(apparel => {
                        return {
                            ...apparel,
                            value: apparel.values[0]
                        }
                    });
                }
                
                if (this.isAllValidate()) {
                    if(this.item.section !== "Mobilier") {
                        this.$root.$emit('put', actionCreator(ADD_OBJECT_DISPLAYED, {
                            itemName: this.name,
                            item: this.item,
                            uid,
                            isValidated: false
                        }));
                    }

                    this.$root.$emit('put', actionCreator(SHOW_DETAILS_PANEL, {
                        itemName: this.name,
                        item: this.item,
                        uid
                    }));
                } else {
                    alert("Merci de bien vouloir valider ou supprimer l'objet\n" +
                        "actuellement selectionné avant d'en ajouter un autre :)");
                }
            }
        },
        props: ['name', 'item']
    }
</script>