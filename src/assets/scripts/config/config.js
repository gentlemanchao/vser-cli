import devConfig from './developConfig.js';
import testConfig from './testConfig.js';
import proConfig from './productConfig.js';
const _configs = {
    develop: devConfig,
    test: testConfig,
    product: proConfig
}


/**
 * 通用配置
 */
let config = {
    env: ENVIRONMENT,
    scriptVersion: SCRIPT_VERSION, //脚本版本号编译时自动生成格式为yyyy-mm-dd
}

export default Object.assign(config, _configs[ENVIRONMENT]);