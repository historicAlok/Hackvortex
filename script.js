// Initialize language from localStorage
let currentLanguage = localStorage.getItem('language') || 'en';
document.querySelectorAll('#language-select').forEach(select => {
    select.value = currentLanguage;
});
changeLanguage();

// Navigation function to switch between screens
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Change language and update content
function changeLanguage() {
    currentLanguage = document.querySelector('#language-select').value;
    localStorage.setItem('language', currentLanguage);

    document.querySelectorAll('[data-en]').forEach(element => {
        const key = currentLanguage === 'en' ? 'en' : currentLanguage;
        element.textContent = element.getAttribute(`data-${key}`);
    });

    document.querySelectorAll('input[data-en-placeholder], textarea[data-en-placeholder], select[data-en-placeholder]').forEach(element => {
        const key = currentLanguage === 'en' ? 'en' : currentLanguage;
        element.placeholder = element.getAttribute(`data-${key}-placeholder`) || '';
    });

    // Update select options for blood donation form
    document.querySelectorAll('#blood-role option, #receiver-urgency option').forEach(option => {
        const key = currentLanguage === 'en' ? 'en' : currentLanguage;
        option.textContent = option.getAttribute(`data-${key}`);
    });

    // Update ETA text dynamically if visible
    const etaText = document.getElementById('eta-text');
    if (etaText && etaText.dataset.hospital) {
        const hospital = etaText.dataset.hospital;
        const distance = etaText.dataset.distance;
        const time = etaText.dataset.time;
        etaText.textContent = currentLanguage === 'en' ? `ETA to ${hospital}: ${distance}, ${time}` : 
                              currentLanguage === 'hi' ? `पहुँचने का समय ${hospital}: ${distance}, ${time}` : 
                              currentLanguage === 'odia' ? `ପହଞ୍ଚିବା ସମୟ ${hospital}: ${distance}, ${time}` : 
                              `ಆಗಮನ ಸಮಯ ${hospital}: ${distance}, ${time}`;
    }
}

// Update Blood Donation form based on role selection
function updateBloodForm() {
    const role = document.getElementById('blood-role').value;
    const donorForm = document.getElementById('donor-form');
    const receiverForm = document.getElementById('receiver-form');

    donorForm.style.display = role === 'donor' ? 'flex' : 'none';
    receiverForm.style.display = role === 'receiver' ? 'flex' : 'none';
}

// Submit Blood Donation form
function submitBloodForm(role) {
    if (role === 'donor') {
        const name = document.getElementById('donor-name').value;
        const bloodGroup = document.getElementById('donor-blood-group').value;
        const contact = document.getElementById('donor-contact').value;

        if (name && bloodGroup && contact) {
            showNotification(currentLanguage === 'en' ? 'Donor Registration Successful!' : 
                            currentLanguage === 'hi' ? 'दाता पंजीकरण सफल!' : 
                            currentLanguage === 'odia' ? 'ଦାତା ପଞ୍ଜୀକରଣ ସଫଳ!' : 
                            'ದಾನಿ ನೋಂದಣಿ ಯಶಸ್ವಿ!');
            document.getElementById('donor-form').reset();
            document.getElementById('blood-role').value = '';
            updateBloodForm();
            setTimeout(() => navigateTo('splash-screen'), 2000);
        } else {
            showNotification(currentLanguage === 'en' ? 'Please fill all fields.' : 
                            currentLanguage === 'hi' ? 'कृपया सभी क्षेत्र भरें।' : 
                            currentLanguage === 'odia' ? 'ଦୟାକରି ସମସ୍ତ କ୍ଷେତ୍ର ପୂରଣ କରନ୍ତୁ।' : 
                            'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.');
        }
    } else if (role === 'receiver') {
        const hospital = document.getElementById('receiver-hospital').value;
        const bloodGroup = document.getElementById('receiver-blood-group').value;
        const urgency = document.getElementById('receiver-urgency').value;

        if (hospital && bloodGroup && urgency) {
            showNotification(currentLanguage === 'en' ? 'Receiver Request Submitted!' : 
                            currentLanguage === 'hi' ? 'प्राप्तकर्ता अनुरोध जमा किया गया!' : 
                            currentLanguage === 'odia' ? 'ଗ୍ରହୀତା ଅନୁରୋଧ ଜମା ହେଲା!' : 
                            'ಸ್ವೀಕರಿಸುವವರ ವಿನಂತಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!');
            document.getElementById('receiver-form').reset();
            document.getElementById('blood-role').value = '';
            updateBloodForm();
            setTimeout(() => navigateTo('splash-screen'), 2000);
        } else {
            showNotification(currentLanguage === 'en' ? 'Please fill all fields.' : 
                            currentLanguage === 'hi' ? 'कृपया सभी क्षेत्र भरें।' : 
                            currentLanguage === 'odia' ? 'ଦୟାକରି ସମସ୍ତ କ୍ଷେତ୍ର ପୂରଣ କରନ୍ତୁ।' : 
                            'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.');
        }
    }
}

// Handle hospital selection on Home/Dashboard screen
function selectHospital(hospital, distance, time) {
    const hospitalOptions = document.getElementById('hospital-options');
    const etaInfo = document.getElementById('eta-info');
    const etaText = document.getElementById('eta-text');

    hospitalOptions.style.display = 'none';
    etaInfo.style.display = 'block';
    etaText.dataset.hospital = hospital;
    etaText.dataset.distance = distance;
    etaText.dataset.time = time;
    etaText.textContent = currentLanguage === 'en' ? `ETA to ${hospital}: ${distance}, ${time}` : 
                          currentLanguage === 'hi' ? `पहुँचने का समय ${hospital}: ${distance}, ${time}` : 
                          currentLanguage === 'odia' ? `ପହଞ୍ଚିବା ସମୟ ${hospital}: ${distance}, ${time}` : 
                          `ಆಗಮನ ಸಮಯ ${hospital}: ${distance}, ${time}`;

    showNotification(currentLanguage === 'en' ? `Ambulance dispatched to ${hospital}!` : 
                    currentLanguage === 'hi' ? `${hospital} को एम्बुलेंस भेजी गई!` : 
                    currentLanguage === 'odia' ? `${hospital} କୁ ଆମ୍ବୁଲାନ୍ସ ପଠାଯାଇଛି!` : 
                    `${hospital} ಗೆ ಆಂಬ್ಯುಲೆನ್ಸ್ ಕಳುಹಿಸಲಾಗಿದೆ!`);

    // Simulate ETA updates
    let remainingTime = parseInt(time);
    const interval = setInterval(() => {
        remainingTime--;
        if (remainingTime <= 0) {
            clearInterval(interval);
            etaText.textContent = currentLanguage === 'en' ? `Arrived at ${hospital}` : 
                                 currentLanguage === 'hi' ? `${hospital} पर पहुँच गया` : 
                                 currentLanguage === 'odia' ? `${hospital} ରେ ପହଞ୍ଚିଗଲା` : 
                                 `${hospital} ಗೆ ಆಗಮಿಸಿದೆ`;
            return;
        }
        etaText.textContent = currentLanguage === 'en' ? `ETA to ${hospital}: ${distance}, ${remainingTime} mins` : 
                             currentLanguage === 'hi' ? `पहुँचने का समय ${hospital}: ${distance}, ${remainingTime} मिनट` : 
                             currentLanguage === 'odia' ? `ପହଞ୍ଚିବା ସମୟ ${hospital}: ${distance}, ${remainingTime} ମିନିଟ୍` : 
                             `ಆಗಮನ ಸಮಯ ${hospital}: ${distance}, ${remainingTime} ನಿಮಿಷ`;
    }, 1000);
}

// Switch tabs in Resuscitation Mode
function switchTab(tabElement) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    tabElement.classList.add('active');
}

// Handle Post-Emergency Report submission
function submitReport() {
    const title = document.getElementById('report-title').value;
    const location = document.getElementById('report-location').value;
    const datetime = document.getElementById('report-datetime').value;
    const description = document.getElementById('report-description').value;

    if (title && location && datetime && description) {
        showNotification(currentLanguage === 'en' ? 'Report Submitted Successfully!' : 
                        currentLanguage === 'hi' ? 'रिपोर्ट सफलतापूर्वक जमा की गई!' : 
                        currentLanguage === 'odia' ? 'ରିପୋର୍ଟ ସଫଳତାର ସହିତ ଜମା ହେଲା!' : 
                        'ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ!');
        document.getElementById('report-form').reset();
        setTimeout(() => navigateTo('splash-screen'), 2000);
    } else {
        showNotification(currentLanguage === 'en' ? 'Please fill all fields.' : 
                        currentLanguage === 'hi' ? 'कृपया सभी क्षेत्र भरें।' : 
                        currentLanguage === 'odia' ? 'ଦୟାକରି ସମସ୍ତ କ୍ଷେତ୍ର ପୂରଣ କରନ୍ତୁ।' : 
                        'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.');
    }
}

// Handle sending messages in AI Chat Companion
function sendMessage() {
    const input = document.getElementById('chat-input');
    const messageText = input.value.trim();

    if (messageText) {
        const messages = document.getElementById('chat-messages');
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', 'right');
        newMessage.textContent = messageText;
        messages.appendChild(newMessage);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.classList.add('message');
            aiMessage.textContent = currentLanguage === 'en' ? 'I’m here to help! What kind of emergency is it?' : 
                                   currentLanguage === 'hi' ? 'मैं मदद के लिए हूँ! यह किस तरह की आपात स्थिति है?' : 
                                   currentLanguage === 'odia' ? 'ମୁଁ ସାହାଯ୍ୟ କରିବାକୁ ଅଛି! ଏହା କି ପ୍ରକାରର ଜରୁରୀକାଳୀନ ଅଟେ?' : 
                                   'ನಾನು ಸಹಾಯಕ್ಕಾಗಿ ಇದ್ದೇನೆ! ಇದು ಯಾವ ರೀತಿಯ ತುರ್ತು ಸ್ಥಿತಿಯಾಗಿದೆ?';
            messages.appendChild(aiMessage);

            // Scroll to bottom
            messages.scrollTop = messages.scrollHeight;
        }, 1000);

        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    }
}
