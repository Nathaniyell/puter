const { AdvancedBase } = require("../AdvancedBase");

const NOOP = async () => {};

/**
 * Service will be incrementally updated to consolidate
 * BaseService in Puter's backend with Service in Puter's frontend,
 * becoming the common base for both and a useful utility in general.
 */
class Service extends AdvancedBase {
    async __on (id, args) {
        const handler = this.__get_event_handler(id);

        return await handler(id, ...args);
    }

    __get_event_handler (id) {
        return this[`__on_${id}`]?.bind?.(this)
            || this.constructor[`__on_${id}`]?.bind?.(this.constructor)
            || NOOP;
    }

    static create ({ parameters, context }) {
        const ins = new this();
        ins._.context = context;
        ins.construct(parameters);
        return ins;
    }

    init (...a) {
        if ( ! this._init ) return;
        return this._init(...a);
    }

    construct (o) {
        this.$parameters = {};
        for ( const k in o ) this.$parameters[k] = o[k];
        if ( ! this._construct ) return;
        return this._construct(o);
    }
}

module.exports = {
    Service,
};
