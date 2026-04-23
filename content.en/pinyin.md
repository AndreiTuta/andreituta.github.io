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
  {"type":"radical","symbol":"一","meaning":"one"},
  {"type":"radical","symbol":"丨","meaning":"line"},
  {"type":"radical","symbol":"丶","meaning":"dot"},
  {"type":"radical","symbol":"丿","meaning":"slash"},
  {"type":"radical","symbol":"乙","meaning":"second (twisting)"},
  {"type":"radical","symbol":"亅","meaning":"hook"},
  {"type":"radical","symbol":"二","meaning":"two"},
  {"type":"radical","symbol":"亠","meaning":"lid"},
  {"type":"radical","symbol":"人","meaning":"person"},
  {"type":"radical","symbol":"儿","meaning":"child/legs"},
  {"type":"radical","symbol":"入","meaning":"enter"},
  {"type":"radical","symbol":"八","meaning":"divide"},
  {"type":"radical","symbol":"冂","meaning":"open country"},
  {"type":"radical","symbol":"冖","meaning":"cover"},
  {"type":"radical","symbol":"冫","meaning":"ice"},
  {"type":"radical","symbol":"几","meaning":"table"},
  {"type":"radical","symbol":"凵","meaning":"container"},
  {"type":"radical","symbol":"刀","meaning":"knife"},
  {"type":"radical","symbol":"力","meaning":"power"},
  {"type":"radical","symbol":"勹","meaning":"wrap"},
  {"type":"radical","symbol":"匕","meaning":"spoon"},
  {"type":"radical","symbol":"匚","meaning":"right open box"},
  {"type":"radical","symbol":"匸","meaning":"hiding enclosure"},
  {"type":"radical","symbol":"十","meaning":"ten"},
  {"type":"radical","symbol":"卜","meaning":"divination"},
  {"type":"radical","symbol":"卩","meaning":"seal"},
  {"type":"radical","symbol":"厂","meaning":"cliff"},
  {"type":"radical","symbol":"厶","meaning":"private"},
  {"type":"radical","symbol":"又","meaning":"again/hand"},
  {"type":"radical","symbol":"口","meaning":"mouth"},
  {"type":"radical","symbol":"囗","meaning":"enclosure"},
  {"type":"radical","symbol":"土","meaning":"earth"},
  {"type":"radical","symbol":"士","meaning":"scholar/earth"},
  {"type":"radical","symbol":"夂","meaning":"go"},
  {"type":"radical","symbol":"夊","meaning":"go slowly"},
  {"type":"radical","symbol":"夕","meaning":"evening"},
  {"type":"radical","symbol":"大","meaning":"big"},
  {"type":"radical","symbol":"女","meaning":"woman"},
  {"type":"radical","symbol":"子","meaning":"child"},
  {"type":"radical","symbol":"宀","meaning":"roof"},
  {"type":"radical","symbol":"寸","meaning":"inch"},
  {"type":"radical","symbol":"小","meaning":"small"},
  {"type":"radical","symbol":"尢","meaning":"lame"},
  {"type":"radical","symbol":"尸","meaning":"corpse"},
  {"type":"radical","symbol":"屮","meaning":"sprout"},
  {"type":"radical","symbol":"山","meaning":"mountain"},
  {"type":"radical","symbol":"巛","meaning":"river"},
  {"type":"radical","symbol":"工","meaning":"work"},
  {"type":"radical","symbol":"己","meaning":"oneself"},
  {"type":"radical","symbol":"巾","meaning":"cloth"},
  {"type":"radical","symbol":"干","meaning":"dry"},
  {"type":"radical","symbol":"幺","meaning":"tiny"},
  {"type":"radical","symbol":"广","meaning":"shelter"},
  {"type":"radical","symbol":"廴","meaning":"walk long"},
  {"type":"radical","symbol":"廾","meaning":"two hands"},
  {"type":"radical","symbol":"弋","meaning":"shoot"},
  {"type":"radical","symbol":"弓","meaning":"bow"},
  {"type":"radical","symbol":"彐","meaning":"snout"},
  {"type":"radical","symbol":"彡","meaning":"bristle"},
  {"type":"radical","symbol":"彳","meaning":"step"},
  {"type":"radical","symbol":"心","meaning":"heart"},
  {"type":"radical","symbol":"戈","meaning":"spear"},
  {"type":"radical","symbol":"戶","meaning":"door"},
  {"type":"radical","symbol":"手","meaning":"hand"},
  {"type":"radical","symbol":"支","meaning":"branch"},
  {"type":"radical","symbol":"攴","meaning":"rap"},
  {"type":"radical","symbol":"文","meaning":"script"},
  {"type":"radical","symbol":"斗","meaning":"dipper"},
  {"type":"radical","symbol":"斤","meaning":"axe"},
  {"type":"radical","symbol":"方","meaning":"square"},
  {"type":"radical","symbol":"无","meaning":"not/have not"},
  {"type":"radical","symbol":"日","meaning":"sun/day"},
  {"type":"radical","symbol":"曰","meaning":"say"},
  {"type":"radical","symbol":"月","meaning":"moon/month"},
  {"type":"radical","symbol":"木","meaning":"tree"},
  {"type":"radical","symbol":"欠","meaning":"lack"},
  {"type":"radical","symbol":"止","meaning":"stop"},
  {"type":"radical","symbol":"歹","meaning":"death"},
  {"type":"radical","symbol":"殳","meaning":"weapon"},
  {"type":"radical","symbol":"毋","meaning":"mother/not"},
  {"type":"radical","symbol":"比","meaning":"compare"},
  {"type":"radical","symbol":"毛","meaning":"fur"},
  {"type":"radical","symbol":"氏","meaning":"clan"},
  {"type":"radical","symbol":"气","meaning":"steam"},
  {"type":"radical","symbol":"水","meaning":"water"},
  {"type":"radical","symbol":"火","meaning":"fire"},
  {"type":"radical","symbol":"爪","meaning":"claw"},
  {"type":"radical","symbol":"父","meaning":"father"},
  {"type":"radical","symbol":"爿","meaning":"half of tree trunk"},
  {"type":"radical","symbol":"片","meaning":"slice"},
  {"type":"radical","symbol":"牙","meaning":"tooth"},
  {"type":"radical","symbol":"牛","meaning":"cow"},
  {"type":"radical","symbol":"犬","meaning":"dog"},
  {"type":"radical","symbol":"玄","meaning":"mysterious"},
  {"type":"radical","symbol":"玉","meaning":"jade"},
  {"type":"radical","symbol":"瓜","meaning":"melon"},
  {"type":"radical","symbol":"瓦","meaning":"tile"},
  {"type":"radical","symbol":"甘","meaning":"sweet"},
  {"type":"radical","symbol":"生","meaning":"life"},
  {"type":"radical","symbol":"用","meaning":"use"},
  {"type":"radical","symbol":"田","meaning":"field"},
  {"type":"radical","symbol":"疋","meaning":"bolt of cloth"},
  {"type":"radical","symbol":"疒","meaning":"sickness"},
  {"type":"radical","symbol":"癶","meaning":"footsteps"},
  {"type":"radical","symbol":"白","meaning":"white"},
  {"type":"radical","symbol":"皮","meaning":"skin"},
  {"type":"radical","symbol":"皿","meaning":"dish"},
  {"type":"radical","symbol":"目","meaning":"eye"},
  {"type":"radical","symbol":"矛","meaning":"spear"},
  {"type":"radical","symbol":"矢","meaning":"arrow"},
  {"type":"radical","symbol":"石","meaning":"stone"}
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
  const questions = buildQuiz(qStrings, 25)

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