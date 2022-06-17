import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-community/async-storage'

const key = "@ecocalc";
const REACT_APP_GRAPHQL_URL = 'http://192.168.15.9:8080/graphql';

const login = async (token) => {
  console.log("oi?")
  const { id, email } = jwt_decode(token);

  console.log( email)

  await AsyncStorage.setItem(`${key}/token`, token);
  await AsyncStorage.setItem(`${key}/id`, JSON.stringify(id));

  const query = `mutation ($id: ID!) {
    registerUltimoAcesso(id: $id){
      id
      nome
    }
  }`;

  fetch(REACT_APP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { id },
    }),
  })
  .then(r => r)
  .then(async data => console.log(await getId()))
  .catch(err => console.error(err));
};

const isLogged = async () => {
  return Boolean(await AsyncStorage.getItem(`${key}/token`));
}


const logout = async () => {
  await AsyncStorage.removeItem(`${key}/token`);
  await AsyncStorage.removeItem(`${key}/id`);
};

const getToken = async () => {
  return await AsyncStorage.getItem(`${key}/token`);
};

const getId = async () => {
  return AsyncStorage.getItem(`${key}/id`);
};

// const getEmail = () => {
//   const token = localStorage.getItem(`${key}/token`);
//   const payload = jwt.decode(token);
//   return payload.sub;
// };

// const getIsEmailValidado = () => {
//   return JSON.parse(localStorage.getItem(`${key}/emailValidado`));
// };

// const getIsPagarmeRegistered = () => {
//   return JSON.parse(localStorage.getItem(`${key}/mercadopagoRegistered`));
// };

// const hasRole = (role) => {
//   const roles = JSON.parse(localStorage.getItem(`${key}/roles`));
//   if (roles) {
//     return roles.some((i) => i === role);
//   }
//   return false;
// };

export default {
  isLogged,
  login,
  logout,
  getToken,
  getId
};
