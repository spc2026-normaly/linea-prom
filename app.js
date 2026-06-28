/* ==========================================================================
   Smart Factory Scheduler Landing Page Logic
   Features: Header scroll effects, mobile navigation, tab simulators, typewriter AI chatbot
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. Header Scroll Effect ──────────────────────────────────────────── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  /* ─── 2. Mobile Menu Toggle ────────────────────────────────────────────── */
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  /* ─── 3. Interactive Simulator Tab Switching ───────────────────────────── */
  const tabButtons = document.querySelectorAll('.sim-tab-btn');
  const contentPanes = document.querySelectorAll('.sim-content-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active from all buttons and panes
      tabButtons.forEach(btn => btn.classList.remove('active'));
      contentPanes.forEach(pane => pane.classList.remove('active'));

      // Add active to current
      button.classList.add('active');
      const targetId = button.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }

      // If switching to chatbot, trigger chatbot animation automatically
      if (targetId === 'chatbot-content') {
        startChatbotSimulator(false); // don't force reset unless requested
      }
    });
  });

  /* ─── 4. AI Scheduling Generator Simulator ────────────────────────────── */
  const btnGenerateSchedule = document.getElementById('btn-generate-schedule-demo');
  const scheduleStatusCard = document.getElementById('schedule-status-card');
  const scheduleStatusText = document.getElementById('schedule-status-text');
  const pulseIndicator = scheduleStatusCard.querySelector('.pulse-indicator');

  let isSchedulingRunning = false;

  btnGenerateSchedule.addEventListener('click', () => {
    if (isSchedulingRunning) return;
    isSchedulingRunning = true;
    btnGenerateSchedule.disabled = true;
    
    // Step 1: Loading
    pulseIndicator.className = 'pulse-indicator yellow';
    scheduleStatusText.textContent = '주문 및 장비 마스터 데이터 읽는 중...';

    setTimeout(() => {
      // Step 2: AI Orchestrator Running
      scheduleStatusText.textContent = 'AI 최적화 엔진 동작 중 (점검 주기 4종 필터링)...';
      
      setTimeout(() => {
        // Step 3: Success
        pulseIndicator.className = 'pulse-indicator green';
        scheduleStatusText.textContent = '배치 성공! 신규 48건 양산 일정 저장 완료.';
        btnGenerateSchedule.disabled = false;
        isSchedulingRunning = false;
        
        // Show success notification toast
        showMockToast('🎉 양산 일정이 성공적으로 생성되었습니다.');
      }, 1500);

    }, 1000);
  });

  /* ─── 5. Typewriter RAG Chatbot Simulator ───────────────────────────────── */
  const btnAskAI = document.getElementById('btn-ask-ai-demo');
  const chatContainer = document.getElementById('chat-messages-container');

  let isChatbotRunning = false;

  const dialogue = [
    { type: 'user', text: '건식 식각기(Dry Etcher #03) 점검 작업 시 특별한 주의 사항이 기재되어 있어? 찾아서 가르쳐줘.' },
    { type: 'system', text: 'Vector DB에서 가용 설비 및 기기 매뉴얼 문서를 검색 중...' },
    { type: 'bot', text: '기기 지침서에 따르면, 식각기 챔버 세정 및 정비 시 <strong>챔버 압력이 5Pa 이하</strong>가 되기 전까지 도어를 수동 개방하지 마십시오. 질소 가스를 완전 히 공급하여 대기압(1013hPa) 평형 상태를 도달했는지 확인한 뒤 차단 밸브를 여셔야 화학 가스 누출 및 화상 위험을 방지할 수 있습니다. <br><br><a href="#" class="chat-source-link" onclick="event.preventDefault(); alert(\'실제 어플리케이션에서는 R2 스토리지에 업로드된 해당 매뉴얼 PDF의 125페이지로 바로 연동됩니다.\');">출처: 식각설비 정비 지침서 L23.pdf#page=125</a>' }
  ];

  function startChatbotSimulator(force = false) {
    if (isChatbotRunning && !force) return;
    isChatbotRunning = true;
    btnAskAI.disabled = true;

    // Reset container
    chatContainer.innerHTML = '';

    let step = 0;
    
    function runNextStep() {
      if (step >= dialogue.length) {
        btnAskAI.disabled = false;
        isChatbotRunning = false;
        return;
      }

      const currentMsg = dialogue[step];
      const msgElem = document.createElement('div');
      
      if (currentMsg.type === 'system') {
        msgElem.className = 'message system';
        msgElem.textContent = currentMsg.text;
        chatContainer.appendChild(msgElem);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        step++;
        setTimeout(runNextStep, 1500);
      } else if (currentMsg.type === 'user') {
        msgElem.className = 'message user';
        msgElem.textContent = currentMsg.text;
        chatContainer.appendChild(msgElem);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        step++;
        setTimeout(runNextStep, 1000);
      } else if (currentMsg.type === 'bot') {
        msgElem.className = 'message bot';
        chatContainer.appendChild(msgElem);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Typewriter effect
        let index = 0;
        const speed = 25; // ms per char
        const rawHtml = currentMsg.text;
        
        // Simple HTML-aware character printing
        function typeWriter() {
          if (index < rawHtml.length) {
            // Check if we are encountering an HTML tag to output instantly
            if (rawHtml.charAt(index) === '<') {
              const tagEnd = rawHtml.indexOf('>', index);
              if (tagEnd !== -1) {
                msgElem.innerHTML += rawHtml.substring(index, tagEnd + 1);
                index = tagEnd + 1;
              } else {
                msgElem.innerHTML += rawHtml.charAt(index);
                index++;
              }
            } else {
              msgElem.innerHTML += rawHtml.charAt(index);
              index++;
            }
            chatContainer.scrollTop = chatContainer.scrollHeight;
            setTimeout(typeWriter, speed);
          } else {
            step++;
            setTimeout(runNextStep, 1000);
          }
        }
        typeWriter();
      }
    }

    runNextStep();
  }

  btnAskAI.addEventListener('click', () => {
    startChatbotSimulator(true); // force restart
  });

  /* ─── 6. Demo Request Form & Modal Handling ────────────────────────────── */
  const contactForm = document.getElementById('demo-request-form');
  const successModal = document.getElementById('success-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect data (Mock)
    const name = document.getElementById('user-name').value;
    const company = document.getElementById('company-name').value;
    console.log(`Demo requested by ${name} from ${company}`);
    
    // Open Modal
    successModal.classList.add('active');
  });

  modalCloseBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    contactForm.reset();
  });

  // Close modal when clicking on backdrop
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      successModal.classList.remove('active');
      contactForm.reset();
    }
  });

  /* ─── 7. Helper: Show Mock Toast Notification ───────────────────────────── */
  function showMockToast(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#ffffff';
    toast.style.border = '1px solid #0d0d0d';
    toast.style.color = '#0d0d0d';
    toast.style.padding = '14px 28px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '600';
    toast.style.fontFamily = 'var(--font-display)';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

    document.body.appendChild(toast);
    toast.textContent = message;

    // Trigger transition
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 50);

    // Fade out and remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }

});
