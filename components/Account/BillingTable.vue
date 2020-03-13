<template>
    <div class = "table">

        <div class = "table__content">
            <div class = "table__header">
                <div class = "table__header-item table__header-item_id">Transaction<br class = "table__br"> ID</div>
                <div class = "table__header-item">Date</div>
                <div class = "table__header-item">Enquiry<br class = "table__br"> ID</div>
                <div class = "table__header-item table__header-item_enquiry-date">Patient's<br class = "table__br"> full name</div>
                <div class = "table__header-item table__header-item_last-contact">Amount</div>
                <div class = "table__header-item table__header-item_status">Status</div>
            </div>
            <div class = "table__main table__main-items">
                    <div class = "table__main-item" data-title="Transaction ID">1</div>
                    <div class = "table__main-item" data-title="Date">dd/mm/yyyy hh:mm</div>
                    <div class = "table__main-item" data-title="Enquiry ID">1</div>
                    <div class = "table__main-item" data-title="Patient's full name">FirstName LastName</div>
                    <div class = "table__main-item" data-title="Amount">EUR xx.xx</div>
                    <div class = "table__main-item" data-title="Status">Completed / Refunded</div>
            </div>
            <div class = "table__main-items">
                <div class = "table__main-item" data-title="Transaction ID">1</div>
                <div class = "table__main-item" data-title="Date">dd/mm/yyyy hh:mm</div>
                <div class = "table__main-item" data-title="Enquiry ID">1</div>
                <div class = "table__main-item" data-title="Patient's full name">FirstName LastName</div>
                <div class = "table__main-item" data-title="Amount">EUR xx.xx</div>
                <div class = "table__main-item" data-title="Status">Completed / Refunded</div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>

    .table{
        margin-top: 30px;

        &__main-items{
            cursor: default;
        }
        @include tablet {
            margin-top: 90px;
        }
    }
</style>

