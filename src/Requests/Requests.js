

const request = async ({ url, payload }) => {
    try {
    const result = await fetch(url, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    });
    if (result.status === 200) {
        return result;
    }
    } catch (error) {
    console.log(error);
    }
    };
    
    export default request;