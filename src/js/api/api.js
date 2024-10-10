// const api = `${process.env.BASE_API}/api/navigation?populate[0]=MainMenuItems&populate[1]=MainMenuItems.sections&populate[2]=MainMenuItems.sections.links`;

// const api = 'http://localhost:1337/api/navigation?populate[0]=MenuItems&populate[1]=MenuItems.footer&populate[3]=MenuItems.section&populate[4]=MenuItems.section.links&populate[5]=MenuItems.additionalLinks';
// export const getNavigationData = async () => {
//     const response = await fetch(api);
//     const data = await response.json();
//     return data;
// }

import { populateNavigationBarQuery, populateFooterQuery } from '../utils/query';

const headerDataApi = `${process.env.BASE_API}/api/navigation`;
const footerDataApi = `${process.env.BASE_API}/api/footer`;

export const getNavigationData = async () => {
    const response = await fetch(`${headerDataApi}?${populateNavigationBarQuery}`);
    const data = await response.json();
    return data;
};

export const getFooterData = async () => {
    // console.log(populateFooterQuery);
    const response = await fetch(`${footerDataApi}?${populateFooterQuery}`);
    const data = await response.json();
    // console.log("footer data: ", data);
    return data;
};