<template>
    <div class="page">
        <div class="section section--cookies">
            <div class="container">
                <h1>Wie verwenden wir Cookies?</h1>
                <table align="left" class="table-responsive" style="width:100%">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Service</th>
                        <th scope="col">Purpose</th>
                        <th scope="col">Cookie type and duration</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td data-th="Name">__stripe_mid</td>
                        <td data-th="Service"></td>
                        <td data-th="Purpose"></td>
                        <td data-th="Cookie type and duration"></td>
                    </tr>
                    <tr>
                        <td data-th="Name">__stripe_sid</td>
                        <td data-th="Service"></td>
                        <td data-th="Purpose"></td>
                        <td data-th="Cookie type and duration"></td>
                    </tr>
                    </tbody>
                </table>
                <div class="button-block">
                    <a
                            href="https://cookiesandyou.com/"
                            class="link link--button link--button-mobile-large link--button-gradient"
                            target="_blank">
                        Was sind Cookies?
                    </a>
                </div>

            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .section{
        &--cookies{

            @include tablet-big {
                padding-top: 51px;
                padding-bottom: 51px;
            }
        }
    }
    .table-responsive {
        width: 100%;
        border: none;
        border-collapse: collapse;
        font-size: 1rem;
        margin: 1rem 0;
        table-layout: fixed;
        float: none;
    }

    .table-responsive th {
        font-weight: 400;
        font-size: 19px;
        font-family: "TheAntiquaB", sans-serif;
        line-height: 1.33;
        color: #247ee5;
    }

    .table-responsive{
        td,
        th {
            display: table-cell;
            padding: .75rem 1rem;
            vertical-align: middle;

            p {
                margin: 0
            }
        }
        td{
            font-family: "TheSansB", sans-serif;
            font-size: 18px;
            line-height: 1.55;
            color: #7a7d84;
            font-weight: 400;
        }
    }



    @include tablet-max{
        .table-responsive{

            thead {
                display: none;
            }
            tr {
                border-bottom: 1px solid #9f9f9f;

                &:nth-of-type(2n) {
                    background-color: inherit;
                }
            }
            td {
                display: block;
                padding: .5rem;
                position: relative;

                &[data-th-group] {
                    margin-top: 2rem;
                }
                &:before {
                    content: attr(data-th);
                    display: block;
                    font-weight: 400;
                    font-size: 19px;
                    font-family: "TheAntiquaB", sans-serif;
                    line-height: 1.33;
                    color: #247ee5;

                }
                &.table-responsive__heading {
                    background-color: #404040;
                    color: #fff;
                    font-weight: 600;
                }
                &.table-responsive__group_label {
                    font-size: .875rem;
                    padding-left: 1.5rem;

                    &:after {
                        content: attr(data-th-group);
                        display: block;
                        font-size: 1.25rem;
                        font-weight: 600;
                        left: .5rem;
                        position: absolute;
                        top: -1.7rem
                    }
                    &~.table-responsive__group_element {
                        font-size: .875rem;
                        margin: 0;
                        padding-left: 1.5rem;
                    }
                }
            }
        }
    }
    .button-block{
        text-align: center;
    }
    @include tablet{
        .table-responsive{
            thead {
                display: table-header-group;

                tr{
                    &:first-child{
                        th {
                            border-bottom: 1px solid #404040;
                            vertical-align: top;
                        }
                    }
                    &:last-child:not(:first-child) {
                        border-bottom: 3px solid #404040;
                    }
                    &:nth-of-type(2n) {
                        background-color: #f5f5f5;
                    }
                }
            }
        }
        .button-block{
             margin-top: 48px;
        }
    }


</style>