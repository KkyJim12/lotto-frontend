<template>
    <div class="h-screen bg-sky-500 p-16">
        <div class="grid grid-cols-12 h-full gap-x-12">
            <div class="col-span-4">
                <AccountDetail />
            </div>
            <div class="col-span-8">
                <LottoResult />
            </div>
        </div>
    </div>
</template>

<style>
/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
    scrollbar-width: auto;
    scrollbar-color: #c8c4ca #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 16px;
}

*::-webkit-scrollbar-track {
    background: #ffffff;
}

*::-webkit-scrollbar-thumb {
    background-color: #c8c4ca;
    border-radius: 10px;
    border: 3px solid #ffffff;
}
</style>
