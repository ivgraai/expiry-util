import { i18n } from '../Dictionary';
import '../../common/String.extension';

const constraints = {
    name: {
        presence: {
            message: '^' + i18n.pleaseEnterAName.capitalize() + '.'
        }
    },
    password: {
        presence: {
            message: '^' + i18n.pleaseEnterAPassword.capitalize() + '.'
        },
        length: {
            minimum: 6,
            message: '^' + i18n.passwordMustBeAtLeast6Characters.capitalize() + '.'
        }
    },
    confirmPassword: {
        equality: {
            attribute: "password",
            message: '^' + i18n.confirmPasswordMustBeEqualToPassword.capitalize() + '.'
        }
    },
    emailAddress: {
        presence: {
            allowEmpty: false,
            message: "^" + i18n.pleaseEnterAnEmailAddress.capitalize() + '.'
        },
        email: {
            message: "^" + i18n.pleaseEnterAValidEmailAddress.capitalize() + '.'
         }
    }
};

export default constraints;
