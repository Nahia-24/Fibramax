let currentSection = 'organigrama';

// ========================================
// Función Principal: Cambiar entre secciones
// ========================================
function showSection(sectionName) {
    // Guardar la sección actual
    currentSection = sectionName;
    
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Actualizar botones activos en la navegación
    updateActiveButton(event.target);
    
    // Scroll suave al inicio de la página
    scrollToTop();
    
    // Log para debugging (opcional - puedes comentar en producción)
    console.log(`Sección cambiada a: ${sectionName}`);
}

// ========================================
// Actualizar botón activo en navegación
// ========================================
function updateActiveButton(clickedButton) {
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    if (clickedButton && clickedButton.classList) {
        clickedButton.classList.add('active');
    }
}

// ========================================
// Scroll suave al inicio
// ========================================
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// ========================================
// Inicialización cuando el DOM esté listo
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('FibraMax S.A.S. - Sistema inicializado correctamente');
    
    // Mostrar la sección inicial
    const initialSection = document.getElementById('organigrama');
    if (initialSection) {
        initialSection.classList.add('active');
    }
    
    // Marcar el primer botón como activo
    const firstButton = document.querySelector('.nav-button');
    if (firstButton) {
        firstButton.classList.add('active');
    }
    
    // Agregar event listeners a los cargos del organigrama (hover info)
    initializeOrganigramaInteractions();
    
    // Agregar animaciones de entrada
    initializeAnimations();
});

// ========================================
// Interacciones del Organigrama
// ========================================
function initializeOrganigramaInteractions() {
    const cargos = document.querySelectorAll('.cargo');
    
    cargos.forEach(cargo => {
        // Agregar efecto de click para mostrar información
        cargo.addEventListener('click', function() {
            const cargoName = this.textContent.trim();
            showCargoInfo(cargoName);
        });
    });
}

// ========================================
// Mostrar información del cargo (opcional)
// ========================================
function showCargoInfo(cargoName) {
    // Esta función puede expandirse para mostrar más detalles
    console.log(`Cargo seleccionado: ${cargoName}`);
    
    // Aquí podrías agregar un modal o tooltip con más información
    // Por ahora solo hace log
}

// ========================================
// Animaciones de entrada
// ========================================
function initializeAnimations() {
    // Observador para animar elementos al entrar en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar las tarjetas de información
    const cards = document.querySelectorAll('.info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// ========================================
// Función para imprimir organigrama (opcional)
// ========================================
function printOrganigrama() {
    // Asegurarse de que estamos en la sección del organigrama
    showSection('organigrama');
    
    // Esperar un poco para que se cargue la sección
    setTimeout(function() {
        window.print();
    }, 300);
}

// ========================================
// Función para exportar como imagen (opcional - requiere librería)
// ========================================
function exportAsImage() {
    console.log('Función de exportación - Por implementar');
    // Aquí se podría usar html2canvas u otra librería
    alert('Esta funcionalidad estará disponible próximamente');
}

// ========================================
// Detección de teclas de atajo (opcional)
// ========================================
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + 1 = Organigrama
    if ((event.ctrlKey || event.metaKey) && event.key === '1') {
        event.preventDefault();
        const orgButton = document.querySelector('.nav-button:first-child');
        if (orgButton) orgButton.click();
    }
    
    // Ctrl/Cmd + 2 = Sistema de Información
    if ((event.ctrlKey || event.metaKey) && event.key === '2') {
        event.preventDefault();
        const sysButton = document.querySelector('.nav-button:last-child');
        if (sysButton) sysButton.click();
    }
});

// ========================================
// Manejo de resize de ventana
// ========================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Ventana redimensionada - Ajustando layout');
        // Aquí podrías agregar lógica adicional si necesitas
    }, 250);
});

// ========================================
// Prevenir pérdida de datos (opcional)
// ========================================
window.addEventListener('beforeunload', function(event) {
    // Descomentar si agregas formularios que puedan tener datos sin guardar
    // event.preventDefault();
    // event.returnValue = '';
});

// ========================================
// Exponer funciones globales necesarias
// ========================================
window.showSection = showSection;
window.printOrganigrama = printOrganigrama;
window.exportAsImage = exportAsImage;
