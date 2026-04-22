---
title: "Character & Radical Quiz"
date: 2026-04-22
draft: false
---

<div id="quiz-container" style="max-width:1100px;margin:18px auto;padding:18px;">
  <h2 style="text-align:center;margin-bottom:10px;">Chinese Character & Radical Quiz</h2>
  <div id="score" style="text-align:center;margin-bottom:12px;font-weight:600;"></div>

  <div id="question-area" style="font-size:1.25rem;line-height:1.4;margin-bottom:12px;"></div>

  <div id="choices" style="display:flex;flex-direction:column;gap:10px;"></div>

  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;">
    <div id="progress" style="color:#555;"></div>
    <div>
      <button id="nextBtn" style="padding:8px 14px;border-radius:6px;border:0;background:#1976d2;color:#fff;cursor:pointer;" disabled>Next</button>
    </div>
  </div>

  <div id="result" style="margin-top:12px;font-weight:600;"></div>
</div>

<script>
(() => {
  // Hardcoded questions as JS strings: "type|prompt|opt1;opt2;opt3;opt4|answer"
  const qStrings = [
    "radical|Which radical means \"water\"? (select the radical)|氵;口;亻;艹|氵",
    "char|Which character means \"horse\"?|马;鸟;鱼;牛|马",
    "radical|Which radical indicates \"heart/feeling\"?|忄;扌;饣;氵|忄",
    "char|Which character means \"forest\"?|林;森;树;木|林",
    "char|Which character means \"sun/day\"?|日;月;火;土|日",
    "radical|Which radical indicates \"wood/tree\"?|木;月;宀;女|木",
    "char|Which character means \"big\"?|大;小;中;上|大",
    "radical|Which radical indicates \"person\"?|人;口;心;车|人",
    "char|Which character means \"fire\"?|火;水;土;金|火",
    "radical|Which radical indicates \"grass/plant\"?|艹;氵;忄;讠|艹",
    "char|Which character means \"eye\"?|目;耳;口;手|目",
    "char|Which character means \"mouth\"?|口;目;心;足|口",
    "radical|Which radical usually shows speech/words?|讠;氵;扌;艹|讠",
    "char|Which character means \"two\"?|二;三;四;五|二",
    "radical|Which radical indicates \"metal/metal tool\"?|钅;氵;艹;扌|钅"
  ];

  // Parse into objects
  const questions = qStrings.map(s => {
    const parts = s.split('|');
    return {
      type: parts[0] || 'char',
      prompt: parts[1] || '',
      options: (parts[2] || '').split(';').map(x => x.trim()),
      answer: parts[3] || ''
    };
  });

  let idx = 0;
  let score = 0;

  const scoreEl = document.getElementById('score');
  const qArea = document.getElementById('question-area');
  const choicesEl = document.getElementById('choices');
  const nextBtn = document.getElementById('nextBtn');
  const resultEl = document.getElementById('result');
  const progressEl = document.getElementById('progress');

  function escapeHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function updateHeader() {
    scoreEl.textContent = `Score: ${score} / ${questions.length}`;
    progressEl.textContent = `Question ${Math.min(idx+1, questions.length)} of ${questions.length}`;
  }

  function clearChoiceStyles() {
    Array.from(choicesEl.children).forEach(b => {
      b.disabled = false;
      b.style.background = '';
      b.style.borderColor = '';
      b.style.transform = '';
    });
  }

  function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


  function render() {
    updateHeader();
    shuffle(questions);
    resultEl.textContent = '';
    const q = questions[idx];
    qArea.innerHTML = `<strong>${escapeHtml(q.prompt)}</strong>`;
    choicesEl.innerHTML = '';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.style.display = 'flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.width = '100%';
      btn.style.padding = '14px 12px';
      btn.style.fontSize = '1.6rem';
      btn.style.borderRadius = '8px';
      btn.style.border = '1px solid #e0e0e0';
      btn.style.cursor = 'pointer';
      btn.style.transition = 'background 120ms, transform 120ms';
      btn.dataset.val = opt;
      btn.innerHTML = `<span style="user-select:none">${escapeHtml(opt)}</span>`;
      btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-2px)');
      btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
      btn.addEventListener('click', onChoice);
      choicesEl.appendChild(btn);
    });
    nextBtn.disabled = true;
  }

  function onChoice(e) {
    const chosen = e.currentTarget.dataset.val;
    const q = questions[idx];
    Array.from(choicesEl.children).forEach(b => b.disabled = true);
    if (chosen === q.answer) {
      e.currentTarget.style.background = '#c8e6c9';
      e.currentTarget.style.borderColor = '#81c784';
      resultEl.textContent = 'Correct!';
      score++;
    } else {
      e.currentTarget.style.background = '#ffcdd2';
      e.currentTarget.style.borderColor = '#e57373';
      Array.from(choicesEl.children).forEach(b => {
        if (b.dataset.val === q.answer) {
          b.style.background = '#c8e6c9';
          b.style.borderColor = '#81c784';
        }
      });
      resultEl.textContent = `Incorrect — correct answer: ${q.answer}`;
    }
    nextBtn.disabled = false;
    scoreEl.textContent = `Score: ${score}/${questions.length}`;
  }

  nextBtn.addEventListener('click', () => {
    idx++;
    if (idx >= questions.length) {
      qArea.innerHTML = '<strong>Quiz complete</strong>';
      choicesEl.innerHTML = '';
      resultEl.innerHTML = `Final score: ${score}/${questions.length} <button id="restart" style="margin-left:8px;padding:6px 10px;border-radius:6px;border:0;background:#1976d2;color:#fff;cursor:pointer;">Restart</button>`;
      nextBtn.disabled = true;
      document.getElementById('restart').addEventListener('click', () => {
        idx = 0; score = 0; render();
      });
    } else {
      render();
    }
  });

  // initial render
  render();
})();
</script>