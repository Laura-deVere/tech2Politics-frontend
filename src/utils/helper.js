export const tokenExpired = ({token, exp}) => {
    if (!token) {
        return null;
    }

    const jwt = JSON.parse(atob(token.split('.')[1]));

    // multiply by 1000 to convert seconds into milliseconds
    const timeToExpire = jwt && exp && exp * 1000 || null;

    return !timeToExpire ? false : true;
}