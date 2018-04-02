<template>
    <div class="sweet-icon-container swal2-show">
        <div class="swal2-icon swal2-error swal2-animate-error-icon" v-if="type === 'error'">
            <span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span>
        </div>
        <div class="swal2-icon swal2-question" v-if="type === 'question'">
            <span class="swal2-icon-text">?</span>
        </div>
        <div class="swal2-icon swal2-warning" v-if="type === 'warning'">
            <span class="swal2-icon-text">!</span>
        </div>
        <div class="swal2-icon swal2-info" v-if="type === 'info'">
            <span class="swal2-icon-text">i</span>
        </div>
        <div class="swal2-icon swal2-success swal2-animate-success-icon" v-if="type === 'success'">
            <div class="swal2-success-circular-line-left"></div>
            <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
            <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
            <div class="swal2-success-circular-line-right"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: `sweet-icon`,
    props: {
        type: {
            type: String,
            default: `success`,
        },
    },
}
</script>

<style lang="scss">
// ICONS
$swal2-icon-size: 5em !default;
$swal2-icon-margin: 1.25em auto 1.875em !default;
$swal2-icon-zoom: normal !default;
$swal2-success: #a5dc86 !default;
$swal2-success-border: rgba($swal2-success, .3) !default;
$swal2-error: #f27474 !default;
$swal2-warning: #f8bb86 !default;
$swal2-info: #3fc3ee !default;
$swal2-question: #87adbd !default;

// ANIMATIONS
$swal2-show-animation: swal2-show .3s !default;
$swal2-hide-animation: swal2-hide .15s forwards !default;
$swal2-success-line-tip-animation: swal2-animate-success-line-tip .75s !default;
$swal2-success-line-long-animation: swal2-animate-success-line-long .75s !default;
$swal2-success-circular-line-animation: swal2-rotate-success-circular-line 4.25s ease-in !default;
$swal2-error-icon-animation: swal2-animate-error-icon .5s !default;
$swal2-error-x-mark-animation: swal2-animate-error-x-mark .5s !default;

.swal2-icon {
  position: relative;
  justify-content: center;
  width: $swal2-icon-size;
  height: $swal2-icon-size;
  margin: $swal2-icon-margin;
  border: .25em solid transparent;
  border-radius: 50%;
  line-height: $swal2-icon-size;
  cursor: default;
  box-sizing: content-box;
  user-select: none;
  zoom: $swal2-icon-zoom;
  display: flex;
  &-text {
    font-size: 3.75em;
  }

  &.swal2-error {
    border-color: $swal2-error;

    .swal2-x-mark {
      position: relative;
      flex-grow: 1;
    }

    [class^='swal2-x-mark-line'] {
      display: block;
      position: absolute;
      top: 2.3125em;
      width: 2.9375em;
      height: .3125em;
      border-radius: .125em;
      background-color: $swal2-error;

      &[class$='left'] {
        left: 1.0625em;
        transform: rotate(45deg);
      }

      &[class$='right'] {
        right: 1em;
        transform: rotate(-45deg);
      }
    }
  }

  &.swal2-warning {
    border-color: lighten($swal2-warning, 7);
    color: $swal2-warning;
  }

  &.swal2-info {
    border-color: lighten($swal2-info, 20);
    color: $swal2-info;
  }

  &.swal2-question {
    border-color: lighten($swal2-question, 20);
    color: $swal2-question;
  }

  &.swal2-success {
    border-color: $swal2-success;

    [class^='swal2-success-circular-line'] { // Emulate moving circular line
      position: absolute;
      width: 3.75em;
      height: 7.5em;
      transform: rotate(45deg);
      border-radius: 50%;

      &[class$='left'] {
        top: -.4375em;
        left: -2.0635em;
        transform: rotate(-45deg);
        transform-origin: 3.75em 3.75em;
        border-radius: 7.5em 0 0 7.5em;
      }

      &[class$='right'] {
        top: -.6875em;
        left: 1.875em;
        transform: rotate(-45deg);
        transform-origin: 0 3.75em;
        border-radius: 0 7.5em 7.5em 0;
      }
    }

    .swal2-success-ring { // Ring
      position: absolute;
      top: -.25em;
      left: -.25em;
      width: 100%;
      height: 100%;
      border: .25em solid $swal2-success-border;
      border-radius: 50%;
      z-index: 2;
      box-sizing: content-box;
    }

    .swal2-success-fix { // Hide corners left from animation
      position: absolute;
      top: .5em;
      left: 1.625em;
      width: .4375em;
      height: 5.625em;
      transform: rotate(-45deg);
      z-index: 1;
    }

    [class^='swal2-success-line'] {
      display: block;
      position: absolute;
      height: .3125em;
      border-radius: .125em;
      background-color: $swal2-success;
      z-index: 2;

      &[class$='tip'] {
        top: 2.875em;
        left: .875em;
        width: 1.5625em;
        transform: rotate(45deg);
      }

      &[class$='long'] {
        top: 2.375em;
        right: .5em;
        width: 2.9375em;
        transform: rotate(-45deg);
      }
    }
  }
}
.swal2-success-circular-line-right, .swal2-success-circular-line-left, .swal2-success-fix {
    background: rgb(255, 255, 255);
}
// github.com/sweetalert2/sweetalert2/issues/268
[class^='swal2'] {
  -webkit-tap-highlight-color: transparent;
}

.swal2-show {
  animation: $swal2-show-animation;

  &.swal2-noanimation {
    animation: none;
  }
}

.swal2-hide {
  animation: $swal2-hide-animation;

  &.swal2-noanimation {
    animation: none;
  }
}

// Success icon animation
.swal2-animate-success-icon {
  .swal2-success-line-tip {
    animation: $swal2-success-line-tip-animation;
  }

  .swal2-success-line-long {
    animation: $swal2-success-line-long-animation;
  }
  .swal2-success-circular-line-right {
    animation: $swal2-success-circular-line-animation;
  }
}

// Error icon animation
.swal2-animate-error-icon {
  animation: $swal2-error-icon-animation;

  .swal2-x-mark {
    animation: $swal2-error-x-mark-animation;
  }
}

@keyframes swal2-rotate-loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
// Appearance animation
@keyframes swal2-show {
  0% {
    transform: scale(.7);
  }

  45% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(.95);
  }

  100% {
    transform: scale(1);
  }
}

// Disppearance animation
@keyframes swal2-hide {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    transform: scale(.5);
    opacity: 0;
  }
}

// Success icon animations
@keyframes swal2-animate-success-line-tip {
  0% {
    top: 1.1875em;
    left: .0625em;
    width: 0;
  }

  54% {
    top: 1.0625em;
    left: .125em;
    width: 0;
  }

  70% {
    top: 2.1875em;
    left: -.375em;
    width: 3.125em;
  }

  84% {
    top: 3em;
    left: 1.3125em;
    width: 1.0625em;
  }

  100% {
    top: 2.8125em;
    left: .875em;
    width: 1.5625em;
  }
}
@keyframes swal2-animate-success-line-long {
  0% {
    top: 3.375em;
    right: 2.875em;
    width: 0;
  }

  65% {
    top: 3.375em;
    right: 2.875em;
    width: 0;
  }

  84% {
    top: 2.1875em;
    right: 0;
    width: 3.4375em;
  }

  100% {
    top: 2.375em;
    right: .5em;
    width: 2.9375em;
  }
}
@keyframes swal2-rotate-success-circular-line {
  0% {
    transform: rotate(-45deg);
  }

  5% {
    transform: rotate(-45deg);
  }

  12% {
    transform: rotate(-405deg);
  }

  100% {
    transform: rotate(-405deg);
  }
}

// Error icon animations
@keyframes swal2-animate-error-x-mark {
  0% {
    margin-top: 1.625em;
    transform: scale(.4);
    opacity: 0;
  }

  50% {
    margin-top: 1.625em;
    transform: scale(.4);
    opacity: 0;
  }

  80% {
    margin-top: -.375em;
    transform: scale(1.15);
  }

  100% {
    margin-top: 0;
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes swal2-animate-error-icon {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}
</style>
