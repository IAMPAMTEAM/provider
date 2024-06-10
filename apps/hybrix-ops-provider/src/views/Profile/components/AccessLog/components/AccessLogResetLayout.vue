<template>
  <div class="log-reset-layout-wrapper">
    <div class="log-reset-layout-container">
      <h-button label="Unlock" figure="outlined" color="primary" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.log-reset-layout {
  &-wrapper {
    display: flex;
    justify-content: end;
    margin-top: 2rem;
    font-size: 1.4rem;
  }
  &-container {
    display: flex;
    justify-content: end;
    align-items: center;
    & span {
      margin: 0 var(--gap-sm-1);
    }
  }
}
</style>
