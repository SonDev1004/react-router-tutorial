import * as yup from 'yup';

const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/;
const REGEX_ONLY_NUMBER = /^\d+$/;
const REGEX_USERNAME = /^(?=.{3,20}$)(?![_.-])[a-zA-Z0-9._-]+(?<![_.-])$/;

yup.addMethod(yup.string, 'username', function (message) {
    return this.matches(REGEX_USERNAME, {
        message,
        excludeEmptyString: true,
    });
})

yup.addMethod(yup.string, 'password', function (message,) {
    return this.matches(REGEX_PASSWORD, {
        message,
        excludeEmptyString: true,
    })
});

yup.addMethod(yup.string, 'onlyNumber', function (message) {
    return this.matches(REGEX_ONLY_NUMBER, {
        message,
        excludeEmptyString: true,
    })
});

export default yup;