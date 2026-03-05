<template>
  <div class="dashboard-layout">
    <!-- ========== SIDEBAR ========== -->
    <aside class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-brand">
        <span class="brand-icon">📊</span>
        <span class="brand-text" v-show="!sidebarCollapsed">Dashboard</span>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.id"
          :to="item.to"
          class="nav-item"
          :class="{ active: $route.path === item.to }"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-show="!sidebarCollapsed">{{ item.label }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer" v-show="!sidebarCollapsed">
        <div class="user-badge">
          <div class="avatar">U</div>
          <div class="user-info">
            <span class="user-name">Vue Learner</span>
            <span class="user-role">Developer</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- ========== MAIN ========== -->
    <div class="main-wrapper">
      <!-- Header -->
      <header class="top-header">
        <button class="toggle-btn" @click="sidebarCollapsed = !sidebarCollapsed">
          {{ sidebarCollapsed ? '☰' : '✕' }}
        </button>

        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
          <p class="breadcrumb">Home / {{ pageTitle }}</p>
        </div>

        <div class="header-right">
          <slot name="header-actions"></slot>
        </div>
      </header>

      <!-- Page content via router -->
      <main class="content">
        <RouterView />
      </main>

      <!-- Footer -->
      <footer class="main-footer">
        <span>Vue Dashboard &copy; 2026</span>
        <span class="footer-dot">·</span>
        <span>Built with Vue 3 + Chart.js</span>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sidebarCollapsed: false,
      navItems: [
        { id: "dashboard", icon: "📊", label: "Dashboard", to: "/" },
        { id: "users",     icon: "👥", label: "Users",     to: "/" },
        { id: "charts",    icon: "📈", label: "Analytics",  to: "/" },
        { id: "settings",  icon: "⚙️", label: "Settings",  to: "/" },
      ],
    };
  },
  computed: {
    pageTitle() {
      return this.$route?.meta?.title || this.$route?.name || "Dashboard";
    },
  },
};
</script>

<style scoped>
/* ========== LAYOUT ========== */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

/* ========== SIDEBAR ========== */
.sidebar {
  width: var(--sidebar-width);
  background: var(--color-sidebar);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.sidebar.collapsed {
  width: 68px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 28px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.brand-icon { font-size: 1.6rem; }
.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  color: rgba(255,255,255,0.65);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
  white-space: nowrap;
  text-decoration: none;
}
.nav-item:hover {
  background: var(--color-sidebar-hover);
  color: #fff;
}
.nav-item.active,
.nav-item.router-link-active {
  background: var(--color-primary);
  color: #fff;
  box-shadow: 0 2px 8px rgba(67, 97, 238, 0.35);
}
.nav-icon { font-size: 1.15rem; min-width: 24px; text-align: center; }

.sidebar-footer {
  padding: 16px 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.user-badge {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}
.user-info { display: flex; flex-direction: column; }
.user-name { font-size: 0.85rem; font-weight: 600; }
.user-role { font-size: 0.75rem; color: rgba(255,255,255,0.5); }

/* ========== MAIN WRAPPER ========== */
.main-wrapper {
  flex: 1;
  margin-left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar.collapsed ~ .main-wrapper {
  margin-left: 68px;
}

/* ========== HEADER ========== */
.top-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 32px;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 50;
}
.toggle-btn {
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}
.header-left { flex: 1; }
.header-left h1 { margin: 0; font-size: 1.4rem; }
.breadcrumb { margin: 2px 0 0; font-size: 0.8rem; color: var(--color-text-secondary); }

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* ========== CONTENT ========== */
.content {
  flex: 1;
  padding: 28px 32px;
}

/* ========== FOOTER ========== */
.main-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 32px;
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
}
.footer-dot { opacity: 0.4; }

/* ========== RESPONSIVE ========== */
@media (max-width: 900px) {
  .sidebar { display: none; }
  .main-wrapper { margin-left: 0 !important; }
  .content { padding: 20px 16px; }
  .top-header { padding: 12px 16px; }
  .toggle-btn { display: none; }
}
</style>
