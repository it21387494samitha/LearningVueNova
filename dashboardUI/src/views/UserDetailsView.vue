<template>
    <div class="user-details-page">
        <div class="container">
            <h1>User Details</h1>
            
            <div v-if="loading" class="loading">
                Loading user details...
            </div>
            
            <div v-else-if="user" class="details-card">
                <div class="detail-row">
                    <label>Name:</label>
                    <span>{{ user.name }}</span>
                </div>
                <div class="detail-row">
                    <label>Email:</label>
                    <span>{{ user.email }}</span>
                </div>
                <div class="detail-row">
                    <label>Phone:</label>
                    <span>{{ user.phone }}</span>
                </div>
                <div class="detail-row">
                    <label>Role:</label>
                    <span>{{ user.role }}</span>
                </div>
                <div class="detail-row">
                    <label>Status:</label>
                    <span :class="`status-${user.status}`">{{ user.status }}</span>
                </div>
                
                <button @click="editUser" class="btn-primary">Edit User</button>
                <button @click="goBack" class="btn-secondary">Back</button>
            </div>
            
            <div v-else class="error">
                User not found
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserDetailsView',
    data() {
        return {
            user: null,
            loading: true,
        }
    },
    mounted() {
        this.fetchUserDetails();
    },
    methods: {
        fetchUserDetails() {
            // Replace with your actual API call
            setTimeout(() => {
                this.user = {
                    name: 'John Doe',
                    email: 'john@example.com',
                    phone: '+1234567890',
                    role: 'Admin',
                    status: 'Active'
                };
                this.loading = false;
            }, 500);
        },
        editUser() {
            this.$router.push('/edit-user');
        },
        goBack() {
            this.$router.back();
        }
    }
}
</script>

<style scoped>
.user-details-page {
    padding: 2rem;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.container {
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    color: #333;
    margin-bottom: 2rem;
}

.details-card {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
}

.detail-row label {
    font-weight: bold;
    color: #555;
}

.detail-row span {
    color: #333;
}

.status-Active {
    color: #28a745;
    font-weight: bold;
}

.status-Inactive {
    color: #dc3545;
    font-weight: bold;
}

.loading, .error {
    text-align: center;
    padding: 2rem;
    color: #666;
}

.btn-primary, .btn-secondary {
    margin-top: 1.5rem;
    margin-right: 1rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #5a6268;
}
</style>