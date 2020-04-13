<template>
    <div>
        Reittiä ei löytynyt välille {{route.from}} {{route.to}}
    </div>
</template>

<script>
    export default {
        name: 'show-route-not-found',
        props: ['route']
    }
</script>