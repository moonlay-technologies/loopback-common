module.exports = function (Model, options) {
    Model.defineProperty('_active', { type: Boolean, default: true });
    Model.defineProperty('_deleted', { type: Boolean, default: false });
    Model.defineProperty('_createdDate', { type: Date, default: '$now' });
    Model.defineProperty('_createdBy', { type: String, default: '' });
    Model.defineProperty('_createdAgent', { type: String, default: '' });
    Model.defineProperty('_updatedDate', { type: Date, default: '$now' });
    Model.defineProperty('_updatedBy', { type: String, default: '' });
    Model.defineProperty('_updatedAgent', { type: String, default: '' });

    Model.observe('before save', function event(context, next) {
        Model.validate(context)
            .then(x => {

                var data = context.instance || context.data;
                var accessToken = context.options.accessToken;
                var actor = accessToken && accessToken.userId ? accessToken.userId : "#anonymous";

                if (context.isNewInstance) {
                    data._createdDate = Date.now();
                    data._createdBy = actor;
                }

                data._updatedDate = Date.now();
                data._updatedBy = actor;

                next();
            })
            .catch(e => {
                next(e);
            })

    });
};
