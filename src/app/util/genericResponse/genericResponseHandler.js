class GenericResponseHandler {
    async response(data, httpStatus, message) {
        const httpStatusMessage = message;
        const httpStatusCode = httpStatus;
        if (data && data.isError) {
            return {
                httpStatusCode,
                httpStatusMessage
            };
        } else {
            return {
                httpStatusCode,
                response: data,
                httpStatusMessage
            };
        }
    }
    
    async returnResponse(data) {
        if (data) {
            if (data.isError) { 
                const responseObject = await this.response(undefined, data.codeError, data.message);
                return responseObject;
            }
            const responseObject = await this.response(data, 200);
            return responseObject;
        } else {
            const responseObject = await this.response({}, 500);
            return responseObject;
        }
    }
    
}
module.exports = GenericResponseHandler;