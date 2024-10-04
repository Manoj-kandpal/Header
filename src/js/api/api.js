// const api = `${process.env.BASE_API}/api/navigation?populate[0]=MainMenuItems&populate[1]=MainMenuItems.sections&populate[2]=MainMenuItems.sections.links`;

// const api = 'http://localhost:1337/api/navigation?populate[0]=MenuItems&populate[1]=MenuItems.footer&populate[3]=MenuItems.section&populate[4]=MenuItems.section.links&populate[5]=MenuItems.additionalLinks';
// export const getNavigationData = async () => {
//     const response = await fetch(api);
//     const data = await response.json();
//     return data;
// }

import { populateNavigationBarQuery } from '../utils/query';

const headerDataApi = `${process.env.BASE_API}/api/navigation`;

export const getNavigationData = async () => {
    console.log(populateNavigationBarQuery);
    const response = await fetch(`${headerDataApi}?${populateNavigationBarQuery}`);
    const data = await response.json();
    return data;
};