const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const status = 422;

        // Safe message extraction
        const message =
            err.errors && err.errors.length > 0
                ? err.errors[0].message
                : err.message || "Invalid input";

        const error = {
            status,
            message
        };

        console.log(error);
        next(error);
    }
};

export default validate;