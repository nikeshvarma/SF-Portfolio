import { LightningElement } from "lwc";

export default class PortfolioEducation extends LightningElement {
    education = [
        {
            id: 1,
            degree: "B.Tech in Computer Science",
            institute: "Rajiv Gandhi Prodhyogiki Vishwavidyalaya (RGPV), Bhopal",
            year: "2018-2022"
        },
        { id: 2, degree: "Higher Secondary Certificate (HSC)", institute: "Sarswati Shishu Mandir High Sec. School (MPBSE)", year: "2018" },
        { id: 3, degree: "Secondary School Certificate (SSC)", institute: "Sarswati Shishu Mandir High Sec. School (MPBSE)", year: "2016" }
    ];
}