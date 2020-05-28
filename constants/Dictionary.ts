import * as Localization from 'expo-localization';
import { I18nResolver } from 'i18n-ts';

const MESSAGES: any = {
    en: {
        add:                                    'add',
        perishableGoods:                        'perishable goods',
        setLocation:                            'set location',
        bestBefore:                             'best before',
        successfullyAdded:                      'successfully added',
        letsContinueWithOtherPerishableGood:    'let\'s continue with other perishable good',
        cancel:                                 'cancel',
        okay:                                   'Okay',
        new:                                    'New',
        chooseAPhoto:                           'choose a photo',
        expirationDate:                         'expiration date',
        pickedLocation:                         'picked location',
        all:                                    'All',
        signUp:                                 'sign up',
        name:                                   'name',
        emailAddress:                           'email address',
        password:                               'password',
        confirmPassword:                        'confirm password',
        submit:                                 'submit'
    },
    hu: {
        add:                                    'hozzáad',
        perishableGoods:                        'romlandó áru',
        setLocation:                            'hely meghatározása',
        bestBefore:                             'jó mielőtt',
        successfullyAdded:                      'sikeresen hozzáadva',
        letsContinueWithOtherPerishableGood:    'gyerünk folytasd más romlandó áruval',
        cancel:                                 'mégsem',
        okay:                                   'Oké',
        new:                                    'Új',
        chooseAPhoto:                           'válassz egy fényképet',
        expirationDate:                         'lejárat',
        pickedLocation:                         'kiválasztott helyzet',
        all:                                    'Összes',
        signUp:                                 'regisztráció',
        name:                                   'név',
        emailAddress:                           'email cím',
        password:                               'jelszó',
        confirmPassword:                        'jelszó megerősítése',
        submit:                                 'beküld'
    }
    // , default: en
};

export const i18n: unknown = new I18nResolver(MESSAGES, Localization.locale).translation;
