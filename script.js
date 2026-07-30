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
  return shuffled.slice(0, 4).map((text, index) => ({ id: `home_rand_${index}`, text, completed: false }));
}

function generateRandomWeekendTasks() {
  const shuffled = [...weekendTopicPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4).map((text, index) => ({ id: `weekend_rand_${index}`, text, completed: false }));
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

// 丰富版动作库（内置视频示范）
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
  },
  { 
    name: "脚踏系列 (Footwork)", 
    category: "普拉提床 (Reformer)", 
    muscle: "股四头肌、腘绳肌、足弓力量", 
    link: "https://search.bilibili.com/all?keyword=Reformer+Footwork+%E6%8F%89%E7%BF%BB", 
    cueing: "“脚掌踩稳脚踏板，用腹部控制推床与收床的节奏，不要撞击滑轨。”" 
  },
  { 
    name: "大象式 (Elephant)", 
    category: "普拉提床 (Reformer)", 
    muscle: "腘绳肌拉伸、腹肌收缩、肩膀稳定性", 
    link: "https://search.bilibili.com/all?keyword=Reformer+Elephant+%E5%A4%A7%E8%B1%A1%E5%BC%8F", 
    cueing: "“脚跟踩实脚踏，想象用腹肌拉动滑板向前，保持下背部微拱。”" 
  },
  { 
    name: "下压横杠 (Push Through)", 
    category: "凯迪拉克 (Cadillac)", 
    muscle: "背阔肌、肩胛稳定性、核心", 
    link: "https://search.bilibili.com/all?keyword=Cadillac+Push+Through", 
    cueing: "“下压横杠时保持腋下收紧，不要用手腕死拉，想象用背部发力。”" 
  },
  { 
    name: "美人鱼拉伸 (Mermaid)", 
    category: "稳踏椅 (Wunda Chair)", 
    muscle: "侧链拉伸、腰方肌、肋间肌", 
    link: "https://search.bilibili.com/all?keyword=Wunda+Chair+Mermaid", 
    cueing: "“坐骨紧贴坐垫，侧弯时保持双肩下沉，感受肋骨间隙被拉开。”" 
  }
];

const getTodayDateStr = () => new Date().toISOString().split('T')[0];

let currentMode = localStorage.getItem('pilates_mode') || 'home';
let lastSavedDate = localStorage.getItem('pilates_last_date');
const todayStr = getTodayDateStr();

// 每日自动刷新
if (lastSavedDate !== todayStr) {
  localStorage.setItem('pilates_tasks_home', JSON.stringify(generateRandomHomeTasks()));
  localStorage.setItem('pilates_tasks_weekend', JSON.stringify(generateRandomWeekendTasks()));
  
  let studioTasks = JSON.parse(localStorage.getItem('pilates_tasks_studio')) || modeConfigs.studio.tasks;
  if (studioTasks) localStorage.setItem('pilates_tasks_studio', JSON.stringify(studioTasks.map(t => ({ ...t, completed: false }))));
  
  localStorage.setItem('pilates_last_date', todayStr);
}

let userTasks = JSON.parse(localStorage.getItem(`pilates_tasks_${currentMode}`));
if (!userTasks && currentMode === 'home') userTasks = generateRandomHomeTasks();
if (!userTasks && currentMode === 'weekend') userTasks = generateRandomWeekendTasks();
if (!userTasks && currentMode === 'studio') userTasks = modeConfigs.studio.tasks;

let exerciseLibrary = JSON.parse(localStorage.getItem('pilates_exercises_v5')) || defaultExercises;
let logs = JSON.parse(localStorage.getItem('pilates_logs')) || [];

let calYear = new Date().getFullYear();
let calMonth = new Date().getMonth();

document.addEventListener("DOMContentLoaded", () => {
  setMode(currentMode, false);
  renderLibrary();
  renderLogs();
  renderCalendar();
  updateStats();
  document.getElementById('log-date').value = todayStr;
});

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
  if (tabId === 'calendar') renderCalendar();
}

function setMode(modeKey, isUserClick = true) {
  currentMode = modeKey;
  localStorage.setItem('pilates_mode', modeKey);

  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-mode-${modeKey}`);
  if (activeBtn) activeBtn.classList.add('active');

  userTasks = JSON.parse(localStorage.getItem(`pilates_tasks_${modeKey}`));
  if (!userTasks && modeKey === 'home') userTasks = generateRandomHomeTasks();
  if (!userTasks && modeKey === 'weekend') userTasks = generateRandomWeekendTasks();

  document.getElementById('mode-title').innerText = modeConfigs[modeKey].title;
  document.getElementById('mode-desc').innerText = modeConfigs[modeKey].desc;
  
  renderTasks();
  updateStats();
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  userTasks.forEach(task => {
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
  const text = input.value.trim();
  if (!text) return;
  userTasks.push({ id: 'custom_' + Date.now(), text, completed: false });
  localStorage.setItem(`pilates_tasks_${currentMode}`, JSON.stringify(userTasks));
  input.value = '';
  renderTasks();
  updateStats();
}

function toggleTask(id) {
  userTasks = userTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  localStorage.setItem(`pilates_tasks_${currentMode}`, JSON.stringify(userTasks));
  renderTasks();
  updateStats();
  saveDailyProgress();
}

function saveDailyProgress() {
  let records = JSON.parse(localStorage.getItem('pilates_daily_records')) || {};
  records[todayStr] = {
    mode: modeConfigs[currentMode].title,
    tasks: userTasks
  };
  localStorage.setItem('pilates_daily_records', JSON.stringify(records));
  renderCalendar();
}

// 🗓️ 日历渲染与补打卡功能
function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';
  
  document.getElementById('calendar-month-year').innerText = `${calYear} 年 ${calMonth + 1} 月`;

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
  document.getElementById('month-checkin-count').innerText = `${checkinDaysCount} 天`;
}

function changeMonth(delta) {
  calMonth += delta;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
}

// 查看历史与补打卡弹窗
function showDayDetail(dateStr) {
  const detailCard = document.getElementById('day-detail-card');
  const detailContent = document.getElementById('detail-content');
  detailCard.style.display = 'block';

  const records = JSON.parse(localStorage.getItem('pilates_daily_records')) || {};
  const dayRecord = records[dateStr];
  const dayLogs = logs.filter(l => l.date === dateStr);

  let html = `<h4>📅 日期：${dateStr}</h4>`;

  if (dayRecord) {
    html += `<p style="margin-top:8px;"><strong>🏋️ 锻炼模式：</strong> ${dayRecord.mode}</p><ul style="margin: 8px 0 15px 20px;">`;
    dayRecord.tasks.forEach(t => {
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

// 补打卡逻辑
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

// 补日志跳转逻辑
function jumpToLogWithDate(dateStr) {
  switchTab('logs');
  document.getElementById('log-date').value = dateStr;
  window.scrollTo({ top: document.getElementById('log-form').offsetTop - 80, behavior: 'smooth' });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function renderLibrary() {
  const libList = document.getElementById('library-list');
  libList.innerHTML = '';
  exerciseLibrary.forEach(item => {
    const div = document.createElement('div');
    div.className = 'action-card';
    let imgHtml = item.img ? `<img src="${item.img}" class="img-preview">` : '';
    let linkHtml = item.link ? `<br><a href="${item.link}" target="_blank" class="video-link-btn">🎥 点击查看国内标准动作示范</a>` : '';
    
    div.innerHTML = `
      <h4>${item.name}</h4>
      <span class="tag">🏷️ ${item.category || '综合'}</span>
      <p><strong>🎯 目标：</strong> ${item.muscle}</p>
      <p><strong>🗣️ Cueing：</strong> ${item.cueing}</p>
      ${imgHtml}
      ${linkHtml}
    `;
    libList.appendChild(div);
  });
}

async function addNewExercise(e) {
  e.preventDefault();
  const name = document.getElementById('ex-name').value;
  const category = document.getElementById('ex-category').value;
  const muscle = document.getElementById('ex-muscle').value;
  const link = document.getElementById('ex-link').value;
  const cueing = document.getElementById('ex-cueing').value;
  const fileInput = document.getElementById('ex-image-input');

  let img = '';
  if (fileInput.files.length > 0) {
    img = await getBase64(fileInput.files[0]);
  }

  exerciseLibrary.unshift({ name, category, muscle, link, cueing, img });
  localStorage.setItem('pilates_exercises_v5', JSON.stringify(exerciseLibrary));
  renderLibrary();

  document.getElementById('ex-name').value = '';
  document.getElementById('ex-muscle').value = '';
  document.getElementById('ex-link').value = '';
  document.getElementById('ex-cueing').value = '';
  fileInput.value = '';
  alert('🎉 动作保存成功！');
}

async function addLog(e) {
  e.preventDefault();
  const date = document.getElementById('log-date').value;
  const type = document.getElementById('log-type').value;
  const duration = document.getElementById('log-duration').value;
  const note = document.getElementById('log-note').value;
  const fileInput = document.getElementById('log-image-input');

  let img = '';
  if (fileInput.files.length > 0) {
    img = await getBase64(fileInput.files[0]);
  }

  logs.unshift({ id: Date.now(), date, type, duration, note, img });
  localStorage.setItem('pilates_logs', JSON.stringify(logs));
  
  renderLogs();
  renderCalendar();
  updateStats();

  document.getElementById('log-duration').value = '';
  document.getElementById('log-note').value = '';
  fileInput.value = '';
  alert('🎉 日志保存成功！');
}

function renderLogs() {
  const history = document.getElementById('log-history');
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
  const completedTasks = userTasks.filter(t => t.completed).length;
  document.getElementById('today-progress').innerText = `${completedTasks} / ${userTasks.length}`;
}
