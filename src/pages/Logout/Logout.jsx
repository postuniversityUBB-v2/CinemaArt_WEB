import React, { useEffect } from "react"

const Logout = () => {
	useEffect(() => {
		localStorage.setItem("token", null)
        localStorage.setItem("user", null)
        window.location.replace("/")
	}, [])

	return <div></div>
}

export default Logout