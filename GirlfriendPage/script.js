// ===== 配置：相识的第一天 =====
const START_DATE = new Date('2020-02-26');

// ===== Tab 切换 =====
(function initTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + target).classList.add('active');
    });
  });
})();

// ===== 日期计数器 + 环形进度 =====
(function initCounter() {
  const el = document.getElementById('day-count');
  const ring = document.getElementById('counter-circle-fg');
  if (!el) return;

  const circumference = 565; // 2 * PI * 90 ≈ 565
  const totalDays = 365;     // 一圈 = 一年

  function update() {
    const now = new Date();
    const diff = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));
    el.textContent = Math.max(0, diff);

    // 更新环形进度
    if (ring) {
      const progress = (diff % totalDays) / totalDays;
      const offset = circumference * (1 - progress);
      ring.style.strokeDashoffset = offset;
    }
  }
  update();
  setInterval(update, 60 * 1000);
})();

// ===== 绝世美颜照片集合：点击组件后打开 =====
(function initPhotos() {
  const cover = document.getElementById('beauty-cover');
  const modal = document.getElementById('beauty-modal');
  const grid = document.getElementById('bento-grid');
  const modalClose = document.getElementById('beauty-modal-close');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  if (!grid || !modal || !cover) return;

  const total = 9;
  let currentIndex = 0;

  const bentoLayout = [
    ['bento-w2h2', 'bento-tilt-l',  '✨ 最爱的瞬间'],
    ['bento-w1',    'bento-tilt-r',  '📷 甜甜的'],
    ['bento-w1',    'bento-tilt-l2', '💫 闪闪发光'],
    ['bento-w1',    'bento-tilt-r2','🌟 小星星'],
    ['bento-w2',    'bento-tilt-none','💗 温暖'],
    ['bento-w1',    'bento-tilt-l',  '🎀 可爱暴击'],
    ['bento-w2',    'bento-tilt-r',  '🌸 花与笑'],
    ['bento-w1',    'bento-tilt-l2', '💖 记在心里'],
    ['bento-w1',    'bento-tilt-r2', '☁️ 心动云朵'],
  ];

  for (let i = 1; i <= Math.min(total, bentoLayout.length); i++) {
    const layout = bentoLayout[i - 1];
    const frame = document.createElement('div');
    frame.className = 'bento-item polaroid ' + layout[0] + ' ' + layout[1];
    frame.innerHTML =
      '<img src="assets/images/photo' + i + '.jpg" alt="Photo ' + i + '" loading="lazy" onerror="this.parentElement.style.display=\'none\'">' +
      '<div class="photo-shine"></div>' +
      '<p class="polaroid-caption">' + layout[2] + '</p>';
    (function(idx) {
      frame.addEventListener('click', function() { openLightbox(idx); });
    })(i - 1);
    grid.appendChild(frame);
  }

  cover.addEventListener('click', openBeautyModal);
  modalClose?.addEventListener('click', closeBeautyModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeBeautyModal(); });

  function openBeautyModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeBeautyModal() {
    modal.classList.add('hidden');
    if (lightbox?.classList.contains('hidden')) document.body.style.overflow = '';
  }

  function openLightbox(idx) {
    currentIndex = idx;
    lightboxImg.src = 'assets/images/photo' + (idx + 1) + '.jpg';
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.add('hidden');
    if (modal.classList.contains('hidden')) document.body.style.overflow = '';
  }
  function prev() { currentIndex = (currentIndex - 1 + total) % total; lightboxImg.src = 'assets/images/photo' + (currentIndex + 1) + '.jpg'; }
  function next() { currentIndex = (currentIndex + 1) % total; lightboxImg.src = 'assets/images/photo' + (currentIndex + 1) + '.jpg'; }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);
  lightbox.addEventListener('click', function(e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (!lightbox.classList.contains('hidden')) closeLightbox();
      else if (!modal.classList.contains('hidden')) closeBeautyModal();
    }
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();

// ===== 今日夸夸 =====
(function initCompliment() {
  const compliments = [
    '你今天一定是宇宙里最可爱的女孩子！🌟',
    '看到星星女士，全世界的花都开了。🌸',
    '绵绵小宝笑起来的时候，连阳光都变得更温柔了。☀️',
    '你是整个银河系里最闪闪发光的存在！✨',
    '星星女士的眼睛里有整个星空，好美。🌌',
    '小犹太将军今天一定又是可爱满分的一天！💯',
    '遇到你，是我能想到的最幸运的事情。🍀',
    '宇宙那么大，但你才是最耀眼的那颗星。⭐',
    '今天的你也超级无敌可爱，不接受反驳！🎀',
    '星星女士的笑容是世界上最甜的糖果。🍬',
    '绵绵小宝的可爱能量，今天也充满格了！🔋',
    '你一定是上天派来治愈这个世界的小天使。👼',
    '每次看到星星女士，心情都会自动变好。💖',
    '全宇宙最温柔最可爱的人就是你啦！💝',
    '小犹太将军的可爱，连月亮都自愧不如。🌙',
    '今天也要做最快乐的小星星呀！💫',
    '你是被整个宇宙偏爱的那颗星。🌟',
    '星星女士身上的光芒，能照亮所有不开心。💡',
    '绵绵小宝走到哪里，哪里就开满了小花。🌷',
    '今天的小星星也是一如既往地闪闪发光呢！✨',
    '没有什么比看到星星女士笑更让人开心的了。😊',
    '你让这个普普通通的世界变得特别美好。🎀',
  ];
  const textEl = document.getElementById('compliment-text');
  const btn = document.getElementById('compliment-btn');
  if (!textEl || !btn) return;
  let lastIndex = -1;

  btn.addEventListener('click', () => {
    let idx;
    do { idx = Math.floor(Math.random() * compliments.length); }
    while (idx === lastIndex && compliments.length > 1);
    lastIndex = idx;
    textEl.style.opacity = '0';
    setTimeout(() => {
      textEl.textContent = compliments[idx];
      textEl.style.opacity = '1';
    }, 200);
  });
})();

// ===== 信封情书 =====
(function initEnvelope() {
  const env = document.getElementById('envelope');
  if (!env) return;
  env.addEventListener('click', () => {
    env.classList.toggle('open');
  });
})();

// ===== 默契大考验 =====
(function initQuiz() {
  const questions = [
    {
      q: '星星女士最喜欢什么颜色？',
      options: ['粉色', '蓝色', '紫色', '白色'],
      correct: 0,
    },
    {
      q: '小犹太将军最爱的季节是？',
      options: ['春天', '夏天', '秋天', '冬天'],
      correct: 2,
    },
    {
      q: '她最爱吃的菜是？',
      options: ['海带', '番茄炒蛋', '土豆丝', '糖醋排骨'],
      correct: 0,
    },
  ];

  const quizCard = document.getElementById('quiz-card');
  const contentDiv = document.getElementById('quiz-content');
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const resultDiv = document.getElementById('quiz-result');
  const btn = document.getElementById('quiz-btn');
  if (!quizCard) return;

  let currentQ = 0;
  let score = 0;
  let answered = false;

  function showQuestion() {
    answered = false;
    const q = questions[currentQ];
    questionEl.textContent = `第 ${currentQ + 1} 题：${q.q}`;
    optionsEl.innerHTML = q.options
      .map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`)
      .join('');
    optionsEl.querySelectorAll('.quiz-option').forEach(optBtn => {
      optBtn.addEventListener('click', () => handleAnswer(parseInt(optBtn.dataset.idx)));
    });
    contentDiv.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    btn.classList.add('hidden');
  }

  function handleAnswer(idx) {
    if (answered) return;
    answered = true;
    const q = questions[currentQ];
    const isCorrect = idx === q.correct;
    if (isCorrect) score++;

    optionsEl.querySelectorAll('.quiz-option').forEach((optBtn, i) => {
      optBtn.style.pointerEvents = 'none';
      if (i === q.correct) optBtn.classList.add('correct');
      if (i === idx && !isCorrect) optBtn.classList.add('wrong');
    });

    setTimeout(() => {
      currentQ++;
      if (currentQ < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }, 1000);
  }

  function showResult() {
    contentDiv.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    btn.classList.remove('hidden');
    btn.textContent = '再来一次';

    const emojiEl = resultDiv.querySelector('.quiz-result-emoji');
    const textEl = resultDiv.querySelector('.quiz-result-text');
    const fillEl = resultDiv.querySelector('.quiz-score-fill');
    const scoreText = resultDiv.querySelector('.quiz-score-text');

    const pct = score / questions.length;
    fillEl.style.width = (pct * 100) + '%';

    if (pct === 1) {
      emojiEl.textContent = '👑'; textEl.textContent = '满分！你太了解她啦！这就是传说中的真爱吧~';
    } else if (pct >= 0.5) {
      emojiEl.textContent = '💖'; textEl.textContent = '还不错哦，你们默契很好呢！';
    } else {
      emojiEl.textContent = '💗'; textEl.textContent = '要多了解她一点哦，加油！';
    }
    scoreText.textContent = `答对 ${score} / ${questions.length} 题`;

    btn.onclick = () => {
      currentQ = 0; score = 0;
      showQuestion();
    };
  }

  btn.addEventListener('click', () => showQuestion());
})();

// ===== 心情日记 =====
(function initMood() {
  const btns = document.querySelectorAll('.mood-btn');
  const resultEl = document.getElementById('mood-result');
  const historyEl = document.getElementById('mood-history');
  if (!btns.length) return;

  const records = JSON.parse(localStorage.getItem('mood_records') || '[]');
  renderHistory();

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const mood = btn.dataset.mood;
      const emoji = btn.childNodes[0].textContent.trim();
      resultEl.textContent = `今天星星女士的心情是：${emoji} ${mood}，已经帮你记进历史啦~`;

      const now = new Date();
      const dateKey = now.toLocaleDateString('zh-CN');
      const timeText = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const existing = records.findIndex(r => r.date === dateKey);
      const nextRecord = { date: dateKey, time: timeText, mood, emoji };
      if (existing >= 0) {
        records[existing] = nextRecord;
      } else {
        records.unshift(nextRecord);
      }
      if (records.length > 30) records.length = 30;
      localStorage.setItem('mood_records', JSON.stringify(records));
      renderHistory();
    });
  });

  function renderHistory() {
    if (!historyEl) return;
    if (!records.length) {
      historyEl.classList.add('empty-history');
      historyEl.textContent = '还没有打卡记录，今天先点一个心情吧~';
      return;
    }
    historyEl.classList.remove('empty-history');
    historyEl.innerHTML = records
      .map(r => `<article class="history-record"><span class="history-emoji">${r.emoji || '💗'}</span><div><strong>${r.mood}</strong><small>${r.date}${r.time ? ' ' + r.time : ''}</small></div></article>`)
      .join('');
  }
})();

// ===== 许愿瓶：历史记录上锁 =====
(function initWish() {
  const input = document.getElementById('wish-input');
  const btn = document.getElementById('wish-btn');
  const list = document.getElementById('wish-list');
  const countSpan = document.querySelector('#wish-count span');
  const starsContainer = document.getElementById('bottle-stars');
  const lockPanel = document.getElementById('wish-lock');
  const unlockBtn = document.getElementById('wish-unlock-btn');
  const passwordInput = document.getElementById('wish-password');
  const lockMessage = document.getElementById('wish-lock-message');
  const historyPanel = document.getElementById('wish-history-panel');
  if (!input || !btn) return;

  const stored = JSON.parse(localStorage.getItem('wish_bottle') || '[]');
  const wishes = stored.map(item => typeof item === 'string' ? { text: item, date: '旧愿望', time: '' } : item);
  let unlocked = sessionStorage.getItem('wish_unlocked') === 'true';
  renderWishes();
  updateLockState();

  btn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    const now = new Date();
    wishes.unshift({
      text,
      date: now.toLocaleDateString('zh-CN'),
      time: now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    });
    if (wishes.length > 30) wishes.length = 30;
    localStorage.setItem('wish_bottle', JSON.stringify(wishes));
    input.value = '';
    renderWishes();
    animateBottle();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') btn.click();
  });

  unlockBtn?.addEventListener('click', unlockWishes);
  passwordInput?.addEventListener('keydown', e => {
    if (e.key === 'Enter') unlockWishes();
  });

  function unlockWishes() {
    if ((passwordInput?.value || '').trim() === '000618') {
      unlocked = true;
      sessionStorage.setItem('wish_unlocked', 'true');
      if (lockMessage) lockMessage.textContent = '解锁成功，愿望星星都出现啦~';
      updateLockState();
    } else if (lockMessage) {
      lockMessage.textContent = '密码不对哦，再试一次。';
      lockMessage.classList.add('shake-lock');
      setTimeout(() => lockMessage.classList.remove('shake-lock'), 500);
    }
  }

  function updateLockState() {
    if (!list || !lockPanel) return;
    lockPanel.classList.toggle('hidden', unlocked);
    list.classList.toggle('hidden', !unlocked);
    historyPanel?.classList.toggle('locked', !unlocked);
  }

  function renderWishes() {
    if (list) {
      if (!wishes.length) {
        list.classList.add('empty-history');
        list.textContent = '还没有新的愿望，写下第一个吧~';
      } else {
        list.classList.remove('empty-history');
        list.innerHTML = wishes.map(w => `<article class="history-record wish-record"><span class="history-emoji">✨</span><div><strong>${escapeHTML(w.text)}</strong><small>${w.date || ''}${w.time ? ' ' + w.time : ''}</small></div></article>`).join('');
      }
    }
    if (countSpan) countSpan.textContent = 6 + wishes.length;
    if (starsContainer) {
      const total = 6 + wishes.length;
      let starsHTML = '';
      for (let i = 0; i < total; i++) {
        starsHTML += '<span>' + (['⭐','✨','💫','🌟'][i % 4]) + '</span>';
      }
      starsContainer.innerHTML = starsHTML;
    }
    updateLockState();
  }

  function escapeHTML(text) {
    return text.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }

  function animateBottle() {
    const bottle = document.getElementById('wish-bottle');
    if (!bottle) return;
    bottle.style.transform = 'scale(1.1) rotate(3deg)';
    setTimeout(() => { bottle.style.transform = 'scale(1)'; }, 220);
  }
})();

// ===== 更多小游戏 =====
(function initMiniGames() {
  const missionText = document.getElementById('mission-text');
  const missionBtn = document.getElementById('mission-btn');
  const cards = document.querySelectorAll('.heart-card');
  const cardResult = document.getElementById('heart-card-result');
  const loveFill = document.getElementById('love-meter-fill');
  const loveText = document.getElementById('love-meter-text');
  const loveBtn = document.getElementById('love-meter-btn');
  const catchStage = document.getElementById('star-catch-stage');
  const catchStar = document.getElementById('catch-star');
  const catchScore = document.getElementById('star-catch-score');
  const catchBtn = document.getElementById('star-catch-btn');

  const missions = [
    '给星星女士发一句“今天也最喜欢你”。',
    '一起拍一张今日份可爱合照。',
    '选一首歌循环播放，然后抱抱一分钟。',
    '今晚睡前说三个今天开心的小瞬间。',
    '给 Lucky 一个空气摸摸，再给她一个真抱抱。',
  ];

  if (missionBtn && missionText) {
    missionBtn.addEventListener('click', () => {
      missionText.textContent = missions[Math.floor(Math.random() * missions.length)];
    });
  }

  function resetCards() {
    cards.forEach(card => {
      card.textContent = '?';
      card.classList.remove('opened', 'winner');
      card.disabled = false;
    });
    if (cardResult) cardResult.textContent = '';
  }

  if (cards.length) {
    let luckyCard = Math.floor(Math.random() * cards.length);
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = Number(card.dataset.card);
        cards.forEach(c => { c.disabled = true; c.classList.add('opened'); });
        cards.forEach((c, i) => { c.textContent = i === luckyCard ? '💖' : '🌸'; });
        cards[luckyCard].classList.add('winner');
        if (cardResult) cardResult.textContent = idx === luckyCard ? '猜中啦！今天也是被爱包围的一天~' : '没关系，爱心还是送给你啦~';
        setTimeout(() => { luckyCard = Math.floor(Math.random() * cards.length); resetCards(); }, 2200);
      });
    });
  }

  loveBtn?.addEventListener('click', () => {
    const value = 96 + Math.floor(Math.random() * 5);
    if (loveFill) loveFill.style.width = value + '%';
    if (loveText) loveText.textContent = `今日心动值：${value}% —— 甜度超标！`;
  });

  if (catchBtn && catchStage && catchStar && catchScore) {
    let score = 0;
    let timer = null;
    let playing = false;

    catchBtn.addEventListener('click', () => {
      if (playing) return;
      playing = true;
      score = 0;
      catchScore.textContent = '得分：0';
      catchBtn.textContent = '进行中...';
      moveStar();
      catchStar.classList.remove('hidden');
      timer = setTimeout(() => {
        playing = false;
        catchStar.classList.add('hidden');
        catchBtn.textContent = '再玩一次';
        catchScore.textContent = `最终得分：${score}，星星都被你接住啦~`;
      }, 10000);
    });

    catchStar.addEventListener('click', () => {
      if (!playing) return;
      score++;
      catchScore.textContent = `得分：${score}`;
      catchStar.classList.add('caught');
      setTimeout(() => catchStar.classList.remove('caught'), 180);
      moveStar();
    });

    function moveStar() {
      const maxX = Math.max(0, catchStage.clientWidth - 48);
      const maxY = Math.max(0, catchStage.clientHeight - 48);
      catchStar.style.left = Math.random() * maxX + 'px';
      catchStar.style.top = Math.random() * maxY + 'px';
    }
  }
})();

// ===== 礼物盒 + 星星雨 =====
(function initGift() {
  const giftBox = document.getElementById('gift-box');
  const lid = document.getElementById('gift-lid');
  const surpriseDiv = document.getElementById('gift-surprise');
  const surpriseText = document.getElementById('gift-surprise-text');
  const resetBtn = document.getElementById('gift-reset-btn');
  const rainContainer = document.getElementById('star-rain');
  const wrapper = document.getElementById('gift-box-wrapper');
  if (!giftBox) return;

  const messages = [
    '你是这个世界上最珍贵的礼物，值得所有美好的一切。💝',
    '每一天醒来看见你的消息，就是一天里最好的事情。💗',
    '全宇宙的星星加起来，也没有你的一个笑容耀眼。✨',
    '谢谢你来到我的世界里，让它变得闪闪发光。🌟',
    '不管世界怎么变，你永远是我心里最亮的那颗星。💫',
    '小星星，你要记得：你值得被世间所有的温柔对待。🎀',
    '如果幸福有形状，那一定是你的样子。💖',
    '你不用做最完美的那个，你只要做你自己就好——因为那已经是最好的了。🌸',
  ];

  let opened = false;

  giftBox.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    lid.classList.add('open');
    surpriseText.textContent = messages[Math.floor(Math.random() * messages.length)];
    setTimeout(() => {
      wrapper.classList.add('hidden');
      surpriseDiv.classList.remove('hidden');
      resetBtn.classList.remove('hidden');
      createStarRain(rainContainer);
    }, 600);
  });

  resetBtn.addEventListener('click', () => {
    opened = false;
    lid.classList.remove('open');
    wrapper.classList.remove('hidden');
    surpriseDiv.classList.add('hidden');
    resetBtn.classList.add('hidden');
    rainContainer.innerHTML = '';
  });

  function createStarRain(container) {
    const emojis = ['⭐','✨','💫','🌟','💖','💗','💝','🎀','🌸','💕'];
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const star = document.createElement('span');
        star.className = 'rain-star';
        star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.top = -(Math.random() * 60) + 'px';
        star.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        star.style.animationDelay = '0s';
        container.appendChild(star);
        setTimeout(() => star.remove(), 3000);
      }, i * 30);
    }
  }
})();

// ===== 幸运签 =====
(function initFortune() {
  const slip = document.getElementById('fortune-slip');
  const typeEl = document.getElementById('fortune-type');
  const msgEl = document.getElementById('fortune-msg');
  const btn = document.getElementById('fortune-btn');
  if (!slip || !btn) return;

  const fortunes = [
    { type: '大吉', msg: '今天会收到一个特别的好消息，记得多留意手机哦~' },
    { type: '大吉', msg: '幸运值满分！想做的事情就大胆去做吧。' },
    { type: '中吉', msg: '有一个人正在想你，那个人就是我呀。' },
    { type: '中吉', msg: '今天适合吃甜食，甜蜜的能量会延续一整天。' },
    { type: '大吉', msg: '宇宙今天的信号：你会被爱包围，幸福感满满。' },
    { type: '小吉', msg: '偶然的小确幸在路上，保持好心情迎接它吧。' },
    { type: '大吉', msg: '星星说，今天是你闪闪发光的一天！' },
    { type: '中吉', msg: '会有一个小惊喜在不经意间出现。' },
    { type: '大吉', msg: '今天的你，是全世界最可爱的幸运儿。' },
    { type: '小吉', msg: '温柔的运气正在靠近，请保持微笑。' },
  ];

  let isFlipped = false;

  btn.addEventListener('click', () => {
    if (isFlipped) {
      slip.classList.remove('flipped');
      setTimeout(() => { isFlipped = false; }, 600);
    } else {
      const f = fortunes[Math.floor(Math.random() * fortunes.length)];
      typeEl.textContent = f.type;
      msgEl.textContent = f.msg;
      slip.classList.add('flipped');
      isFlipped = true;
    }
  });
})();

// ===== 惊喜补给站 =====
(function initSurpriseExtras() {
  const loveNoteBtn = document.getElementById('love-note-btn');
  const loveNoteText = document.getElementById('love-note-text');
  const dateBtn = document.getElementById('date-idea-btn');
  const dateText = document.getElementById('date-idea-text');
  const dateWheel = document.getElementById('date-wheel');
  const capsuleInput = document.getElementById('memory-capsule-input');
  const capsuleBtn = document.getElementById('memory-capsule-btn');
  const capsuleList = document.getElementById('memory-capsule-list');

  const notes = [
    '我喜欢你，不止今天，也不止明天，是每一个普通日子里都确定的喜欢。',
    '你一笑，我就觉得人间值得多停留一会儿。',
    '想把所有温柔都攒起来，慢慢送给你。',
    '你是我心里不会过期的小惊喜。',
  ];
  const ideas = ['一起散步买奶茶', '在家看一部温柔电影', '去拍一组可爱照片', '给 Lucky 买一个小玩具', '一起吃海带和喜欢的菜'];

  loveNoteBtn?.addEventListener('click', () => {
    if (loveNoteText) loveNoteText.textContent = notes[Math.floor(Math.random() * notes.length)];
  });

  dateBtn?.addEventListener('click', () => {
    const idea = ideas[Math.floor(Math.random() * ideas.length)];
    if (dateText) dateText.textContent = idea;
    if (dateWheel) {
      dateWheel.classList.remove('spin-wheel');
      void dateWheel.offsetWidth;
      dateWheel.classList.add('spin-wheel');
    }
  });

  let capsules = JSON.parse(localStorage.getItem('memory_capsules') || '[]');
  renderCapsules();
  capsuleBtn?.addEventListener('click', () => {
    const text = (capsuleInput?.value || '').trim();
    if (!text) return;
    capsules.unshift({ text, date: new Date().toLocaleDateString('zh-CN') });
    if (capsules.length > 5) capsules.length = 5;
    localStorage.setItem('memory_capsules', JSON.stringify(capsules));
    capsuleInput.value = '';
    renderCapsules();
  });

  function renderCapsules() {
    if (!capsuleList) return;
    capsuleList.innerHTML = capsules.length
      ? capsules.map(c => `<span class="capsule-item">🫧 ${escapeHTML(c.text)} <small>${c.date}</small></span>`).join('')
      : '<span class="capsule-empty">还没有胶囊，先存一句吧~</span>';
  }

  function escapeHTML(text) {
    return text.replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
  }
})();

// ===== 主题切换 =====
(function initThemeSwitcher() {
  const buttons = document.querySelectorAll('.theme-btn');
  if (!buttons.length) return;
  const savedTheme = localStorage.getItem('page_theme') || 'kitty';
  setTheme(savedTheme);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setTheme(btn.dataset.theme);
      localStorage.setItem('page_theme', btn.dataset.theme);
    });
  });

  function setTheme(theme) {
    document.body.dataset.theme = theme;
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === theme));
  }
})();

// ===== 音乐播放器 =====
(function initMusic() {
  const btn = document.getElementById('music-toggle');
  const bgm = document.getElementById('bgm');
  const select = document.getElementById('music-select');
  if (!btn || !bgm) return;

  const songs = [
    { name: '甜甜循环', src: 'assets/audio/bgm.mp3', rate: 1 },
    { name: '星星散步', src: 'assets/audio/bgm.mp3', rate: 0.92 },
    { name: '粉色梦境', src: 'assets/audio/bgm.mp3', rate: 0.84 },
    { name: '云朵抱抱', src: 'assets/audio/bgm.mp3', rate: 1.08 },
    { name: 'Lucky 摇尾巴', src: 'assets/audio/bgm.mp3', rate: 1.18 },
  ];

  let playing = false;
  let currentSong = Number(localStorage.getItem('music_song') || 0);
  if (select) select.value = String(currentSong);
  loadSong(currentSong);

  if (select) {
    select.addEventListener('change', () => {
      currentSong = Number(select.value);
      localStorage.setItem('music_song', String(currentSong));
      const shouldPlay = playing;
      loadSong(currentSong);
      if (shouldPlay) playMusic();
    });
  }

  btn.addEventListener('click', () => {
    if (playing) {
      bgm.pause();
      btn.classList.remove('playing');
      btn.textContent = '🎵';
      playing = false;
    } else {
      playMusic();
    }
  });

  function loadSong(index) {
    const song = songs[index] || songs[0];
    bgm.src = song.src;
    bgm.playbackRate = song.rate;
    btn.title = `播放：${song.name}`;
  }

  function playMusic() {
    bgm.play().then(() => {
      btn.classList.add('playing');
      btn.textContent = '🎶';
      playing = true;
    }).catch(() => {
      btn.textContent = '🚫';
      playing = false;
    });
  }
})();

// ===== Lucky 小宠物互动 =====
(function initLuckyDog() {
  const pet = document.getElementById('dog-pet');
  const bubble = document.getElementById('dog-bubble');
  const status = document.getElementById('dog-status');
  const actions = document.querySelectorAll('.dog-action');
  if (!pet || !actions.length) return;

  const messages = {
    pet: ['Lucky 被摸摸啦，西高地小脑袋蹭蹭你！', '汪汪~ Lucky 最喜欢温柔摸摸。'],
    feed: ['Lucky 叼走小骨头，开心到耳朵都竖起来！', '咔嚓咔嚓，小西高地宝宝充满电。'],
    play: ['Lucky 追着小球跑回来啦，还想再玩一次！', 'Lucky 蹦蹦跳跳：姐姐也太会玩啦！'],
  };

  pet.addEventListener('click', () => interact('pet'));
  actions.forEach(btn => btn.addEventListener('click', () => interact(btn.dataset.action)));

  function interact(action) {
    const pool = messages[action] || messages.pet;
    const msg = pool[Math.floor(Math.random() * pool.length)];
    pet.classList.remove('petting', 'feeding', 'playing');
    void pet.offsetWidth;
    const nextClass = action === 'pet' ? 'petting' : action === 'feed' ? 'feeding' : 'playing';
    pet.classList.add(nextClass);
    if (bubble) bubble.textContent = msg;
    if (status) status.textContent = msg;
  }
})();

// ===== 回到顶部 =====
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== 鼠标点击特效 =====
(function initClickEffects() {
  const container = document.getElementById('click-effects');
  if (!container) return;
  const emojis = ['💕','✨','💖','🌟','💗','⭐','💝','✧','🎀','💫','🌸','🩷'];

  document.addEventListener('click', e => {
    // 排除交互元素
    if (e.target.closest('button, select, .envelope, .photo-frame, .bento-item, .quiz-option, .mood-btn, #fortune-slip, #dog-pet')) return;
    const el = document.createElement('span');
    el.className = 'click-effect';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
    container.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  });
})();
