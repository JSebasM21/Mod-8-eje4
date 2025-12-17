// Elementos del formulario
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const age = document.getElementById('age');
const phone = document.getElementById('phone');
const terms = document.getElementById('terms');
const newsletter = document.getElementById('newsletter');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const formSummary = document.getElementById('formSummary');
const closeSummary = document.getElementById('closeSummary');
const progressFill = document.getElementById('progressFill');

// Elementos de requisitos de contraseña
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

// Contadores y visibilidad
const usernameCounter = document.getElementById('usernameCounter');
const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const passwordStrength = document.getElementById('passwordStrength');
const strengthLabel = document.getElementById('strengthLabel');

// Elementos del resumen
const summaryUsername = document.getElementById('summaryUsername');
const summaryEmail = document.getElementById('summaryEmail');
const summaryAge = document.getElementById('summaryAge');
const summaryPhone = document.getElementById('summaryPhone');
const summaryNewsletter = document.getElementById('summaryNewsletter');

// Crear partículas de fondo
createParticles();

/**
 * Crear partículas animadas en el fondo
 */
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición inicial aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animación
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        particle.style.animation = `particleFloat ${duration}s linear ${delay}s infinite`;
        
        // Opacidad aleatoria
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Actualizar contador de caracteres del username
 */
function updateUsernameCounter() {
    const length = username.value.length;
    const maxLength = 20;
    usernameCounter.textContent = `${length}/${maxLength}`;
    
    // Cambiar color según el porcentaje
    const percentage = (length / maxLength) * 100;
    if (percentage > 90) {
        usernameCounter.style.color = '#ff7675';
    } else if (percentage > 70) {
        usernameCounter.style.color = '#fdcb6e';
    } else {
        usernameCounter.style.color = '#636e72';
    }
}

/**
 * Validar un campo individual
 */
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    const successIcon = formGroup.querySelector('.success-icon');
    
    let isValid = true;
    let message = '';
    
    // Validaciones según el campo
    switch(field.id) {
        case 'username':
            updateUsernameCounter();
            if (value.length === 0) {
                message = 'El nombre de usuario es obligatorio';
                isValid = false;
            } else if (value.length < 3) {
                message = 'El nombre debe tener al menos 3 caracteres';
                isValid = false;
            } else if (value.length > 20) {
                message = 'El nombre no puede exceder 20 caracteres';
                isValid = false;
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                message = 'Solo letras, números y guiones bajos';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value.length === 0) {
                message = 'El correo electrónico es obligatorio';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                message = 'Ingresa un correo electrónico válido';
                isValid = false;
            }
            break;
            
        case 'password':
            if (value.length === 0) {
                message = 'La contraseña es obligatoria';
                isValid = false;
            } else if (value.length < 8) {
                message = 'La contraseña debe tener al menos 8 caracteres';
                isValid = false;
            } else if (!/[A-Z]/.test(value)) {
                message = 'Debe contener al menos una mayúscula';
                isValid = false;
            } else if (!/[0-9]/.test(value)) {
                message = 'Debe contener al menos un número';
                isValid = false;
            } else if (!/[@$!%*?&]/.test(value)) {
                message = 'Debe contener al menos un carácter especial (@$!%*?&)';
                isValid = false;
            }
            
            // Actualizar requisitos visuales y fuerza
            updatePasswordRequirements(value);
            updatePasswordStrength(value);
            break;
            
        case 'confirmPassword':
            if (value.length === 0) {
                message = 'Confirma tu contraseña';
                isValid = false;
            } else if (value !== password.value) {
                message = 'Las contraseñas no coinciden';
                isValid = false;
            }
            break;
            
        case 'age':
            const ageValue = parseInt(value);
            if (value.length === 0) {
                message = 'La edad es obligatoria';
                isValid = false;
            } else if (isNaN(ageValue) || ageValue < 18) {
                message = 'Debes ser mayor de 18 años';
                isValid = false;
            } else if (ageValue > 120) {
                message = 'Ingresa una edad válida';
                isValid = false;
            }
            break;
            
        case 'phone':
            // Validación opcional de teléfono
            if (value.length > 0 && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                message = 'Formato de teléfono inválido';
                isValid = false;
            }
            break;
    }
    
    // Aplicar clases y mostrar/ocultar mensajes
    if (isValid) {
        formGroup.classList.remove('error');
        formGroup.classList.add('valid');
        field.classList.remove('invalid');
        field.classList.add('valid');
        errorMessage.textContent = '';
        if (successIcon) successIcon.style.display = 'block';
    } else {
        formGroup.classList.remove('valid');
        formGroup.classList.add('error');
        field.classList.remove('valid');
        field.classList.add('invalid');
        errorMessage.textContent = message;
        if (successIcon) successIcon.style.display = 'none';
    }
    
    // Actualizar progreso
    updateProgress();
    
    return isValid;
}

/**
 * Actualizar indicadores visuales de requisitos de contraseña
 */
function updatePasswordRequirements(passwordValue) {
    // Longitud
    if (passwordValue.length >= 8) {
        reqLength.classList.add('met');
        reqLength.querySelector('.req-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
        reqLength.classList.remove('met');
        reqLength.querySelector('.req-icon').innerHTML = '<i class="far fa-circle"></i>';
    }
    
    // Mayúscula
    if (/[A-Z]/.test(passwordValue)) {
        reqUppercase.classList.add('met');
        reqUppercase.querySelector('.req-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
        reqUppercase.classList.remove('met');
        reqUppercase.querySelector('.req-icon').innerHTML = '<i class="far fa-circle"></i>';
    }
    
    // Número
    if (/[0-9]/.test(passwordValue)) {
        reqNumber.classList.add('met');
        reqNumber.querySelector('.req-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
        reqNumber.classList.remove('met');
        reqNumber.querySelector('.req-icon').innerHTML = '<i class="far fa-circle"></i>';
    }
    
    // Carácter especial
    if (/[@$!%*?&]/.test(passwordValue)) {
        reqSpecial.classList.add('met');
        reqSpecial.querySelector('.req-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
    } else {
        reqSpecial.classList.remove('met');
        reqSpecial.querySelector('.req-icon').innerHTML = '<i class="far fa-circle"></i>';
    }
}

/**
 * Calcular y mostrar fuerza de la contraseña
 */
function updatePasswordStrength(passwordValue) {
    let strength = 0;
    
    // Longitud
    if (passwordValue.length >= 8) strength += 25;
    if (passwordValue.length >= 12) strength += 10;
    
    // Complejidad
    if (/[A-Z]/.test(passwordValue)) strength += 20;
    if (/[0-9]/.test(passwordValue)) strength += 20;
    if (/[@$!%*?&]/.test(passwordValue)) strength += 25;
    
    // Limitar a 100%
    strength = Math.min(strength, 100);
    
    // Actualizar barra de progreso
    passwordStrength.style.width = `${strength}%`;
    
    // Actualizar etiqueta
    let label = 'Débil';
    let color = '#ff7675';
    
    if (strength >= 60) {
        label = 'Media';
        color = '#fdcb6e';
    }
    
    if (strength >= 80) {
        label = 'Fuerte';
        color = '#00b894';
    }
    
    if (strength >= 95) {
        label = 'Muy fuerte';
        color = '#00b894';
    }
    
    passwordStrength.style.background = color;
    strengthLabel.querySelector('span').textContent = label;
    strengthLabel.querySelector('span').style.color = color;
}

/**
 * Validar checkbox de términos
 */
function validateTerms() {
    const formGroup = terms.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (terms.checked) {
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
        return true;
    } else {
        formGroup.classList.add('error');
        errorMessage.textContent = 'Debes aceptar los términos y condiciones';
        return false;
    }
}

/**
 * Actualizar barra de progreso del formulario
 */
function updateProgress() {
    const fields = [username, email, password, confirmPassword, age, terms];
    let validCount = 0;
    
    fields.forEach(field => {
        if (field.type === 'checkbox') {
            if (field.checked) validCount++;
        } else {
            if (field.classList.contains('valid')) validCount++;
        }
    });
    
    const progress = (validCount / fields.length) * 100;
    progressFill.style.width = `${progress}%`;
}

/**
 * Verificar si el formulario completo es válido
 */
function checkFormValidity() {
    const isUsernameValid = username.classList.contains('valid');
    const isEmailValid = email.classList.contains('valid');
    const isPasswordValid = password.classList.contains('valid');
    const isConfirmValid = confirmPassword.classList.contains('valid');
    const isAgeValid = age.classList.contains('valid');
    const areTermsChecked = terms.checked;
    
    const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && 
                        isConfirmValid && isAgeValid && areTermsChecked;
    
    // Habilitar/deshabilitar botón de envío
    submitBtn.disabled = !isFormValid;
    
    return isFormValid;
}

/**
 * Alternar visibilidad de contraseña
 */
function togglePasswordVisibility(passwordField, toggleButton) {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    // Cambiar icono
    const icon = toggleButton.querySelector('i');
    if (type === 'text') {
        icon.className = 'fas fa-eye-slash';
    } else {
        icon.className = 'fas fa-eye';
    }
}

/**
 * Mostrar resumen del formulario
 */
function showSummary() {
    // Actualizar datos del resumen
    summaryUsername.textContent = username.value;
    summaryEmail.textContent = email.value;
    summaryAge.textContent = age.value;
    summaryPhone.textContent = phone.value || 'No proporcionado';
    summaryNewsletter.textContent = newsletter.checked ? 'Sí' : 'No';
    
    // Mostrar resumen
    formSummary.classList.add('show');
}

/**
 * Reiniciar formulario
 */
function resetForm() {
    form.reset();
    
    // Resetear estilos
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('valid', 'error');
    });
    
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    
    // Resetear contadores
    updateUsernameCounter();
    updatePasswordRequirements('');
    updatePasswordStrength('');
    
    // Resetear botón
    submitBtn.disabled = true;
    submitBtn.classList.remove('loading');
    
    // Resetear progreso
    progressFill.style.width = '0%';
    
    // Ocultar resumen si está visible
    formSummary.classList.remove('show');
}

// =====================================
// EVENT LISTENERS
// =====================================

// Event listeners para validación en tiempo real
username.addEventListener('input', () => {
    validateField(username);
    checkFormValidity();
});

email.addEventListener('input', () => {
    validateField(email);
    checkFormValidity();
});

password.addEventListener('input', () => {
    validateField(password);
    // Revalidar confirmación si existe
    if (confirmPassword.value) {
        validateField(confirmPassword);
    }
    checkFormValidity();
});

confirmPassword.addEventListener('input', () => {
    validateField(confirmPassword);
    checkFormValidity();
});

age.addEventListener('input', () => {
    validateField(age);
    checkFormValidity();
});

phone.addEventListener('input', () => {
    validateField(phone);
});

// Event listeners para blur (al salir del campo)
[username, email, password, confirmPassword, age, phone].forEach(field => {
    field.addEventListener('blur', () => validateField(field));
});

// Event listeners para checkboxes
terms.addEventListener('change', () => {
    validateTerms();
    checkFormValidity();
});

newsletter.addEventListener('change', () => {
    // Solo actualizar validación del formulario
    checkFormValidity();
});

// Event listeners para alternar visibilidad de contraseñas
togglePassword.addEventListener('click', () => {
    togglePasswordVisibility(password, togglePassword);
});

toggleConfirmPassword.addEventListener('click', () => {
    togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
});

// Event listener para el botón de reinicio
resetBtn.addEventListener('click', resetForm);

// Event listener para cerrar el resumen
closeSummary.addEventListener('click', () => {
    formSummary.classList.remove('show');
    resetForm();
});

// Cerrar resumen haciendo clic fuera
formSummary.addEventListener('click', (e) => {
    if (e.target === formSummary) {
        formSummary.classList.remove('show');
    }
});

// Manejo del envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validar todos los campos una vez más
    const isUsernameValid = validateField(username);
    const isEmailValid = validateField(email);
    const isPasswordValid = validateField(password);
    const isConfirmValid = validateField(confirmPassword);
    const isAgeValid = validateField(age);
    const isPhoneValid = validateField(phone);
    const areTermsValid = validateTerms();
    
    if (isUsernameValid && isEmailValid && isPasswordValid && 
        isConfirmValid && isAgeValid && isPhoneValid && areTermsValid) {
        
        // Mostrar estado de carga
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simular envío al servidor
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mostrar resumen
        showSummary();
        
        console.log('Formulario enviado:', {
            username: username.value,
            email: email.value,
            age: age.value,
            phone: phone.value,
            newsletter: newsletter.checked
        });
        
        // Restaurar botón
        submitBtn.classList.remove('loading');
    }
});

// Inicializar contador de username
updateUsernameCounter();

// Inicializar requisitos de contraseña
updatePasswordRequirements('');
updatePasswordStrength('');