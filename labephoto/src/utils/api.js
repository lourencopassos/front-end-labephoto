import axios from "axios";

const baseUrl = "https://labephoto.herokuapp.com";

export const login = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (body) => {
  try {
     await axios.post(`${baseUrl}/user/signup`, body);
  } catch (error) {
    console.log(error);
  }
};
