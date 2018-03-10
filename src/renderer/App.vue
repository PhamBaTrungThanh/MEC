<template>
    <div id="app" :class="{'ready': ready}">
        <div class="wrapper" v-if="show && !ready">
            <landing-page />
        </div>
        <section class="hero is-fullheight" v-if="show && ready">
            <div class="hero-body no-padding is-relative">
                <aside :class="{'sidebar': true, 'hide-sidebar': !displaySidebar}">
                    <a class="toggle-sidebar-button" @click="displaySidebar = !displaySidebar">
                        <span class="icon">
                            <i class="mdi mdi-chevron-left" v-if="displaySidebar"></i>
                            <i class="mdi mdi-chevron-right" v-if="!displaySidebar"></i>
                        </span>
                    </a>
                    <div class="sidebar-main">
                        <div class="sidebar-content scrollable-y">
                            <div class="navigation-block">
                                <p class="subtitle is-6 is-capitalized label">Công cụ</p>
                            </div>
                        </div>
                    </div>
                </aside>
                <div class="main-content scrollable-y" id="main">
                    <router-view></router-view>
                </div>
            </div>
        </section>
        
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
                displaySidebar: true,
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
                        label: `Nhân sự`,
                        submenu: [
                            {
                                type: `normal`,
                                label: `Danh sách nhân viên`,
                                accelerator: `Control+1`,
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
                                accelerator: `Control+2`,
                                click () {
                                    router.push({
                                        name: `work.index`,
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
    /*
     * Variables
    */
    $family-primary: "Roboto";
    $family-heading: "Roboto Condensed";
    $font-weight-heading: 400;
    // $radius: 0px;
    $label-weight: 400;
    @import "~bulma/bulma.sass";
    /* Override */
    h1, h2, h3, h4, h5, h6, .title, .subtitle {
        font-family: $family-heading;
        font-weight: $font-weight-heading;
    }
    /** Global */
    * {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    html::-webkit-scrollbar { 
        display: none;
    }
    .is-relative {
        position: relative;
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
    tr.depth-1 > td.depth-padding {
        padding-left: 20px;
    }
    tr.depth-2 > td.depth-padding {
        padding-left: 40px;
    }
    tr.depth-3 > td.depth-padding {
        padding-left: 60px;
    }
    tr.depth-4 > td.depth-padding {
        padding-left: 80px;
    }
    tr.depth-5 > td.depth-padding {
        padding-left: 100px;
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
    #app.ready {
        .landing-page {
            display: none;
        }
    }

</style>

