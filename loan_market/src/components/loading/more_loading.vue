<template>
    <div class="more_loading">
        <i></i>
    </div>
</template>

<script>
    export default {
        name : 'MoreLoading'
    }
</script>

<style scoped lang="scss">
    .more_loading{
        text-align:center;
        display:inline-block;
        i{
            display:inline-block;
            width:.25rem;
            height:.25rem;
            border-top:2px solid #507DEF;
            border-radius:50%;
            animation:spinner .6s linear infinite; 
        }
    }
    @keyframes spinner{
        to{transform:rotate(360deg);
    }
}
</style>