<script setup lang="ts">
import Sidebar from '../../components/dashboard/sidebar.vue'
</script>

<template>
    <div class="dashboard-container">
        <Sidebar />

        <div class="content">
            <div class="dashboard">
                <div class="header">
                    <h1>Dashboard</h1>
                </div>

                <div class="cards">
                    <div class="card">
                        <span>Total Invoices</span>
                        <span>293</span>
                    </div>
                    <div class="card revenue">
                        <span>Total Revenue</span>
                        <span>$4,329.03</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    width: 100%;

    .header {
        margin: 0 0 20px 0;

        h1 {
            margin: 0;
            padding: 0;
            font-size: var(--font-size-header);
            font-weight: var(--font-weight-500);
        }
    }

    .cards {
        display: flex;
        justify-content: space-between;
        gap: 24px;

        .card {
            flex: 1 0 auto;
            padding: 12px 14px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: var(--box-shadow-container);
            box-sizing: border-box;

            span:first-child {
                display: block;
                color: #555;
                font-size: var(--font-size-card-header);
                font-weight: 300;
                /* text-transform: uppercase; */
            }

            span:last-child {
                display: block;
                margin: 6px 0 0 0;
                font-size: var(--font-size-card-value);
                font-weight: var(--font-weight-600);
            }
        }

        .revenue {
            span:last-child {
                color: #61a839;
            }
        }
    }
}
</style>