import { api, LightningElement, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

export default class ImagePreviewCmp extends LightningElement {

    @api recordId;
    @api imageField;
    @api titleField;

    imageUrl;
    imageTitle;

    @wire(getRecord, { recordId: '$recordId', layoutTypes: ['Full'], modes: ['View'] })
    wiredRecord({ data, error }) {
        if (data) {
            this.imageUrl = data.fields?.[this.imageField]?.value || null;
            this.imageTitle = data.fields?.[this.titleField]?.value || null;
        } else if (error) {
            this.imageUrl = null;
        }
    }
}