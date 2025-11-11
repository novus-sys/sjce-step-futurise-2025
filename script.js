// Supabase Configuration
const SUPABASE_URL = 'https://vqsnntlugkbdllzifuoc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxc25udGx1Z2tiZGxsemlmdW9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3NjIwOTUsImV4cCI6MjA3ODMzODA5NX0.LLG9M5AaFK8-Y7N9TNDxW8HWuPE2bTmYxmay0X4TSpw';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Form handling and interactions
document.addEventListener('DOMContentLoaded', function() {

    // Form submission handling
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span>Submitting...</span>';
            
            try {
                // Get form data
                const formData = new FormData(this);
                const data = {
                    name: formData.get('name').trim(),
                    email: formData.get('email').trim(),
                    phone: formData.get('phone').trim(),
                    category: formData.get('category')
                };

                // Validate data
                if (!data.name || !data.email || !data.phone || !data.category) {
                    throw new Error('Please fill in all required fields');
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Validate phone format (basic validation)
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
                    throw new Error('Please enter a valid phone number');
                }

                // Submit to Supabase
                const { error } = await supabase
                    .from('contact_submissions')
                    .insert([data]);

                if (error) {
                    console.error('Supabase error:', error);
                    throw new Error('Failed to submit registration. Please try again.');
                }

                // Show success message
                registrationForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Add success animation
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    successMessage.style.transition = 'all 0.5s ease';
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 100);

                // Track successful submission (you can add analytics here)
                console.log('Registration successful for:', data.email);

            } catch (error) {
                console.error('Form submission error:', error);
                alert(error.message || 'An error occurred. Please try again.');
                
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }


    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.form-container, .logo-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add particle effect to hero section (optional enhancement)
    createParticleEffect();
});

// Particle effect function
function createParticleEffect() {
    const mainContainer = document.querySelector('.main-container');
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    
    mainContainer.appendChild(particleContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Error handling for Supabase connection
window.addEventListener('error', function(e) {
    if (e.message.includes('supabase')) {
        console.error('Supabase connection error:', e);
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error styling on input
            this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
        case 'email':
            isValid = validateEmail(value);
            errorMessage = 'Please enter a valid email address';
            break;
        case 'tel':
            isValid = validatePhone(value);
            errorMessage = 'Please enter a valid phone number';
            break;
        default:
            isValid = value.length > 0;
            errorMessage = 'This field is required';
    }

    if (!isValid && value.length > 0) {
        field.style.borderColor = '#ef4444';
        showFieldError(field, errorMessage);
    } else {
        field.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        hideFieldError(field);
    }

    return isValid;
}

function showFieldError(field, message) {
    hideFieldError(field); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}
