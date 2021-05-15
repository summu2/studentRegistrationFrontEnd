import axios from 'axios';


// const REACT_APP_WEB_APP_URL='http://localhost:3000/'
const REACT_APP_WEB_APP_URL='https://students-registration123.herokuapp.com/'
const REACT_APP_STUDENT_PATH='students'

const baseUrl = REACT_APP_WEB_APP_URL;
const backendWebUrl = `${baseUrl}${REACT_APP_STUDENT_PATH}/`;
console.log('baseUrl:: ', baseUrl)
console.log('backendWebUrl:: ', backendWebUrl)
const webAppCommonConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const studentAuthWebAppAxios = axios.create({ ...webAppCommonConfig, baseURL: backendWebUrl });

export {studentAuthWebAppAxios};