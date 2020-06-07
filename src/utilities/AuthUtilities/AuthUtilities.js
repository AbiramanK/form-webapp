import {
    RTSuccess,
    RTError
} from './../NotificationUtilities/NotificationUtilities';

export const handleResponse = async (response) => {
    try {
        return response.json()
            .then((res) => { 
                if (res.status === "success") {
                    console.log("Hanle response" , res)
                    return res;
                } else {
                    RTError(res.message)
                    return res
                }
 
            })
            .catch((e) => {
                console.log("response catch", e);
            })
            .finally(() => {
            })
    } catch (error) {
        RTError(error.message);
    }
}

export const handleCatch = (e) => {
    try {
        console.log("catch error", e)
        RTError(e.message);
    } catch (error) {
    }
}