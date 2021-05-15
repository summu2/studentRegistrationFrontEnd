import axios from 'axios';

const REACT_APP_WEB_APP_URL='https://students-registration123.herokuapp.com/'
const REACT_APP_STUDENT_PATH='students'

const backendWebUrl = `${REACT_APP_WEB_APP_URL}${REACT_APP_STUDENT_PATH}/`;
const webAppCommonConfig = {
    headers: {
        'Content-Type': 'application/json',
    },
};

const studentAuthWebAppAxios = axios.create({ ...webAppCommonConfig, baseURL: backendWebUrl });

export {studentAuthWebAppAxios};