const questions = [
  {
    text: "世界杯分组出来了，你支持的球队分到了「死亡之组」，你的第一反应是？",
    options: [
      { text: "死亡之组又怎样？八进四我都想好怎么走了，信仰不灭", val: 1 },
      { text: "有点慌，但还是会看，不行就当见证历史了", val: 2 },
      { text: "赶紧看看其他组有没有更值得追的队伍，人生苦短何必吊死一棵树", val: 3 }
    ]
  },
  {
    text: "你在直播吧看到「你的主队核心球星转会到死敌球队」的新闻，你？",
    options: [
      { text: "心碎但立场不变，我支持的是球衣上的队徽，不是某个人", val: 1 },
      { text: "纠结好一阵子，可能会同时关注两支队，但主队还是主队", val: 2 },
      { text: "那我也跟着关注新东家吧，球星在哪精彩就在哪", val: 3 }
    ]
  },
  // Adding placeholders for Q3-Q16 for the mockup
  ...Array(14).fill(0).map((_, i) => ({
    text: `这是第 ${i + 3} 道模拟题：世界杯期间你通常怎么安排时间？`,
    options: [
      { text: "熬夜看全场，一场不落", val: 1 },
      { text: "只看集锦和进球摘要", val: 2 },
      { text: "偶尔看看热搜关注下", val: 3 }
    ]
  }))
];

const results = {
  "GOAT": { name: "绿茵教父", desc: "既然认准了这抹颜色，这辈子就跟它死磕到底了。信仰要是不滚烫，那和白开水有什么区别？热爱不需要理由，只需要这一腔跨越时空的孤勇。" },
  "FANA": { name: "熬夜圣体", desc: "熬最深的夜，看最燃的球。在这个月，咖啡就是我的血液，开球哨就是我的闹钟。只要球赛还没终场，我的字典里就永远没有“睡觉”这两个字。" }
};

let currentQ = 0;
let answers = [];

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  
  if (id === 'pageQuestion') {
    document.getElementById('progressBar').style.display = 'block';
  } else {
    document.getElementById('progressBar').style.display = 'none';
  }
}

function startTest() {
  currentQ = 0;
  answers = [];
  showPage('pageQuestion');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];
  document.getElementById('questionNum').innerText = `${(currentQ + 1).toString().padStart(2, '0')} / 16`;
  document.getElementById('questionText').innerText = q.text;
  
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'option-btn';
    btn.innerText = opt.text;
    btn.onclick = () => selectOption(opt.val);
    container.appendChild(btn);
  });
  
  document.getElementById('progressFill').style.width = `${((currentQ) / 16) * 100}%`;
}

function selectOption(val) {
  answers.push(val);
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    document.getElementById('progressFill').style.width = '100%';
    finishTest();
  }
}

function finishTest() {
  showPage('pageTransition');
  document.getElementById('pageTransition').style.display = 'flex';
  
  setTimeout(() => {
    document.getElementById('pageTransition').style.display = 'none';
    calculateResult();
  }, 2500);
}

function calculateResult() {
  // Simplified calculation for mockup: random between GOAT and FANA
  const code = Math.random() > 0.5 ? "GOAT" : "FANA";
  const res = results[code];
  
  document.getElementById('resultCode').innerText = code;
  document.getElementById('resultName').innerText = res.name;
  document.getElementById('resultDesc').innerText = res.desc;
  
  showPage('pageResult');
}

function showPoster() {
  document.getElementById('posterOverlay').style.display = 'flex';
}

function closePoster() {
  document.getElementById('posterOverlay').style.display = 'none';
}

// Initial state
document.getElementById('posterOverlay').style.display = 'none';
document.getElementById('pageTransition').style.display = 'none';

// Debug / Review functions
function showNotStarted() {
  document.getElementById('exceptionIcon').innerText = '⏳';
  document.getElementById('exceptionTitle').innerText = '活动即将开始';
  document.getElementById('exceptionDesc').innerText = '距离世界杯开启还有 3 天，敬请期待';
  showPage('pageException');
}

function showEnded() {
  document.getElementById('exceptionIcon').innerText = '🏁';
  document.getElementById('exceptionTitle').innerText = '活动已结束';
  document.getElementById('exceptionDesc').innerText = '感谢参与！全站热门人格：GOAT, FANA, GURU';
  showPage('pageException');
}

function showError() {
  document.getElementById('exceptionIcon').innerText = '📡';
  document.getElementById('exceptionTitle').innerText = '网络开了小差';
  document.getElementById('exceptionDesc').innerText = '请检查你的网络连接后重试';
  showPage('pageException');
}

// In a real app, these would be triggered by API responses.
