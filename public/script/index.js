//https://developers.google.com/analytics/devguides/collection/gajs/#disable
const gaProperty = 'UA-172788722-2'

const disableStr = 'ga-disable-' + gaProperty

// Disable tracking if the opt-out cookie exists.
if (document.cookie.indexOf(disableStr + '=true') > -1) {
    window[disableStr] = true;
    document.getElementById("checkbox").checked = false
}

// Opt-out function
function gaOptout(isChecked) {
    if (!isChecked) {
        document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; SameSite=None; Secure; path=/'
        window[disableStr] = true
    } else {
        document.cookie = disableStr + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure; path=/'
        window[disableStr] = false
    }
}

//Init Google Analytics
window.dataLayer = window.dataLayer || []

function gtag() {
    dataLayer.push(arguments)
}
gtag('js', new Date())

gtag('config', gaProperty)