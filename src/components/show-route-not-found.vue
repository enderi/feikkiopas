<template>
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Reittiä ei löytynyt välille {{route.from}} - {{route.to}}!</strong>
    </div>
</template>

<script>
    export default {
        name: 'show-route-not-found',
        props: ['route']
    }
</script>