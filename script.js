// ESPERAR A QUE TODO EL DOM ESTÉ CARGADO
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicación iniciada');

    // ELEMENTOS DEL DOM
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
    const progressFill = document.getElementById('progressFill');
    
    // Modal
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const summaryUsername = document.getElementById('summaryUsername');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryAge = document.getElementById('summaryAge');
    const summaryPhone = document.getElementById('summaryPhone');
    const summaryNewsletter = document.getElementById('summaryNewsletter');
    
    // Contraseña
    const reqLength = document.getElementById('req-length');
    const reqUppercase = document.getElementById('req-uppercase');
    const reqNumber = document.getElementById('req-number');
    const reqSpecial = document.getElementById('req-special');
    const usernameCounter = document.getElementById('usernameCounter');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthLabel = document.getElementById('strengthLabel');

    // Verificar elementos
    if (!modalOverlay || !summaryUsername) {
        console.error('❌ Error: Elementos del modal no encontrados');
        return;
    }

    // CREAR PARTÍCULAS
    createParticles();

    function createParticles() {
        const container = document.createElement('div');
        container.className = 'particles';
        document.body.appendChild(container);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 25 + 10;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.opacity = Math.random() * 0.4 + 0.1;
            container.appendChild(particle);
        }
    }

    // CONTADOR DE CARACTERES
    function updateUsernameCounter() {
        const len = username.value.length;
        usernameCounter.textContent = len + '/20';
        if (len > 18) usernameCounter.style.color = '#ff7675';
        else if (len > 15) usernameCounter.style.color = '#fdcb6e';
        else usernameCounter.style.color = '#636e72';
    }

    // VALIDAR CAMPO
    function validateField(field) {
        const value = field.value.trim();
        const group = field.closest('.form-group');
        const error = group.querySelector('.error-message');
        const success = group.querySelector('.success-icon');
        let isValid = true;
        let msg = '';

        switch(field.id) {
            case 'username':
                updateUsernameCounter();
                if (!value) {
                    msg = 'El nombre de usuario es obligatorio';
                    isValid = false;
                } else if (value.length < 3) {
                    msg = 'Mínimo 3 caracteres';
                    isValid = false;
                } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                    msg = 'Solo letras, números y guiones bajos';
                    isValid = false;
                }
                break;

            case 'email':
                if (!value) {
                    msg = 'El correo es obligatorio';
                    isValid = false;
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    msg = 'Correo inválido';
                    isValid = false;
                }
                break;

            case 'password':
                if (!value) {
                    msg = 'La contraseña es obligatoria';
                    isValid = false;
                } else if (value.length < 8) {
                    msg = 'Mínimo 8 caracteres';
                    isValid = false;
                } else if (!/[A-Z]/.test(value)) {
                    msg = 'Falta una mayúscula';
                    isValid = false;
                } else if (!/[0-9]/.test(value)) {
                    msg = 'Falta un número';
                    isValid = false;
                } else if (!/[@$!%*?&]/.test(value)) {
                    msg = 'Falta un carácter especial';
                    isValid = false;
                }
                updatePasswordRequirements(value);
                updatePasswordStrength(value);
                break;

            case 'confirmPassword':
                if (!value) {
                    msg = 'Confirma tu contraseña';
                    isValid = false;
                } else if (value !== password.value) {
                    msg = 'Las contraseñas no coinciden';
                    isValid = false;
                }
                break;

            case 'age':
                const clean = value.replace(/[^\d]/g, '');
                if (clean !== value) field.value = clean;
                const ageNum = parseInt(clean);
                if (!clean) {
                    msg = 'La edad es obligatoria';
                    isValid = false;
                } else if (ageNum < 18) {
                    msg = 'Debes ser mayor de 18';
                    isValid = false;
                } else if (ageNum > 120) {
                    msg = 'Edad inválida';
                    isValid = false;
                }
                break;

            case 'phone':
                if (value && !/^[\d\s\-\+\(\)]+$/.test(value)) {
                    msg = 'Formato inválido';
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            group.classList.remove('error');
            group.classList.add('valid');
            field.classList.remove('invalid');
            field.classList.add('valid');
            if (error) error.textContent = '';
            if (success) success.style.display = 'block';
        } else {
            group.classList.remove('valid');
            group.classList.add('error');
            field.classList.remove('valid');
            field.classList.add('invalid');
            if (error) error.textContent = msg;
            if (success) success.style.display = 'none';
        }

        updateProgress();
        return isValid;
    }

    // REQUISITOS DE CONTRASEÑA
    function updatePasswordRequirements(pass) {
        updateReq(reqLength, pass.length >= 8);
        updateReq(reqUppercase, /[A-Z]/.test(pass));
        updateReq(reqNumber, /[0-9]/.test(pass));
        updateReq(reqSpecial, /[@$!%*?&]/.test(pass));
    }

    function updateReq(el, met) {
        if (met) {
            el.classList.add('met');
            el.querySelector('.req-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
        } else {
            el.classList.remove('met');
            el.querySelector('.req-icon').innerHTML = '<i class="far fa-circle"></i>';
        }
    }

    // FUERZA DE CONTRASEÑA
    function updatePasswordStrength(pass) {
        let strength = 0;
        if (pass.length >= 8) strength += 25;
        if (pass.length >= 12) strength += 10;
        if (/[A-Z]/.test(pass)) strength += 20;
        if (/[0-9]/.test(pass)) strength += 20;
        if (/[@$!%*?&]/.test(pass)) strength += 25;
        
        strength = Math.min(strength, 100);
        passwordStrength.style.width = strength + '%';
        
        let label = 'Débil';
        let color = '#ff7675';
        if (strength >= 60) { label = 'Media'; color = '#fdcb6e'; }
        if (strength >= 80) { label = 'Fuerte'; color = '#00b894'; }
        if (strength >= 95) { label = 'Muy fuerte'; color = '#00b894'; }
        
        passwordStrength.style.background = color;
        strengthLabel.querySelector('span').textContent = label;
        strengthLabel.querySelector('span').style.color = color;
    }

    // VALIDAR TÉRMINOS
    function validateTerms() {
        const group = terms.closest('.form-group');
        const error = group.querySelector('.error-message');
        if (terms.checked) {
            group.classList.remove('error');
            error.textContent = '';
            return true;
        } else {
            group.classList.add('error');
            error.textContent = 'Debes aceptar los términos';
            return false;
        }
    }

    // PROGRESO
    function updateProgress() {
        const fields = [username, email, password, confirmPassword, age, terms];
        let valid = 0;
        fields.forEach(f => {
            if (f.type === 'checkbox') {
                if (f.checked) valid++;
            } else {
                if (f.classList.contains('valid')) valid++;
            }
        });
        progressFill.style.width = (valid / fields.length * 100) + '%';
    }

    // VALIDAR FORMULARIO
    function checkFormValidity() {
        const valid = username.classList.contains('valid') &&
                     email.classList.contains('valid') &&
                     password.classList.contains('valid') &&
                     confirmPassword.classList.contains('valid') &&
                     age.classList.contains('valid') &&
                     terms.checked;
        submitBtn.disabled = !valid;
        return valid;
    }

    // TOGGLE PASSWORD
    function togglePass(field, btn) {
        const type = field.type === 'password' ? 'text' : 'password';
        field.type = type;
        btn.querySelector('i').className = type === 'text' ? 'fas fa-eye-slash' : 'fas fa-eye';
    }

    // MOSTRAR MODAL
    function showModal() {
        console.log('✅ Mostrando modal');
        summaryUsername.textContent = username.value;
        summaryEmail.textContent = email.value;
        summaryAge.textContent = age.value;
        summaryPhone.textContent = phone.value || 'No proporcionado';
        summaryNewsletter.textContent = newsletter.checked ? 'Sí' : 'No';
        document.body.style.overflow = 'hidden';
        modalOverlay.classList.add('show');
    }

    // OCULTAR MODAL
    function hideModal() {
        modalOverlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    // RESETEAR
    function resetForm() {
        form.reset();
        document.querySelectorAll('.form-group').forEach(g => {
            g.classList.remove('valid', 'error');
        });
        document.querySelectorAll('input').forEach(i => {
            i.classList.remove('valid', 'invalid');
        });
        document.querySelectorAll('.success-icon').forEach(s => {
            s.style.display = 'none';
        });
        updateUsernameCounter();
        updatePasswordRequirements('');
        updatePasswordStrength('');
        submitBtn.disabled = true;
        submitBtn.classList.remove('loading');
        progressFill.style.width = '0%';
    }

    // EVENT LISTENERS
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
        if (confirmPassword.value) validateField(confirmPassword);
        checkFormValidity();
    });

    confirmPassword.addEventListener('input', () => {
        validateField(confirmPassword);
        checkFormValidity();
    });

    age.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });

    age.addEventListener('input', () => {
        age.value = age.value.replace(/[^\d]/g, '');
        validateField(age);
        checkFormValidity();
    });

    phone.addEventListener('input', () => validateField(phone));

    [username, email, password, confirmPassword, age, phone].forEach(f => {
        f.addEventListener('blur', () => validateField(f));
    });

    terms.addEventListener('change', () => {
        validateTerms();
        checkFormValidity();
    });

    newsletter.addEventListener('change', checkFormValidity);

    togglePassword.addEventListener('click', () => togglePass(password, togglePassword));
    toggleConfirmPassword.addEventListener('click', () => togglePass(confirmPassword, toggleConfirmPassword));

    resetBtn.addEventListener('click', () => {
        if (confirm('¿Limpiar el formulario?')) resetForm();
    });

    closeModal.addEventListener('click', () => {
        hideModal();
        resetForm();
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
            hideModal();
        }
    });

    // SUBMIT
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('📝 Enviando formulario...');

        const v1 = validateField(username);
        const v2 = validateField(email);
        const v3 = validateField(password);
        const v4 = validateField(confirmPassword);
        const v5 = validateField(age);
        const v6 = phone.value.length === 0 || validateField(phone);
        const v7 = validateTerms();

        if (v1 && v2 && v3 && v4 && v5 && v6 && v7) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            await new Promise(r => setTimeout(r, 1500));
            
            console.log('✅ Registro exitoso');
            showModal();
            submitBtn.classList.remove('loading');
        } else {
            console.log('❌ Errores en el formulario');
            const firstError = document.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });

    // INICIALIZAR
    updateUsernameCounter();
    updatePasswordRequirements('');
    updatePasswordStrength('');
    console.log('✅ Todo listo');
});
