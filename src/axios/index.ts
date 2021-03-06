import axios from 'axios';
// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://apintd-elearning.herokuapp.com';

export const axiosAuth = axios.create({
	baseURL: `${BASE_URL}/auth`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const axiosUser = axios.create({
	baseURL: `${BASE_URL}/user`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const axiosInstructor = axios.create({
	baseURL: `${BASE_URL}/instructor`,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const axiosCourse = axios.create({
	baseURL: `${BASE_URL}/course`,
	headers: {
		'Content-Type': 'application/json',
	},
});
