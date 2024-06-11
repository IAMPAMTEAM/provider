<template>
  <main class="main">
    <h1>rule editor container</h1>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  &-wrap {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  &-cont {
    flex: 1;
  }
}
.grid__card {
  height: 75vh;
  margin-bottom: 1rem;

  display: flex;
  position: relative;
}

.rule {
  &__add {
    display: flex;
  }
  &__header {
    flex: 1;
    display: flex;
    flex-direction: row;
    padding: 2rem 1rem;
    &__left {
      flex: 1;
    }
    &__right {
      flex: 1;
      display: flex;
      justify-content: right;
    }
  }
  &__popup {
    max-width: 1080px;
    height: 500px;
    .popup__input {
      width: 240px;
      margin-bottom: 1rem;
    }
    .popup__title {
      font-size: 2.4rem;
      font-weight: bold;
    }
    .popup__container {
      max-width: 1080px;
      padding: 1rem;
    }
  }
}
.ag-theme-alpine .ag-icon-group {
  --ag-icon-font-family: 'Material Design Icons';
  --ag-icon-font-code-group: '\F0328';
}
.management-whitelist {
  &-cont {
    position: relative;
    height: calc(100vh - 118px);
    margin: var(--gap-1);
    margin-bottom: unset;
    padding: var(--gap-sm-2);
    border-radius: 8px;
    background: var(--color-white);
    box-shadow: var(--shadow-dev-1);
  }
  &-cloak {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: var(--color-white);
  }
  &__btn-create {
    position: absolute;
    left: 16px;
    bottom: 14px;
  }
}
</style>
