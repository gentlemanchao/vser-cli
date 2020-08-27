import html from './index.html';
import style from './styles/index.style';
import Vser from 'vser';
import config from './config';

export default class Page extends Vser {
    constructor(options) {
        options.template = html;
        options.style = style;
        Object.assign(options, config);
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