document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    resetErrors();
    
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('messageContent').value.trim();
    
    let isValid = true;
    
    if (name.length < 2) {
        showError('nameError', 'Tên phải có ít nhất 2 ký tự');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showError('emailError', 'Vui lòng nhập đúng định dạng email');
        isValid = false;
    }
    
    if (message.length < 10) {
        showError('messageError', 'Nội dung phải có ít nhất 10 ký tự');
        isValid = false;
    }
    
    if (isValid) {
        simulateSendEmail({name, email, message});
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function resetErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => element.textContent = '');
}

function simulateSendEmail(data) {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
        <span>Đang gửi tin nhắn</span>
        <i class="fas fa-spinner fa-spin"></i>
    `;
    submitBtn.disabled = true;
    
    // Thêm hiệu ứng loading dots
    let dots = 0;
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        submitBtn.querySelector('span').textContent = 'Đang gửi tin nhắn' + '.'.repeat(dots);
    }, 500);
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        showNotification(
            '<i class="fas fa-check-circle"></i> Gửi tin nhắn thành công!',
            'Cảm ơn bạn đã liên hệ. Tôi đã nhận được tin nhắn và sẽ phản hồi trong thời gian sớm nhất.'
        );
        
        document.getElementById('messageForm').reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function showNotification(title, message) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>${title}</h3>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(notification);
    notification.style.display = 'block';

    // Thêm hiệu ứng fade out
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%) scale(0.95)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}
