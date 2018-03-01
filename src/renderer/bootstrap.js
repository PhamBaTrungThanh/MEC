import axios from 'axios'
import Chart from 'chart.js'
import * as Swal from 'sweetalert2'

const App = Object.freeze({
    version: `0.0.1`,
    name: `MEC International`,
    timeout: `5000`,
    baseURL: `http://tracker.dev`,
    get baseAPIUrl () { return `${this.baseURL}/api/v1` },
})

const helpers = Object.freeze({
    'isEmptyObject': object => {
        return Object.keys(object).length === 0
    },
    'isEmptyArray': array => {
        return array.length === 0
    },
    /**
     * Format float number to human-friendly money string
     * @param {*} number
     * @return string
     */
    'monetize': number => {
        if (Number.isNaN(number)) {
            return 0
        } else if (parseFloat(number) === 0) {
            return `-`
        } else {
            var parts = parseFloat(number).toFixed(3).toString().split(`.`)
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, `,`)
            if (parseInt(parts[1]) === 0) {
                return parts[0]
            } else {
                return parts.join(`.`)
            }
        }
    },
    'capitalizeFirstChar': str => str.charAt(0).toUpperCase() + str.substring(1),
    /**
     * Convert number to romanize for list indexing
     * @param {string} num
     * @return {string} formatted
     */
    'romanize': num => {
        const lookup = {M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1}
        let roman = ``
        let i = 0
        for (i in lookup) {
            while (num >= lookup[i]) {
                roman += i
                num -= lookup[i]
            }
        }
        return roman
    },
    /**
     * Quick convert human readable date to ISO format date
     * Example 20/12/2017 -> 2017-12-20
     * @param {string} strDate
     * @return {string} iso formated date
     */
    'toISODate': (strDate) => {
        const splitDate = strDate.split(`/`)
        return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
    },
    'swal': options => {
        const defaults = {
            buttonsStyling: false,
            cancelButtonClass: `button`,
            cancelButtonText: `Hủy`,
            confirmButtonClass: `button is-primary`,
            confirmButtonText: `Xác nhận`,
            customClass: `box`,
        }
        const merged = Object.assign({}, defaults, options)
        return new Swal(merged)
    },
    axios: axios.create({
        baseURL: App.baseAPIUrl,
        timeout: App.timeout,
        headers: {
            'X-Requested-With': `XMLHttpRequest`,
        },
    }),
})
const chartColors = {
    red: `rgb(255, 99, 132)`,
    orange: `rgb(255, 159, 64)`,
    yellow: `rgb(255, 205, 86)`,
    green: `rgb(75, 192, 192)`,
    blue: `rgb(54, 162, 235)`,
    purple: `rgb(153, 102, 255)`,
    grey: `rgb(201, 203, 207)`,
}
const MEC = {
    install: (Vue) => {
        /**
         * Create new axios instance
         */
        Vue.prototype.axios = helpers.axios
        Vue.prototype.ChartJs = Chart
        Vue.prototype.comma = helpers.monetize
    },
}

export {
    App,
    helpers,
    MEC,
    chartColors,
}
