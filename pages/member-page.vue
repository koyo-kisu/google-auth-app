<template>
  <member-only>
    <h1>ログインしていないと見れないページ</h1>
    <a href="/main">メインページ</a>
  </member-only>
</template>

<script>
import MemberOnly from '~/components/MemberOnly';

export default {
  components: {
    MemberOnly,
  }
}
</script>

<style>

</style>