<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; 2024 Vue Todo App. All rights reserved.</p>
      <ul class="social-links">
        <li><a href="#facebook">Facebook</a></li>
        <li><a href="#twitter">Twitter</a></li>
        <li><a href="#linkedin">LinkedIn</a></li>
      </ul>
    </div>
  </footer>
</template>

<script>
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.social-links {
  list-style: none;
  padding: 0;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.social-links li {
  margin-left: 15px;
}

.social-links a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}

.social-links a:hover {
  text-decoration: underline;
}
</style>
