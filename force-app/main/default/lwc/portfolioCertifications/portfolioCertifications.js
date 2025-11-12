import { LightningElement } from "lwc";
import CERTIFICATION_IMAGES from "@salesforce/resourceUrl/CertificationImages";

export default class PortfolioCertifications extends LightningElement {

    certifications = [
        { id: 1, name: "Salesforce Certified Administrator", imageUrl: `${CERTIFICATION_IMAGES}/PlatformAdministrator.png` },
        { id: 2, name: "Salesforce Platform Developer I", imageUrl: `${CERTIFICATION_IMAGES}/PlatformDeveloper1.png` },
        { id: 3, name: "Salesforce Platform App Builder", imageUrl: `${CERTIFICATION_IMAGES}/PlatformAppBuilder.png` },
        { id: 4, name: "Salesforce JavaScript Developer I", imageUrl: `${CERTIFICATION_IMAGES}/JavaScriptDeveloper1.png` },
        { id: 5, name: "Salesforce AI Associate", imageUrl: `${CERTIFICATION_IMAGES}/AIAssociate.png` }
    ];
}