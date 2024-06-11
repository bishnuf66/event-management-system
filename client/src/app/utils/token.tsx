/*
export const getToken = () => {
    if (typeof document !== 'undefined') {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
        if (tokenCookie) {
            return tokenCookie.split('=')[1];
        }
    }
    return null;
};
export default getToken() */

//the retrived token from cookie is comming out malformed so crrently using localstorage instead