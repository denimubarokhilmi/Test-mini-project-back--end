const validationSchema = async (schema, request) => {
    return new Promise((resolve, reject) => {
        const result = schema.validate(request, { abortEarly: false, allowUnknown: false });
        if (result.error) {
            reject(result)
        } else resolve(result)
    })
};

export {
    validationSchema
}