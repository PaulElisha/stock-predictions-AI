/** @format */
export const handleAsyncControl = (controller) => async (req, res, next) => {
    try {
        return await controller(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
