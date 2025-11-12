import { LightningElement } from "lwc";
import { NavigationMixin } from 'lightning/navigation';
import PROFILE_IMAGE from "@salesforce/resourceUrl/ProfileImage";
import NIKESH_RESUME from "@salesforce/resourceUrl/NikeshVarmaResume";

export default class PortfolioHome extends NavigationMixin(LightningElement) {

    profileImageUrl = PROFILE_IMAGE;
    fullName = "Nikesh Varma";

    yearsExp = 4;
    projectsCount = 6;
    certCount = 5;

    copyrightYear = new Date().getFullYear();

    async downloadResume() {

        const response = await fetch(NIKESH_RESUME);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isIOS) {
            window.open(NIKESH_RESUME, "_blank");
        } else {
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Nikesh_Varma_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        }
    }

    navToProjects() {
        this[NavigationMixin.Navigate]({ type: 'comm__namedPage', attributes: { name: 'Projects__c' } });
    }

    handleHomeClick() {
        this.scrollToSection({ target: { dataset: { target: "about" } } });
    }
}