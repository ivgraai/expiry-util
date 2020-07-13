import { i18n } from '../Dictionary';
import '../../common/String.extension';

const constraints = {
    goods: {
        presence: {
            allowEmpty: false,
            message: '^' + i18n.pleaseEnterAnItem.capitalize() + '.'
        }
    }
};

export default constraints;
