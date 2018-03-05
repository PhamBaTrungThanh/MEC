<template>
    <translate appear name="zoom-in">
        <div class="fullscreen-wrapper">
            <div class="sidebar-section">
                <slot name="sidebar"></slot>
            </div>
            <div class="content-section">
                <div class="content-inside">
                    <slot></slot>
                </div>
            </div>
        </div>
    </translate>
</template>

<script>
export default {
    name: `content-sidebar`,
}
</script>

<style lang="scss">
    .fullscreen-wrapper {
        display: flex;
        .sidebar-section {
            width: 250px;
        }
        .content-section {
            flex: 1 1 0;
            margin-left: 20px;
            .content-inside {
                width: 660px;
                .sector {
                    min-height: 70vh;
                    padding-bottom: 5rem;
                }
            }
        }
    }

</style>
