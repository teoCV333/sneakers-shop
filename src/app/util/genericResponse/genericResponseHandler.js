async function response(data, httpStatus, message) {
    const httpStatusMessage = message;
    const httpStatusCode = httpStatus;
    if (data && data.isError) {
        // Si isError es verdadero, devolver solo el código de error y el mensaje
        return {
            httpStatusCode,
            httpStatusMessage
        };
    } else {
        // Si isError no es verdadero, devolver el código de estado, el mensaje y los datos
        return {
            httpStatusCode,
            response: data,
            httpStatusMessage
        };
    }
}

async function returnResponse(data) {
    if (data) {
        if (data.isError) { 
            const responseObject = await response(undefined, data.codeError, data.message);
            return responseObject;
        }
        const responseObject = await response(data, 200);
        return responseObject;
    } else {
        const responseObject = await response({}, 500);
        return responseObject;
    }
}

module.exports = {
    returnResponse
}