import 'jQuery';
import './styles/index.style';
import Html from './tpls/index.html';
import Component from 'classes/component';
/**
 * name: xxx
 * author:
 * modifyTime:
 * @class xxx
 */
class xxx extends Component {
    constructor(options) {
        let defaults = {
            html: Html,
            serverSide: false,
            parameters: {},
        }
        $.extend(defaults, options);
        super(defaults);
    }
    beforeMounted() {
        super.beforeMounted();
    }
    mounted() {
        super.mounted();
    }
    beforeDestroyed() {
        super.beforeDestroyed();
    }
    destroyed() {
        super.destroyed();
    }
}
xxx.template = html;
export default xxx;