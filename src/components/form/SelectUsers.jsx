import { InputLabel, MenuItem, Select, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from "uuid"

import { getUsers } from '../../api/api'

const useStyles = makeStyles((theme) => ({
    dropdown: {
        width: 380,
    },
}));

const SelectUsers = ({register, name="User",value}) => {
    const classes = useStyles();
    const [users, setUsers] = useState([])
    useEffect(() => {
        (async () => {
            const data = await getUsers()
            setUsers(data)
        })() 
    }, [])

    return (
        <>
            <InputLabel id="assignedTo">
                {name}
			</InputLabel>
            <Select
                labelId="assignedToUserCode"
                id="assignedToUserCode"
                label="Role"
                defaultValue={value}
                {...register("assignedToUserCode")}
                className={classes.dropdown}
                inputProps={{ "data-testid": "assignedTo" }}
            >   
            {users?.map(user => {
                return <MenuItem key={uuidv4()} value={user.userCode}>{user.username}</MenuItem>
            })}
               
            </Select>
        </>
    )
}
// <MenuItem key={user.userCode} value={user.userCode}>{user.userName}</MenuItem>
export default SelectUsers
