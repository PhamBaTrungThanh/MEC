<template>
    <div id="app" :class="{'ready': ready}">
        <div class="wrapper" v-if="show && !ready">
            <landing-page />
        </div>
        <div class="app--wrapper" v-if="show && ready">
            <router-view></router-view>
        </div>
        <transition name="zoom-in">
            <login-form v-if="requestLogin" />
        </transition>
    </div>
</template>

<script>
    import LoginForm from './components/LoginForm'
    import LandingPage from './components/LandingPage'
    export default {
        name: `mec`,
        components: {
            LoginForm,
            LandingPage,
        },
        data: () => {
            return {
                fixedWindow: {
                    width: 440,
                    height: 500,
                },
            }
        },
        computed: {
            show () {
                if (this.$store.state.App.initialized) {
                    if (this.$store.state.App.requestLogin) {
                        return false
                    } else {
                        return true
                    }
                }
            },
            ready () {
                if (this.$store.state.App.isReady) {
                    this.setWindowMaximizeWithMenu()
                }
                return this.$store.state.App.isReady
            },
            requestLogin () {
                if (this.$store.state.App.requestLogin) {
                    this.setWindowFixed()
                }
                return this.$store.state.App.requestLogin
            },
        },
        methods: {
            setWindowMaximizeWithMenu () {
                const currentWindow = this.$electron.remote.getCurrentWindow()
                const screen = this.$electron.remote.screen
                const display = screen.getPrimaryDisplay()
                const router = this.$router
                const template = [
                    {
                        label: `Công việc`,
                        submenu: [
                            {
                                type: `normal`,
                                label: `Công việc `,
                                accelerator: `Control+1`,
                                click () {
                                    router.push(`/flow`)
                                },
                            },
                            {
                                type: `normal`,
                                label: `Thêm nhân viên mới`,
                            },
                        ],
                    },
                    {
                        label: `Nhân sự`,
                        submenu: [
                            {
                                type: `normal`,
                                label: `Danh sách nhân viên`,
                                accelerator: `Control+2`,
                                click () {
                                    router.push(`/hr`)
                                },
                            },
                            {
                                type: `normal`,
                                label: `Thêm nhân viên mới`,
                            },
                        ],
                    },
                    {
                        label: `Dự án`,
                        submenu: [
                            {
                                type: `normal`,
                                label: `Danh sách công trường`,
                                accelerator: `Control+3`,
                                click () {
                                    router.push({
                                        name: `work.index`,
                                    })
                                },
                            },
                        ],
                    },
                    {
                        label: `Tùy chọn`,
                        submenu: [
                            {
                                type: `normal`,
                                label: `Chỉnh sửa tùy chọn`,
                                accelerator: `Control+4`,
                                click () {
                                    router.push({
                                        name: `options`,
                                        goto: `default`,
                                    })
                                },
                            },
                            {
                                type: `normal`,
                                label: `Đổi mật khẩu`,
                                click () {
                                    router.push({
                                        name: `options`,
                                        query: {
                                            goto: `change_password`,
                                        },
                                    })
                                },
                            },
                            {
                                type: `normal`,
                                label: `Đăng xuất`,
                                accelerator: `Control+L`,
                                click () {
                                    router.push({
                                        name: `options`,
                                        query: {
                                            goto: `logout`,
                                        },
                                    })
                                },
                            },
                        ],
                    },
                    {
                        role: `help`,
                        submenu: [
                            {
                                label: `Learn More`,
                                click () { console.log(`clicked`) },
                            },
                        ],
                    },
                ]
                const menu = this.$electron.remote.Menu.buildFromTemplate(template)
                this.$electron.remote.Menu.setApplicationMenu(menu)
                currentWindow.hide()
                currentWindow.setMenuBarVisibility(true)
                currentWindow.setBounds(display.workArea)
                currentWindow.show()
            },
            setWindowFixed () {
                const currentWindow = this.$electron.remote.getCurrentWindow()
                const screen = this.$electron.remote.screen
                const display = screen.getPrimaryDisplay().workArea
                currentWindow.setBounds({
                    x: (display.width - this.fixedWindow.width) / 2,
                    y: (display.height - this.fixedWindow.height) / 2,
                    width: this.fixedWindow.width,
                    height: this.fixedWindow.height,
                })
            },
        },
        created () {
            this.setWindowFixed()
            this.$store.dispatch(`appInit`)
        },
    }
</script>

<style lang="scss">
    @import "~@/assets/fonts/fonts.css";
    @import "~mdi/css/materialdesignicons.min.css";
    @import "~@riophae/vue-treeselect/dist/vue-treeselect.min";
    @import '~v-calendar/lib/v-calendar.min.css';
    /*
     * Variables
    */
    $body-size: 15px;
    $family-primary: "Roboto";
    $family-heading: "Roboto Condensed";
    $font-weight-heading: 400;
    $radius: 2px;
    $label-weight: 400;
    $modal-background-background-color: rgba(10, 10, 10, 0.64);
    $box-radius: $radius;
    @import "~bulma/bulma.sass";
    /* Colors */
    .project-color {
        background: hsl(0, 0%, 98%);
        color: hsl(0, 0%, 90%);
    }
    .project-color:hover {
        color: hsl(0, 0, 95%);
    }
    .project-color.black {
        background: hsl(0, 0%, 0%);
    }
    .project-color.red {
        background: hsl(348, 100%, 61%);
    }
    .project-color.purple {
        background: hsl(271, 100%, 71%);
    }
    .project-color.blue {
        background: hsl(217, 71%, 53%);
    }
    .project-color.cyan {
        background: hsl(204, 86%, 53%);
    }
    .project-color.turquoise {
        background: hsl(171, 100%, 41%);
    }
    .project-color.green {
        background: hsl(141, 71%, 48%);
    }
    .project-color.yellow {
        background: hsl(48, 100%, 67%);
    }
    .project-color.orange {
        background: hsl(14, 100%, 53%);
    }
    /* Override */
    h1, h2, h3, h4, h5, h6, .title, .subtitle {
        font-family: $family-heading;
        font-weight: $font-weight-heading;
    }
    table.table {
        border-collapse: separate;
        border: none;
        border-top: 1px solid #dbdbdb;
        border-right: 1px solid #dbdbdb;       
        td, th {
            border: none;
            border-bottom: 1px solid #dbdbdb;
            border-left: 1px solid #dbdbdb;
        }
    }
    .content table tbody tr:last-child td, .content table tbody tr:last-child th, .table tbody tr:last-child td, .table tbody tr:last-child th {
        border-bottom-width: 1px;
    }
    /** Global */
    * {
        -webkit-font-smoothing: antialiased;
        backface-visibility: hidden;
        position: relative;
    }
    html::-webkit-scrollbar { 
        display: none;
    }
    .is-relative {
        position: relative;
    }
    .button.is-expanded {
        width: 100%;
    }
    .columns.is-stretch {
        align-items: stretch;
    }    
    .columns.is-verticaly-centered {
        align-items: center;
    }
    .fuild-height, {
        height: 100vh;
    }
    .button.has-label {
        overflow: hidden;
        & > .icon:first-child {
            margin-right: calc(-0.375em - 1px);
        }           
        & > .label {
            width: 0;
            opacity: 0;
            transition: opacity 250ms ease 0s;
            transform-origin: left center;
        }
        &:hover > .icon:first-child {
            margin-right: 0.1875em;
        }     
        &:hover > .label {
            width: 100%;
            opacity: 1;
        }
    }
    .pointer {
        cursor: pointer;
    }
    .is-unselectable {
        pointer-events: none;
    }
    .is-full-height {
         height: 100% !important;
    }
    .no-padding {
        padding: 0;
    }
    .no-margin {
        margin: 0;
    }
    .scrollable-y {
        overflow-y: auto;
    }
    .scrollable-x {
        overflow-x: auto;
    }
    .is-size-6-5 {
        font-size: 0.85rem;
    }
    .canvas-container.is-square canvas,
    .canvas-container.is-1by1 canvas,
    .canvas-container.is-4by3 canvas,
    .canvas-container.is-3by2 canvas,
    .canvas-container.is-16by9 canvas,
    .canvas-container.is-2by1 canvas {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        width: 100%;
    }
    .table-container > .table {
        white-space: nowrap;
        
    }
    .table.has-text-centered-cell {
        td,th  {
            text-align: center;
            vertical-align: middle;
        }
    }
    .table.has-text-left-cell {
        td {
            text-align: center;
            vertical-align: middle;
        }
    }
    .table.has-text-small {
        font-size: 0.9rem;
    }
    /* 
     * navbar
     */
     .navbar-item {
         .button.navbar-button {
            border-radius: 4px;
            min-width: 100px;
            span {
                font-size: 0.9rem;
            }
         }
     }
    /*
     * Sidebar
     */
    aside.sidebar {
        background: $light;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: 300;
        color: $dark;
        width: 235px;

        a.toggle-sidebar-button {
            border-right: 1px dashed #cecece;
            background: #fafafa;
            color: #d8d9da;
            width: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            cursor: pointer;
            opacity: 0;
            z-index: 600;
            transition: opacity 150ms cubic-bezier(0.3, 0.4, 0.4, 0.1);
            &:hover {
                color: #a4a6a8;
                opacity: 1;
            }
        }

        .sidebar-main {
            transition: transform 250ms cubic-bezier(0.225, 0.5, 0.165, 1);
            transform: translateX(0);
            height: 100%;
            .sidebar-content {
                display: flex;
                flex-direction: column;
                height: 100%;
                max-height: 100%;

                .navigation-block {
                    margin: 0 15px 0 20px;
                    .label {
                        margin: 22px 0 7px;
                    }
                }
            }
        }
        &:not(.hide-sidebar) a.toggle-sidebar-button:hover + .sidebar-main {
            transform: translateX(15px);
        }
        &.hide-sidebar {
            transform: translateX(-210px);
            a.toggle-sidebar-button {
                left: 210px;
            }

        }
    }
    .main-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #ffffff;
    }
    aside.sidebar:not(.hide-sidebar) + .main-content {
        left: 235px;
    }
    aside.sidebar.hide-sidebar + .main-content {
        left: 20px;
    }
    .hero.is-fullscreen {
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    /** SPECIAL **/
    .float-controls-container {
        position: fixed;
        display: flex;
        flex-direction: column;
        right: 50px;
        bottom: 50px;
    }
    .float-control {
        background: rgba(#41ab6b, 0.1);
        width: 5em;
        height: 5em;
        border-radius: 50%;
        text-align: center;
        transition: background 0.2s, color 0.2s;
        color: #41ab6b;
        display: flex;
        justify-content: center;
        align-items: center;
        &[disabled="disabled"] {
            color: #ccc;
            background: #eee;
        }
        &:not([disabled="disabled"]):after {
            top: -7px;
            left: -7px;
            padding: 7px;
            box-shadow: 0 0 0 4px #41ab6b;
            transition: transform 0.2s, opacity 0.2s;
            transform: scale(.8);
            opacity: 0;
            pointer-events: none;
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            content: '';
            box-sizing: content-box;
        }
        &:not([disabled="disabled"]):hover {
            color: #ffffff;
            background: #41ab6b;
        }
        &:hover:after {
            transform: scale(1);
            opacity: 1;
        }
        .icon {
            font-size: 3em;
        }
        .float-explain {
            position: absolute;
            background: #41ab6b;
            z-index: 9999;
            width: 200px;
            bottom: 50%;
            margin-bottom: 0em;
            padding: 20px;
            border-radius: 20px;
            font-size: 1.1em;
            text-align: center;
            color: #fff;
            opacity: 0;
            cursor: default;
            pointer-events: none;
            transition: opacity 0.3s, transform 0.3s; 
            right: 6em;
            transform-origin: calc(100% + 5em) 50%;
            transform: translate3d(0,50%,0) rotate3d(1,1,1,-30deg);
        }
        &:not([disabled="disabled"]):hover > .float-explain {
            opacity: 1;
            transform: translate3d(0,50%,0) rotate3d(0,0,0,0);
            pointer-events: auto;
        }
    }

    .breathe-icon {
        width: 64px;
        height: 64px;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        z-index: 110;
        border-radius: 50%;
        pointer-events: auto;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .breathe-icon:after {
        width: 64px;
        height: 64px;
        box-sizing: border-box;
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
        border: 4px solid #9236f7;
        border-radius: 50%;
        animation-duration: 1.2s;
        animation-name: intervalBorderBreathe;
        animation-iteration-count: infinite;
    }
    .breathe-icon.breathe-light {
        background-color: hsl(0, 0%, 97%);
    }
    .breathe-icon.breathe-light:after {
        border-color: hsl(0, 0%, 93%);
    }
</style>
<style lang="scss">
    /* Tooltip */
    .tooltip-content {
        text-align: center;
        color: #fff;
        cursor: default;
        font-size: 0.55em;
        line-height: 1.4;
        pointer-events: none;
    }
    .tooltip-content.bloated {
        position: absolute;
        background: url(~@/assets/images/tooltip-bloated.svg) no-repeat center bottom;
        background-size: 100% 100%;
        z-index: 9999;
        width: 200px;
        bottom: 100%;
        left: 50%;
        margin-left: -100px;
        padding: 50px 30px;
        text-align: center;
        color: #fff;
        opacity: 0;
        cursor: default;
        line-height: 1.4;
        pointer-events: none;
        transform: scale3d(0.1,0.2,1);
        transform-origin: 50% 120%;
        transition: opacity 0.4s, transform 0.4s;
        transition-timing-function: ease, cubic-bezier(0.6,0,0.4,1);
        &:after {
            content: '';
            position: absolute;
            width: 16px;
            height: 16px;
            left: 50%;
            margin-left: -8px;
            top: 100%;
            background: #00AEEF;
            transform: translate3d(0,-60%,0) rotate3d(0,0,1,45deg);
        }
    }
    .tooltip:hover > .tooltip-content.bloated, .tooltip-trigger:focus + .tooltip-content.bloated {
        opacity: 1;
        pointer-events: auto;
        transform: scale3d(1,1,1);
    }
</style>

<style lang="scss">
    /* Animation */
    .zoom-enter, .zoom-leave-to {
        opacity: 0;
        transform: scale(1.2);
    }
    .zoom-enter-to, .zoom-leave {
        opacity: 1;
        transform: scale(1);
    }
    .zoom-enter-active, .zoom-leave-active {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .zoom-in-enter {
        opacity: 0;
        transform: scale(1.1);
    }
    .zoom-in-enter-to {
        opacity: 1;
        transform: scale(1);
    }
    .zoom-in-enter-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .slide-up-enter-active {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .slide-up-enter {
        opacity: 0;
        transform: translateY(100px);
    }
    .slide-up-enter-to {
        opacity: 1;
        transform: translateY(0);
    }
    .slide-left-enter-active {
        transition: transform 300ms ease 0s;
    }
    .slide-left-leave-active {
        display: none;
    }
    .slide-left-enter {
        // opacity: 0;
        transform: translateX(100%);
    }
    .slide-left-enter-to {
        // opacity: 1;
        transform: translateX(0);
    }
    .appear-enter-active {
        transition: opacity 200ms ease-in;
    }
    .appear-enter {
        opacity: 0;
    }
    .appear-enter-to {
        opacity: 1;
    }
    #app.ready {
        .landing-page {
            display: none;
        }
    }

    @keyframes intervalBorderBreathe {
	0% {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
	80% {
		-webkit-transform: scale(1.6);
		transform: scale(1.6);
	}
	100% {
		opacity: 0;
		-webkit-transform: scale(1.6);
		transform: scale(1.6);
	}
}
</style>

