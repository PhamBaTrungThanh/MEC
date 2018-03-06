<template>
    <transition appear name="zoom-in">
        <div slot="navbar">
        </div>
        <div class="fullscreen-wrapper">
            <div class="sidebar-section">
                <div class="sidebar-inside">
                    <slot name="sidebar"></slot>
                </div>

            </div>
            <div class="content-section">
                <div class="content-inside">
                    <slot></slot>
                </div>
                <div class="close-button">
                    <a class="delete is-large" @click="$router.go(-1)"></a>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: `content-sidebar`,
}
</script>

<style lang="scss">
    $sidebar_width: 218px;
    $content_width: 660px;
    .fullscreen-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
            background: #ffffff;
            display: flex;
        .sidebar-section {
            height: 100%;
            flex: 1 0 $sidebar_width;
            justify-content: flex-end;
            display: flex;
            .sidebar-inside {
                padding: 60px 6px 60px 20px;
                width: $sidebar_width;
            }
        }
        .content-section {
            flex: 1 1 $content_width;
            height: 100%;
            overflow-y: auto;
            position: relative;
            .content-inside {
                width: $content_width;
                padding: 60px 6px 60px 20px;
                .sector {
                    min-height: 70vh;
                    padding-bottom: 5rem;
                }
            }
        }
        .close-button {
            position: fixed;
            margin-left: $content_width + 20px;
            margin-top: 65px;
            top: 0;
        }
    }

</style>
