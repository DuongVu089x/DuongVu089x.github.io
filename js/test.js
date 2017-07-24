for (let i = 0; i < clubs.size(); i++)
    for (let j = 0; j < clubs[i].members.size(); j++)
        for (let k = 0; k < users.size(); k++)
            if (clubs[ i].members[ k] == users[ j])
                console.log("user["+j+"] is in club[" + i+"]");