/**
 * @author DuyTM
 * @description bootstrap config
 * @since 2018/03/20
 */
import {registerExtensionMethods} from '../configs/common/exmethod';

/**
 * @method preloadExtensionMethods
 * @description load extension method
 */
function preloadExtensionMethods() {
  registerExtensionMethods({pagination: true, response: true});
}

export default function () {
  /** preload extension method*/
  preloadExtensionMethods();
}
