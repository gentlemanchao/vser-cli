import Vser from 'vser';
import Html from './index.html';
import Style from './index.style';
import Config from './config';
/**
 * name: xxx
 * author:
 * modifyTime:
 * @class xxx
 */
export default class xxx extends Vser {
    constructor(options) {
        options.template = Html;
        options.style = Style;
        Object.assign(options, Config);
        super(options);
    }

    created() {
        super.created();
    }
    beforeMounted() {
        super.beforeMounted();
    }

    mounted() {
        super.mounted();

    }
    beforeUpdated() {
        super.beforeUpdated();

    }
    updated() {
        super.updated();

    }
    beforeDestroyed() {
        super.beforeDestroyed();

    }
    destroyed() {
        super.destroyed();

    }
}