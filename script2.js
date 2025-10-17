
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('active');
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        function submitForm() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                const formContent = document.getElementById('contactFormContent');
                formContent.innerHTML = `
                    <div class="success-message">
                        <p>Thank you for your enquiry</p>
                        <p>Our team will respond within 24 hours</p>
                    </div>
                `;

                // Reset form after 3 seconds
                setTimeout(() => {
                    formContent.innerHTML = `
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label>Organization</label>
                            <input type="text" id="organization">
                        </div>
                        <div class="form-group">
                            <label>Email *</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" id="phone">
                        </div>
                        <div class="form-group">
                            <label>Message *</label>
                            <textarea id="message" required></textarea>
                        </div>
                        <button class="btn-submit" onclick="submitForm