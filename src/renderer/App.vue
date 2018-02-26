<template>
    <div id="app" :class="{'ready': ready}">
        <div class="wrapper" v-if="show && !ready">
            <router-view></router-view>
        </div>
        <section class="hero is-fullheight" v-if="ready">
            <div class="hero-head">
                <!--
                <nav class="navbar">
                    <div class="container is-fluid">
                        
                        <div class="navbar-brand">
                            <a class="navbar-item">
                                <span class="is-5 title">MEC Manager</span>
                            </a>
                        </div>
                        <div class="navbar-menu">
                            <div class="navbar-start">
                                <span class="navbar-item">
                                    <router-link class="button is-info is-inverted navbar-button" to="/dashboard">
                                        <span>Test</span>
                                    </router-link>
                                </span>
                            </div>
                        </div>
                        

                    </div>
                </nav>
                -->

            </div>
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
                <div class="main-content">
                    <hero class="is-dark">
                        <div class="container is-fluid">
                            <nav class="tabs is-boxed is-right">
                                <ul>
                                    <router-link tag="li" to="/dashboard">
                                        <a>Dashboard</a>
                                    </router-link>
                                </ul>
                            </nav>
                        </div>
                    </hero>

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
    export default {
        name: `mec`,
        components: {
            LoginForm,
        },
        data: () => {
            return {
                displaySidebar: true,
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
                    const currentWindow = this.$electron.remote.getCurrentWindow()
                    const screen = this.$electron.remote.screen
                    const display = screen.getPrimaryDisplay()
                    console.log(display.workArea)
                    currentWindow.hide()
                    currentWindow.setBounds(display.workArea)
                    currentWindow.show()
                }
                return this.$store.state.App.isReady
            },
            requestLogin () {
                return this.$store.state.App.requestLogin
            },
        },
        created () {
            this.$store.dispatch(`appInit`)
        },
    }
</script>

<style lang="scss">
    @import "~@/assets/fonts/fonts.css";
    @import "~mdi/css/materialdesignicons.min.css";
    /*
     * Variables
    */
    $family-primary: "Roboto";
    $family-heading: "Roboto Condensed";
    $font-weight-heading: 400;
    $radius: 0px;
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
    ::-webkit-scrollbar { 
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
    .fuild-height {
        height: 100vh;
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
        overflow-y: scroll;
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
        transform: scale(1.2);
    }
    .zoom-in-enter-to {
        opacity: 1;
        transform: scale(1);
    }
    .zoom-in-enter-active {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    #app.ready {
        .landing-page {
            display: none;
        }
    }

</style>

