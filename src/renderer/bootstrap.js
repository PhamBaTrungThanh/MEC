import axios from 'axios'
import Chart from 'chart.js'
import * as Swal from 'sweetalert2'
// import scrollMonitor from 'scrollmonitor'

const App = Object.freeze({
    version: `0.0.1`,
    name: `MEC International`,
    timeout: `5000`,
    baseURL: `http://tracker.dev`,
    get baseAPIUrl () { return `${this.baseURL}/api/v1` },
})

const helpers = Object.freeze({
    isEmptyObject: object => {
        return Object.keys(object).length === 0
    },
    isEmptyArray: array => {
        return array.length === 0
    },
    /**
     * Format float number to human-friendly money string
     * @param {*} number
     * @return string
     */
    monetize: number => {
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
    capitalizeFirstChar: str => str.charAt(0).toUpperCase() + str.substring(1),
    /**
     * Convert number to romanize for list indexing
     * @param {string} num
     * @return {string} formatted
     */
    romanize: num => {
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
     * Translate function (in the work)
     * @param {string} str indexing string
     * @return {string} translated string
     */
    __: str => {
        const transString = {
            bank_transfer: `Chuyển tiền`,
            cash: `Tiền mặt`,
        }
        return transString[str]
    },
    /**
     * Quick convert human readable date to ISO format date
     * Example 20/12/2017 -> 2017-12-20
     * @param {string} strDate
     * @return {string} iso formated date
     */
    toISODate: (strDate) => {
        const splitDate = strDate.split(`/`)
        return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
    },
    swal: options => {
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
    colorWheels: (number) => {
        const chartColors = {
            red: `rgb(255, 99, 132)`,
            orange: `rgb(255, 159, 64)`,
            yellow: `rgb(255, 205, 86)`,
            green: `rgb(75, 192, 192)`,
            blue: `rgb(54, 162, 235)`,
            purple: `rgb(153, 102, 255)`,
            grey: `rgb(201, 203, 207)`,
        }
        const colors = Object.values(chartColors)
        return [...colors.slice(0, number - 1), chartColors.grey]
    },
})

const MEC = {
    install: (Vue) => {
        /**
         * Create new axios instance
         */
        Vue.prototype.axios = helpers.axios
        Vue.prototype.ChartJs = Chart
        Vue.prototype.comma = helpers.monetize
        Vue.prototype.__ = helpers.__
        Vue.prototype.swal = helpers.swal
        Vue.directive(`scroll-spy`, {
            inserted (el, binding, vnode) {
                /*
                el.dataset.scrollName = binding.arg
                let watchers = []
                const masterElement = document.querySelector(`.fullscreen-wrapper > .content-section`)
                const masterMonitor = (masterElement) ? scrollMonitor.createContainer(masterElement) : scrollMonitor.createContainer(document.body)

                for (let i = el.children.length - 1; i >= 0; i--) {
                    watchers[i] = masterMonitor.create(el.children[i])
                    watchers[i].enterViewport(() => {
                        vnode.context.$data.scrollIndex = i
                    })
                }
                */
                const masterElement = document.querySelector(`.fullscreen-wrapper > .content-section`)
                const spyElements = el.querySelector(binding.value.selector)
                const linkElements = el.querySelectorAll(binding.value.linksSelector)
                const offsets = []
                let oldIndex = 0
                for (let i = 0; i <= spyElements.children.length - 1; i++) {
                    offsets.push(spyElements.children[i].offsetTop)
                }
                masterElement.addEventListener(`scroll`, function (event) {
                    let index = 0
                    if (masterElement.scrollTop < offsets[0]) {
                        // reach the top
                        index = 0
                    } else if (masterElement.scrollTop > offsets[offsets.length - 1]) {
                        // last item
                        index = offsets.length - 1
                    } else if (masterElement.scrollHeight - masterElement.scrollTop === masterElement.clientHeight) {
                        // reach the end
                        index = offsets.length - 1
                    } else {
                        for (let i = 1; i <= offsets.length - 1; i++) {
                            if (masterElement.scrollTop >= offsets[i - 1] && masterElement.scrollTop < offsets[i]) {
                                index = i - 1
                                break
                            }
                        }
                    }
                    if (index === oldIndex) {
                        return
                    }
                    linkElements[oldIndex].classList.remove(`is-active`)
                    linkElements[index].classList.add(`is-active`)
                    oldIndex = index
                })
                for (let i = linkElements.length - 1; i >= 0; i--) {
                    linkElements[i].addEventListener(`click`, function (event) {
                        spyElements.children[i].scrollIntoView()
                    })
                }
            },
        })
        Vue.directive(`focus`, {
            inserted (el) {
                el.focus()
            },
        })
    },
}

export {
    App,
    helpers,
    MEC,
}
