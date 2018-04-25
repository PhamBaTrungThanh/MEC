<template>
    <span class="breathe-icon breathe-light">
        <span class="icon is-large">
            <i :class="`mdi mdi-${icon} mdi-${size}px`"></i>
        </span>
    </span>   
</template>

<script>
export default {
    name: `breathe-icon`,
    props: {
        icon: {
            type: String,
            default: `plus`,
        },
        size: {
            default: 24,
        },
    },
}
</script>

<style>
    .breathe-icon {
        width: 64px;
        height: 64px;
        display: flex;
        margin: 20px auto 0;
        position: relative;
        justify-content: center;
        align-items: center;
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
        border-color: hsl(0, 0%, 98%);
    }

    @keyframes intervalBorderBreathe {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        80% {
            transform: scale(1.6);
        }
        100% {
            opacity: 0;
            transform: scale(1.6);
        }
    }
</style>
