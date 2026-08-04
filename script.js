// 🏠 居家备选动作池 (随机 4 项)
const homeExercisePool = [
  "胸椎放松与呼吸激活 (Breathing) - 5min",
  "猫牛式伸展与脊柱逐节动员 - 5min",
  "百次呼吸 (The Hundred) 拍打激活 - 3min",
  "单腿延伸 (Single Leg Stretch) - 8min",
  "双腿延伸 (Double Leg Stretch) - 8min",
  "交叉伸展 (Criss Cross) 腹斜肌强化 - 8min",
  "单腿划圈 (Single Leg Circle) 髋关节松动 - 8min",
  "滚球动作 (Rolling Like a Ball) 脊柱按摩 - 5min",
  "天鹅展翅 (Swan) 背肌激活 - 8min",
  "游泳式 (Swimming) 后侧链强化 - 8min",
  "侧卧腿部系列 (Side Kick Series) 臀中肌 - 10min",
  "桥式 (Shoulder Bridge) 臀大肌与腘绳肌 - 8min",
  "支撑板 (Plank) 核心稳定性训练 - 5min",
  "美人鱼拉伸 (Mermaid Stretch) 侧链放松 - 5min",
  "空中剪刀 (Scissors) 腿后侧拉伸 - 8min",
  "仰卧侧摆腿 (Corkscrew) 腹斜肌控制 - 6min"
];

// ⏳ 周末深度研习专题池 (随机 4 项)
const weekendTopicPool = [
  "完整垫上普拉提高级序列练习 (45min)",
  "选定 1 个经典动作做解剖与骨骼力学拆解 (20min)",
  "常见代偿动作分析与骨骼受力拆解研习 (25min)",
  "模拟带课口令演练 (面向镜子或录音) (15min)",
  "更新自己的动作库/备课笔记 (10min)",
  "骨盆前倾/后倾/倾斜的体态评估与纠正动作编排 (30min)",
  "Reformer 普拉提床核心弹簧阻力与安全导引复习 (25min)",
  "肩颈代偿（耸肩/头前倾）的触觉辅助与口令引导练习 (20min)",
  "孕产妇/产后修复普拉提禁忌动作与安全替换方案拆解 (30min)",
  "小工具（普拉提圈/弹力带/大球）结合垫上动作编排 (25min)",
  "观摩优秀教练授课视频，记录 3 个触动极强的 Cueing 口令 (20min)"
];

function generateRandomHomeTasks() {
  const shuffled = [...homeExercisePool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map((text, index) => ({ id: `home_rand_${index}_${Date.now()}`, text, completed: false }));
}

function generateRandomWeekendTasks() {
  const shuffled = [...weekendTopicPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map((text, index) => ({ id: `weekend_rand_${index}_${Date.now()}`, text, completed: false }));
}

const modeConfigs = {
  home: { title: "🏠 工作日·居家高效模式 (30分钟)", desc: "每天自动为你从动作池挑选 4 项不同的练习计划。" },
  studio: {
    title: "🧘‍♀️ 工作日·普拉提馆课模式 (1-2 节)",
    desc: "团课/私教体验，重点观察与记录教练的口令与编排。",
    tasks: [
      { id: "s1", text: "课前 5min 核心与脚趾/踝关节预热", completed: false },
      { id: "s2", text: "完成 1-2 节大器械课程 (Reformer/Cadillac/Chair)", completed: false },
      { id: "s3", text: "课后记录 2 个今天教练使用的优秀引导口令 (Cueing)", completed: false },
      { id: "s4", text: "记录今天发力代偿的动作（课后查阅解剖）", completed: false }
    ]
  },
  weekend: { title: "⏳ 周末·深度研习与备课模式 (90+分钟)", desc: "每周/每日自动从进阶专题池抽取 4 项研习备课课题。" }
};

// 动作库默认数据
const defaultExercises = [
  { 
    name: "百次呼吸 (The Hundred)", 
    category: "垫上 (Mat)", 
    muscle: "腹横肌、腹直肌、呼吸肌", 
    link: "https://search.bilibili.com/all?keyword=%E6%99%AE%E2%81%B7%E6%8F%90%E7%99%BE%E6%AC%A1%E5%91%BC%E5%90%B8%E6%A0%87%E5%87%86%E7%A4%BA%E8%8C%83", 
    cueing: "“像手风琴一样拉开肋骨，呼气沉下胸骨，腹部贴紧脊柱。”" 
  },
  { 
    name: "卷起 (The Roll Up)", 
    category: "垫上 (Mat)", 
    muscle: "脊柱逐节控制、腹斜肌", 
    link: "https://search.bilibili.com/all?keyword=%E6%99%AE%E2%81%B7%E6%8F%90%E5%8D%B7%E8%B5%B7%E7%A4%BA%E8%8C%83", 
    cueing: "“不要用惯性甩起来，想象脊柱像珍珠项链一样逐节离开地面。”" 
  }
];

const getTodayDateStr = () => new Date().toISOString().split('T')[0];

let currentMode = localStorage.getItem('pilates_mode') || 'home';
let lastSavedDate = localStorage.getItem('pilates_last_date');
const todayStr = getTodayDateStr();

// 📅 每日自动刷新机制
if (lastSavedDate !== todayStr) {
  localStorage.setItem('pilates_tasks_home', JSON.stringify(generateRandomHomeTasks()));
  localStorage.setItem('pilates_tasks_weekend', JSON.stringify(generateRandomWeekendTasks()));
  
  let studioTasks = JSON.parse(localStorage.getItem('pilates_tasks_studio')) || modeConfigs.studio.tasks;
  if (studioTasks) {
    localStorage.setItem('pilates_tasks_studio', JSON.stringify(studioTasks.map(t => ({ ...t, completed: false }))));
  }
  
  localStorage.setItem('pilates_last_date', todayStr);
}

let userTasks = JSON.parse(localStorage.getItem(`pilates_tasks_${currentMode}`));
if (!userTasks) {
  if (currentMode === 'home') userTasks = generateRandomHomeTasks();
  else if (currentMode === 'weekend') userTasks = generateRandomWeekendTasks();
  else if (currentMode === 'studio') userTasks = modeConfigs.studio.tasks;
}

let exerciseLibrary = JSON.parse(localStorage.getItem('pilates_exercises_v5')) || defaultExercises;
let logs = JSON.parse(localStorage.getItem('pilates_logs')) || [];
let currentCategoryFilter = 'ALL';

let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

// 🛡️ 安全初始化：DOM 树完全构建后再绑定监听
document.addEventListener("DOMContentLoaded", () => {
  setMode(currentMode, false);
  renderLibrary();
  renderLogs();
  renderCalendar();
  updateStats();

  const dateInput = document.getElementById('log-date');
  if (dateInput) dateInput.value = todayStr;

  const logForm = document.getElementById('log-form');
  if (logForm) logForm.addEventListener('submit', addLog);

  const exForm = document.getElementById('ex-form');
  if (exForm) exForm.addEventListener('submit', addNewExercise);
});

// 📌 标签页切换
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  
  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');

  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.includes(`'${tabId}'`) || onclickAttr.includes(`"${tabId}"`)) {
      btn.classList.add('active');
    }
  });

  if (tabId === 'calendar') renderCalendar();
}

// 🔄 模式切换
function setMode(modeKey, isUserClick = true) {
  currentMode = modeKey;
  localStorage.setItem('pilates_mode', modeKey);

  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-mode-${modeKey}`);
  if (activeBtn) activeBtn.classList.add('active');

  userTasks = JSON.parse(localStorage.getItem(`pilates_tasks_${modeKey}`));
  if (!userTasks) {
    if (modeKey === 'home') userTasks = generateRandomHomeTasks();
    else if (modeKey === 'weekend') userTasks = generateRandomWeekendTasks();
    else if (modeKey === 'studio') userTasks = modeConfigs.studio.tasks;
  }

  const titleEl = document.getElementById('mode-title');
  const descEl = document.getElementById('mode-desc');
  if (titleEl && modeConfigs[modeKey]) titleEl.innerText = modeConfigs[modeKey].title;
  if (descEl && modeConfigs[modeKey]) descEl.innerText = modeConfigs[modeKey].desc;
  
  renderTasks();
  updateStats();
}

// 📋 任务列表渲染与操作
function renderTasks() {
  const taskList = document.getElementById('task-list');
  if (!taskList) return;
  taskList.innerHTML = '';
  
  (userTasks || []).forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="toggle-btn" onclick="toggleTask('${task.id}')">${task.completed ? '✓ 已完成' : '标记完成'}</button>
    `;
    taskList.appendChild(li);
  });
}

function addCustomTask() {
  const input = document.getElementById('new-task-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;
  
  if (!userTasks) userTasks = [];
  userTasks.push({ id: 'custom_' + Date.now(), text, completed: false });
  localStorage.setItem(`pilates_tasks_${currentMode}`, JSON.stringify(userTasks));
  input.value = '';
  renderTasks();
  updateStats();
}

function toggleTask(id) {
  userTasks = (userTasks || []).map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  localStorage.setItem(`pilates_tasks_${currentMode}`, JSON.stringify(userTasks));
  renderTasks();
  updateStats();
  saveDailyProgress();
}

function saveDailyProgress() {
  let records = JSON.parse(localStorage.getItem('pilates_daily_records')) || {};
  records[todayStr] = {
    mode: modeConfigs[currentMode] ? modeConfigs[currentMode].title : "自主模式",
    tasks: userTasks
  };
  localStorage.setItem('pilates_daily_records', JSON.stringify(records));
  renderCalendar();
}

// 🗓️ 打卡日历部分
function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  const mTitle = document.getElementById('calendar-month-year');
  if (mTitle) mTitle.innerText = `${calYear} 年 ${calMonth + 1} 月`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const records = JSON.parse(localStorage.getItem('pilates_daily_records')) || {};

  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'calendar-day empty';
    grid.appendChild(emptyDiv);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.innerText = day;

    if (records[dateStr] || logs.some(l => l.date === dateStr)) {
      dayDiv.classList.add('has-checkin');
    }

    dayDiv.onclick = () => showDayDetail(dateStr);
    grid.appendChild(dayDiv);
  }

  const currentMonthPrefix = `${calYear}-${String(calMonth + 1).padStart(2, '0')}`;
  const checkinDaysCount = Object.keys(records).filter(d => d.startsWith(currentMonthPrefix)).length;
  const countEl = document.getElementById('month-checkin-count');
  if (countEl) countEl.innerText = `${checkinDaysCount} 天`;
}

function changeMonth(delta) {
  calMonth += delta;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

function showDayDetail(dateStr) {
  const detailCard = document.getElementById('day-detail-card');
  const detailContent = document.getElementById('detail-content');
  if (!detailCard || !detailContent) return;
  detailCard.style.display = 'block';

  const records = JSON.parse(localStorage.getItem('pilates_daily_records')) || {};
  const dayRecord = records[dateStr];
  const dayLogs = logs.filter(l => l.date === dateStr);

  let html = `<h4>📅 日期：${dateStr}</h4>`;

  if (dayRecord) {
    html += `<p style="margin-top:8px;"><strong>🏋️ 锻炼模式：</strong> ${dayRecord.mode}</p><ul style="margin: 8px 0 15px 20px;">`;
    (dayRecord.tasks || []).forEach(t => {
      html += `<li style="color: ${t.completed ? '#6895e9' : '#888'}">${t.completed ? '✓' : '✗'} ${t.text}</li>`;
    });
    html += `</ul>`;
  } else {
    html += `<p style="color:#888; margin-top:8px;">当天未打卡。</p>`;
    html += `<button class="small-btn" style="margin-top:8px;" onclick="makeUpCheckin('${dateStr}')">➕ 补打那天卡 (自动完成模式打卡)</button><br>`;
  }

  if (dayLogs.length > 0) {
    html += `<h5 style="margin-top:12px;">📝 关联复盘日志：</h5>`;
    dayLogs.forEach(l => {
      html += `<p style="margin-top:4px;">• [${l.type}] ${l.note} (${l.duration}分钟)</p>`;
      if (l.img) html += `<img src="${l.img}" class="img-preview"><br>`;
    });
  } else {
    html += `<button class="small-btn" style="margin-top:8px; background:#6895e9;" onclick="jumpToLogWithDate('${dateStr}')">📝 补写那天复盘日志</button>`;
  }

  detailContent.innerHTML = html;
}

function makeUpCheckin(dateStr) {
  let records = JSON.parse(localStorage.getItem('pilates_daily_records')) || {};
  records[dateStr] = {
    mode: "补打卡·自主训练",
    tasks: [{ id: "makeup_1", text: "补打卡：完成普拉提自主练习与备课", completed: true }]
  };
  localStorage.setItem('pilates_daily_records', JSON.stringify(records));
  renderCalendar();
  showDayDetail(dateStr);
  alert(`🎉 成功补打 ${dateStr} 的打卡！`);
}

function jumpToLogWithDate(dateStr) {
  switchTab('logs');
  const dInput = document.getElementById('log-date');
  if (dInput) dInput.value = dateStr;
  const formEl = document.getElementById('log-form');
  if (formEl) window.scrollTo({ top: formEl.offsetTop - 80, behavior: 'smooth' });
}

// 🖼️ 图片 Base64 转码辅助
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// 📚 动作库部分
function renderLibrary() {
  const libList = document.getElementById('library-list');
  if (!libList) return;
  libList.innerHTML = '';

  const searchInput = document.getElementById('lib-search-input');
  const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const filteredExercises = exerciseLibrary.filter(item => {
    const matchCategory = (currentCategoryFilter === 'ALL') || (item.category === currentCategoryFilter);
    const matchText = !searchText || 
      (item.name && item.name.toLowerCase().includes(searchText)) ||
      (item.muscle && item.muscle.toLowerCase().includes(searchText)) ||
      (item.cueing && item.cueing.toLowerCase().includes(searchText));
    return matchCategory && matchText;
  });

  if (filteredExercises.length === 0) {
    libList.innerHTML = '<p style="color:#888; grid-column: 1/-1; text-align:center; padding: 20px;">🔍 没有找到符合条件的动作</p>';
    return;
  }

  filteredExercises.forEach(item => {
    const div = document.createElement('div');
    div.className = 'action-card';
    let imgHtml = item.img ? `<img src="${item.img}" class="img-preview">` : '';
    let linkHtml = item.link ? `<br><a href="${item.link}" target="_blank" class="video-link-btn">🎥 点击查看国内标准动作示范</a>` : '';
    
    div.innerHTML = `
      <h4>${item.name}</h4>
      <span class="tag">🏷️ ${item.category || '综合'}</span>
      <p><strong>🎯 目标：</strong> ${item.muscle || '通用'}</p>
      <p><strong>🗣️ Cueing：</strong> ${item.cueing || '暂无口令记录'}</p>
      ${imgHtml}
      ${linkHtml}
    `;
    libList.appendChild(div);
  });
}

function setCategoryFilter(category, btnEl) {
  currentCategoryFilter = category;
  const btns = document.querySelectorAll('#category-filter-btns .filter-btn');
  btns.forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderLibrary();
}

function filterLibrary() {
  renderLibrary();
}

async function addNewExercise(e) {
  if (e) e.preventDefault();
  const nameEl = document.getElementById('ex-name');
  const catEl = document.getElementById('ex-category');
  const musEl = document.getElementById('ex-muscle');
  const linkEl = document.getElementById('ex-link');
  const cueEl = document.getElementById('ex-cueing');
  const fileInput = document.getElementById('ex-image-input');

  if (!nameEl || !nameEl.value.trim()) return alert('请填入动作名称！');

  const name = nameEl.value.trim();
  const category = catEl ? catEl.value : '垫上 (Mat)';
  const muscle = musEl ? musEl.value.trim() : '';
  const link = linkEl ? linkEl.value.trim() : '';
  const cueing = cueEl ? cueEl.value.trim() : '';

  let img = '';
  if (fileInput && fileInput.files.length > 0) {
    img = await getBase64(fileInput.files[0]);
  }

  exerciseLibrary.unshift({ name, category, muscle, link, cueing, img });
  localStorage.setItem('pilates_exercises_v5', JSON.stringify(exerciseLibrary));
  renderLibrary();

  nameEl.value = '';
  if (musEl) musEl.value = '';
  if (linkEl) linkEl.value = '';
  if (cueEl) cueEl.value = '';
  if (fileInput) fileInput.value = '';
  alert('🎉 动作保存成功！');
}

// 📖 日志部分
async function addLog(e) {
  if (e) e.preventDefault();
  const dEl = document.getElementById('log-date');
  const tEl = document.getElementById('log-type');
  const durEl = document.getElementById('log-duration');
  const nEl = document.getElementById('log-note');
  const fileInput = document.getElementById('log-image-input');

  if (!dEl || !nEl || !nEl.value.trim()) return alert('请填写日志内容！');

  const date = dEl.value;
  const type = tEl ? tEl.value : '自主训练';
  const duration = durEl ? durEl.value : '30';
  const note = nEl.value.trim();

  let img = '';
  if (fileInput && fileInput.files.length > 0) {
    img = await getBase64(fileInput.files[0]);
  }

  logs.unshift({ id: Date.now(), date, type, duration, note, img });
  localStorage.setItem('pilates_logs', JSON.stringify(logs));
  
  renderLogs();
  renderCalendar();
  updateStats();

  if (durEl) durEl.value = '';
  nEl.value = '';
  if (fileInput) fileInput.value = '';
  alert('🎉 日志保存成功！');
}

function renderLogs() {
  const history = document.getElementById('log-history');
  if (!history) return;
  history.innerHTML = '';
  if (logs.length === 0) {
    history.innerHTML = '<p style="color:#888;">暂无日志，去记下今天的训练心得吧！</p>';
    return;
  }
  logs.forEach(log => {
    const div = document.createElement('div');
    div.className = 'log-item';
    let imgHtml = log.img ? `<img src="${log.img}" class="img-preview">` : '';
    div.innerHTML = `
      <div class="log-header">
        <span>📅 ${log.date} [${log.type}]</span>
        <span>⏱️ ${log.duration} 分钟</span>
      </div>
      <p style="color:#333;">${log.note}</p>
      ${imgHtml}
    `;
    history.appendChild(div);
  });
}

function updateStats() {
  const completedTasks = (userTasks || []).filter(t => t.completed).length;
  const progressEl = document.getElementById('today-progress');
  if (progressEl) progressEl.innerText = `${completedTasks} / ${(userTasks || []).length}`;
}

// ⏱️ 训练计时器逻辑
let timerInterval = null;
let timerSeconds = 0;
let isTimerRunning = false;

function updateTimerDisplay() {
  const mins = Math.floor(timerSeconds / 60);
  const secs = timerSeconds % 60;
  const display = document.getElementById('timer-display');
  if (display) {
    display.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

function setTimerPreset(seconds) {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerSeconds = seconds;
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.innerText = '▶ 开始';
  updateTimerDisplay();
}

function toggleTimer() {
  const btn = document.getElementById('timer-start-btn');
  
  if (isTimerRunning) {
    clearInterval(timerInterval);
    isTimerRunning = false;
    if (btn) btn.innerText = '▶ 继续';
  } else {
    if (timerSeconds <= 0) return alert('请先选择或设置计时时间！');
    isTimerRunning = true;
    if (btn) btn.innerText = '⏸ 暂停';
    
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        if (btn) btn.innerText = '▶ 开始';
        alert('🔔 训练时间到！辛苦啦！');
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isTimerRunning = false;
  timerSeconds = 0;
  const btn = document.getElementById('timer-start-btn');
  if (btn) btn.innerText = '▶ 开始';
  updateTimerDisplay();
}
