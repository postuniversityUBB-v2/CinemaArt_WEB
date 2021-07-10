import axios from "axios"

const API_URL = "https://localhost:44303/api"
const token = localStorage.getItem("token")

export const getMovies = async (page, perPage) => {
	try {
		const { data } = await axios.get(`${API_URL}/Movies?page=${page}&perPage=${perPage}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 5 ~ getMovies ~ response", data)
		return data
	} catch (err) {
		throw err
	}
}

export const postMovies = async payload => {
	try {
		await axios.post(`${API_URL}/Movies`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 17 ~ postMovies")
		return
	} catch (err) {
		throw err
	}
}

export const postMovieToWatchlist = async payload => {
	try {
		await axios.post(`${API_URL}/Watchlists`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 17 ~ postMovies")
		return
	} catch (err) {
		throw err
	}
}

export const editMovie = async (id, payload) => {
	try {
		const { status } = await axios.put(`${API_URL}/Movies/${id}`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 36 ~ editMovie")
		return status;
	} catch (err) {
		throw err
	}
}

export const editReview = async (movieId, reviewId, payload) => {
	try {
		const { status } = await axios.put(`${API_URL}/Movies/${movieId}/Reviews/${reviewId}`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 36 ~ editReview")
		return status;
	} catch (err) {
		throw err
	}
}

export const deleteMovie = async id => {
	try {
		const { status } = await axios.delete(`${API_URL}/Movies/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 50 ~ deleteMovie")
		return status;
	} catch (err) {
		throw err
	}
}


export const deleteReview = async reviewId => {
	try {
		const { status } = await axios.delete(`${API_URL}/Movies/Reviews/${reviewId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 50 ~ deleteReview")
		return status;
	} catch (err) {
		throw err
	}
}

export const deleteWatchlistMovie = async id => {
	try {
		const { status } = await axios.delete(`${API_URL}/Watchlists/${id}/Movie`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 50 ~ deleteWatchlistMovie")
		return status;
	} catch (err) {
		throw err
	}
}

export const getReviewsForMovie = async idMovie => {
	try {
		const { data } = await axios.get(`${API_URL}/Movies/${idMovie}/Reviews`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 64 ~ getTasksForProject")
		return data;
	} catch (err) {
		throw err
	}
}

export const postReview = async (movieId, payload) => {
	try {
		await axios.post(`${API_URL}/Movies/${movieId}/Reviews`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 78 ~ postReview")
		return
	} catch (err) {
		throw err
	}
}

export const getUsers = async () => {
	try {
		const { data } = await axios.get(`${API_URL}/users`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 106 ~ getUsers ~ response", data)
		return data
	} catch (err) {
		throw err
	}
}

export const getWatchlists = async (page, perPage) => {
	try {
		const { data } = await axios.get(`${API_URL}/Watchlists?page=${page}&perPage=${perPage}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		console.log("🚀 ~ file: api.js ~ line 106 ~ getWatchlist ~ response", data)
		return data
	} catch (err) {
		throw err
	}
}

export const register = async payload => {
	try {
		const { status } = await axios.post(`${API_URL}/Authentication/register`, payload)
		console.log("🚀 ~ file: api.js ~ line 120 ~ register ~ response", status)

		return status
	} catch (err) {
		throw err
	}
}

export const login = async payload => {
	try {
		const { data, status } = await axios.post(`${API_URL}/Authentication/login`, payload)
		console.log("🚀 ~ file: api.js ~ line 131 ~ login ~ response", data, status)

		return { data, status }
	} catch (err) {
		throw err
	}
}
