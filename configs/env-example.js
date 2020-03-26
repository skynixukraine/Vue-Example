/*
    BASE_API_URL: 'https://staging.xyzx.g-inc.pro/api/v1',
    GOOGLE_API_RECAPTCHA_URL: 'https://www.google.com/recaptcha/api',
    GOOGLE_MAPS_API_KEY: 'AIzaSyAsyz2Io_tDucVQaqtbWmiWWvK7tqDUOLo',
    RECAPTCHA_SITE_KEY: '6LdevsYUAAAAANMMWGDy7h5SPUc9knsvAwe-28bI',
    RECAPTCHA_SECRET_KEY: '6LdevsYUAAAAACkN7UBe_eez-wn781xFWVxfLQjV',
*/
export default {
    BASE_API_URL: '{{.Env.BASE_API_URL}}',
    GOOGLE_API_RECAPTCHA_URL: '{{.Env.GOOGLE_API_RECAPTCHA_URL}}',
    GOOGLE_MAPS_API_KEY: '{{.Env.GOOGLE_MAPS_API_KEY}}',
    RECAPTCHA_SITE_KEY: '{{.Env.RECAPTCHA_SITE_KEY}}',
    RECAPTCHA_SECRET_KEY: '{{.Env.RECAPTCHA_SECRET_KEY}}',
}