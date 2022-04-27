/**
 * Set a cookie
 * @param {string} key Key
 * @param {string} value Value
 */
function setCookie(key, value) {
    document.cookie = `${key}=${value || ''}; path=/;SameSite=Lax`
}

/**
 * Get a cookie
 * @param {string} key Key
 * @returns {string} Cookie
 */
function getCookie(key) {
    const cookieName = `${key}=`
    const cookieArray = document.cookie.split(';')

    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }

        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
}

/**
 * Delete a cookie
 * @param {string} key Key
 * @returns {string} Cookie
 */
function deleteCookie(key) {
    document.cookie = key + '=; SameSite=Lax; path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const GA_ID = 'G-FPQXHD430B'
const ACCEPT_COOKIE_NAME = 'accept_cookies'
const disableGaStr = `ga-disable-${GA_ID}`
function gtag() { dataLayer.push(arguments) }

/**
 * On accept cookie
 */
function onAccept() {
    setCookie(ACCEPT_COOKIE_NAME, 'true')
    document.getElementsByClassName('gdpr-banner')[0].style.display = 'none'

    window[disableGaStr] = false

    //Init Google Analytics
    window.dataLayer = window.dataLayer || []

    // Init tracking
    gtag('js', new Date())
    gtag('config', GA_ID, { cookie_flags: 'secure;samesite=none' })
}

/**
 * On refuse cookie
 */
function onRefuse() {
    setCookie(ACCEPT_COOKIE_NAME, 'false')
    deleteCookie('_ga')
    deleteCookie('_gat')
    deleteCookie('_gid')
    document.getElementsByClassName('gdpr-banner')[0].style.display = 'none'
    window[disableGaStr] = true
}

// On content loaded
document.addEventListener("DOMContentLoaded", () => {
    const cookie = getCookie(ACCEPT_COOKIE_NAME)

    if (!cookie)
        document.getElementsByClassName('gdpr-banner')[0].style.display = 'flex'

    if (cookie === 'true') {
        onAccept()
    } else {
        window[disableGaStr] = true
    }
})
