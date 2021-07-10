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

		return data
	} catch (err) {
		throw err
	}
}

export const register = async payload => {
	try {
		const { status } = await axios.post(`${API_URL}/Authentication/register`, payload)

		return status
	} catch (err) {
		throw err
	}
}

export const signIn = async payload => {
	try {
		const { data, status } = await axios.post(`${API_URL}/Authentication/login`, payload)

		return { data, status }
	} catch (err) {
		throw err
	}
}
