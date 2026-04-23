---
title: "Pinyin Character & Radical Quiz"
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
    {"type":"radical","symbol":"氵","meaning":"water"},
{"type":"radical","symbol":"忄","meaning":"heart/feeling"},
{"type":"radical","symbol":"木","meaning":"wood/tree"},
{"type":"radical","symbol":"艹","meaning":"grass/plant"},
{"type":"radical","symbol":"讠","meaning":"speech/words"},
{"type":"radical","symbol":"钅","meaning":"metal"},
{"type":"radical","symbol":"人","meaning":"person"},
{"type":"radical","symbol":"口","meaning":"mouth"},
{"type":"char","symbol":"马","meaning":"horse"},
{"type":"char","symbol":"林","meaning":"forest"},
{"type":"char","symbol":"日","meaning":"sun/day"},
{"type":"char","symbol":"大","meaning":"big"},
{"type":"char","symbol":"火","meaning":"fire"},
{"type":"char","symbol":"目","meaning":"eye"},
{"type":"char","symbol":"二","meaning":"two"}
  ];


  // data: items (the JSON array above)
  function makeQuestion(item, itemsPool, numOptions = 4) {
    // filter same type for decoys
    const pool = itemsPool.filter(it => it.type === item.type && it.symbol !== item.symbol);
    shuffle(pool);
    const decoys = pool.slice(0, Math.max(0, numOptions - 1));
    const options = shuffle([item, ...decoys]).map(it => it.symbol);
    return {
      type: item.type,
      prompt: item.type === 'radical'
        ? `Which radical means "${item.meaning}"? (select the radical)`
        : `Which character means "${item.meaning}"?`,
      options,
      answer: item.symbol
    };
  }

  function buildQuiz(itemsPool, desiredCount = null) {
    const candidates = desiredCount ? shuffle(itemsPool.slice()).slice(0, desiredCount) : itemsPool;
    return candidates.map(it => makeQuestion(it, itemsPool));
  }

  // Parse into objects
  const questions = buildQuiz(qStrings)

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