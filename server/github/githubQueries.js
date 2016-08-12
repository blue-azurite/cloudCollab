import qs from 'querystring';
import request from 'request';
import Promise from 'bluebird';
import axios from 'axios';

const endPoint = 'https://github.com/login/oauth/authorize';

export const requestGithub = () => {
  const requiredParameters = {
    client_id: GITHUB_CLIENT_ID
  }
  const apiUrl = `${endPoint}?client_id=${requiredParameters.client_id}`;
  console.log(apiUrl);
  axios.get(apiUrl,(req,res) => {
    
  })
}