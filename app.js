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

  /* ─── 4. AI Scheduling Generator Simulator (Dynamic Timeline Grid) ──────── */
  const btnGenerateSchedule = document.getElementById('btn-generate-schedule-demo');
  const scheduleStatusCard = document.getElementById('schedule-status-card');
  const scheduleStatusText = document.getElementById('schedule-status-text');
  const pulseIndicator = scheduleStatusCard.querySelector('.pulse-indicator');

  // Timeline Row Selectors
  const rowEtcher = document.getElementById('row-etcher');
  const rowCleaner = document.getElementById('row-cleaner');
  const rowMarker = document.getElementById('row-marker');

  let isSchedulingRunning = false;

  btnGenerateSchedule.addEventListener('click', () => {
    if (isSchedulingRunning) return;
    isSchedulingRunning = true;
    btnGenerateSchedule.disabled = true;
    
    // Clear previous timeline blocks
    rowEtcher.innerHTML = '';
    rowCleaner.innerHTML = '';
    rowMarker.innerHTML = '';

    // Step 1: Loading
    pulseIndicator.className = 'pulse-indicator yellow';
    scheduleStatusText.textContent = '마스터 데이터 및 주문 적재 중...';

    setTimeout(() => {
      // Step 2: Place initial non-conflicting schedules
      scheduleStatusText.textContent = 'AI 최적화 엔진 동작 중: 설비 배치 및 Roster 매핑...';
      
      // Add first Batch blocks
      const block1 = document.createElement('div');
      block1.className = 'timeline-block block-blue';
      block1.textContent = 'Batch #101';
      rowEtcher.appendChild(block1);

      const block2 = document.createElement('div');
      block2.className = 'timeline-block block-green';
      block2.textContent = 'Batch #102';
      rowCleaner.appendChild(block2);

      setTimeout(() => {
        // Step 3: Add overlapping conflict schedule
        scheduleStatusText.textContent = '장비 가용 상태 검증 중: 중복 가동(Conflict) 위험 감지...';
        
        const blockConflict = document.createElement('div');
        blockConflict.className = 'timeline-block block-conflict';
        blockConflict.id = 'temp-conflict-block';
        blockConflict.textContent = 'Batch #103';
        rowEtcher.appendChild(blockConflict);

        setTimeout(() => {
          // Step 4: Warn and trigger bypass/relocation algorithm
          scheduleStatusText.textContent = '충돌 경고: Etcher #03 동시 배정 감지! 우회 최적화 탐색...';

          setTimeout(() => {
            // Step 5: Resolve Conflict and move to Marker #05 row
            scheduleStatusText.textContent = '최적화 성공: Cleaner #01 및 Marker #05 교차 배치 완료.';
            
            // Remove conflict block from Row 1
            const tempBlock = document.getElementById('temp-conflict-block');
            if (tempBlock) tempBlock.remove();

            // Add resolved block to Marker row
            const blockResolved = document.createElement('div');
            blockResolved.className = 'timeline-block block-orange';
            blockResolved.textContent = 'Batch #103 (우회)';
            rowMarker.appendChild(blockResolved);

            pulseIndicator.className = 'pulse-indicator green';
            btnGenerateSchedule.disabled = false;
            isSchedulingRunning = false;
            
            showMockToast('🎉 Linea 엔진이 장비 충돌을 감지하고 자동 재배치를 완료했습니다.');
          }, 1500);

        }, 1500);

      }, 1000);

    }, 800);
  });

  /* ─── 5. Typewriter RAG Chatbot Simulator (Split PDF Highlighting) ───────── */
  const btnAskAI = document.getElementById('btn-ask-ai-demo');
  const chatContainer = document.getElementById('chat-messages-container');

  // PDF Document Viewer Paragraphs
  const pdfClause2 = document.getElementById('pdf-clause-2');
  const pdfClause3 = document.getElementById('pdf-clause-3');

  let isChatbotRunning = false;

  const dialogue = [
    { type: 'user', text: '건식 식각기(Dry Etcher #03) 세정 작업 시 주의해야 할 챔버 압력 수칙을 매뉴얼에서 찾아줘.' },
    { type: 'system', text: 'Vector DB에서 식각기 지침 매뉴얼 텍스트 추출 중...' },
    { type: 'bot', text: '식각설비 지침서에 따르면, 식각기 챔버 세정 착수 시 <strong>챔버 압력이 5Pa 이하</strong>가 되기 전까지 챔버 도어의 수동 개방을 금지합니다. 또한 화학 누출 방지를 위해 질소 가스를 완전히 공급해 대기압(1013hPa) 평형 상태를 도달했는지 확인한 뒤 차단 밸브를 여셔야 합니다. <br><br><a href="#" class="chat-source-link" id="pdf-cite-trigger">출처: 식각설비 정비 지침서 L23.pdf#page=125</a>' }
  ];

  function startChatbotSimulator(force = false) {
    if (isChatbotRunning && !force) return;
    isChatbotRunning = true;
    btnAskAI.disabled = true;

    // Reset container and document highlights
    chatContainer.innerHTML = '';
    pdfClause2.classList.remove('highlighted');
    pdfClause3.classList.remove('highlighted');

    let step = 0;
    
    function runNextStep() {
      if (step >= dialogue.length) {
        btnAskAI.disabled = false;
        isChatbotRunning = false;
        
        // Add click listener to citation link for user manual highlight
        const citeLink = document.getElementById('pdf-cite-trigger');
        if (citeLink) {
          citeLink.addEventListener('click', (e) => {
            e.preventDefault();
            highlightPdfClauses();
          });
        }
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
        setTimeout(runNextStep, 1200);
      } else if (currentMsg.type === 'user') {
        msgElem.className = 'message user';
        msgElem.textContent = currentMsg.text;
        chatContainer.appendChild(msgElem);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        step++;
        setTimeout(runNextStep, 800);
      } else if (currentMsg.type === 'bot') {
        msgElem.className = 'message bot';
        chatContainer.appendChild(msgElem);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Typewriter effect
        let index = 0;
        const speed = 20; // ms per char
        const rawHtml = currentMsg.text;
        
        function typeWriter() {
          if (index < rawHtml.length) {
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
            // Highlighting document viewer clause on typewriter finish!
            highlightPdfClauses();
            step++;
            setTimeout(runNextStep, 800);
          }
        }
        typeWriter();
      }
    }

    runNextStep();
  }

  function highlightPdfClauses() {
    pdfClause2.classList.add('highlighted');
    pdfClause3.classList.add('highlighted');
    
    // Smooth scroll to the highlighted part
    const docContent = document.getElementById('doc-viewer-text-content');
    if (docContent) {
      docContent.scrollTo({
        top: pdfClause2.offsetTop - 50,
        behavior: 'smooth'
      });
    }
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
