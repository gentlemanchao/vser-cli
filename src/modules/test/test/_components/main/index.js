import html from './index.html';
import Vser from 'vser';
import config from './config';
class Main extends Vser {
    constructor(options) {
        options.template = html;
        Object.assign(options, config);
        super(options);
    }
    created() {
        super.created();
    }
    beforeMounted() {
        super.beforeMounted();
        console.log('---main', this);
        this.count = 1;
    }
    data() {
        return {
            test: 5,
            arr: [1, 2, 3],
            data: {
                x: 12,
                y: 13
            },
            girl: 'miss'
        }
    }
    props() {
        return {
            key1_1: {
                type: Number,
                default: 0
            },
            key1_2: {
                type: [Number, String],
                default: '10%'
            }

        }

    }
    watcher() {
        return {
            test(val, oldVal) {
                console.log(val);
            }
        }

    }
    routerLeave() {

        console.log('--leave')
    }
    routerRecover() {
        console.log('--recover')
    }
    onClick() {
        this.set(this.data, 'girl', this.data.girl + (this.count++));
        this.set(this.data.data, 'x', this.data.data.x * 2);
        this.set(this.data.arr, this.data.arr.length, this.data.arr.length);
        this.set({
            test: this.data.test + 2
        });
        // this.set({
        //     arr: [this.data.test].concat(this.data.arr.slice(0, this.data.arr.length - 1))
        // });
    }
    dbClick() {
        this.set({
            test: this.data.test + 2,
        });
        this.set({
            arr: [this.data.test].concat(this.data.arr)
        });
    }
    onMsg(data) {
        console.log('---msg', data, this);
    }
    onInput(event) {
        console.log(event);
    }
    onChange(event) {
        console.log(event);
    }
    mounted() {
        super.mounted();
        console.log('-----', this.$router,this.$router.route)
    }
    beforeUpdated() {
        super.beforeUpdated();
        console.log('---beforeUpdated:main')
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
export default Main;