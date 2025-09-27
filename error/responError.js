class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
const instanceResponseError = async (error) => {
    if (error instanceof ResponseError) return error;
    else return new ResponseError(400, error.error);
}
export { ResponseError, instanceResponseError }