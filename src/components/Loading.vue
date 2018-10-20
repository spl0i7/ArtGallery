
<template>
    <div id="loading">
        <div class="dot-bricks"></div>
        <h2>{{loadingMessage}}</h2>
    </div>
</template>

<script>

export default {
    name: 'LoadingScreen',
    props : ['loadingMessage']
}
</script>