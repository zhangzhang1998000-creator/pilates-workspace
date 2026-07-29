// 三种预设训练模式
const modeConfigs = {
  home: {
    title: "🏠 工作日·居家高效模式 (30分钟)",
    desc: "适合工作日下班后，在瑜伽垫上快速激活核心、放松脊柱。",
    tasks: [
      { id: "h1", text: "胸椎放松与呼吸激活 (Breathing) - 5min", completed: false },
      { id: "h2", text: "百次呼吸 (The Hundred) 简化版 - 3min", completed: false },
      { id: "h3", text: "单腿延伸 (Single Leg Stretch) & 交叉伸展 - 10min", completed: false },
      { id: "h4", text: "天鹅展翅 (Swan) 与猫牛式拉伸 - 8min", completed: false }
    ]
  },
  studio: {
    title: "🧘‍♀️ 工作日·普拉提馆课模式 (1-2 节)",
    desc: "注重团课/私教课体验，课后重点记录教练的编排思路与口令。",
    tasks: [
      { id: "s1", text: "课前 5min 核心与脚趾关节预热", completed: false },
      { id: "s2", text: "完成 1-2 节大器械课程 (Reformer/Cadillac/Chair)", completed: false },
      { id: "s3", text: "课后记录 2 个今天教练使用的优秀引导口令 (Cueing)", completed: false },
      { id: "s4", text: "记录今天自己发力不畅的动作（以便查阅解剖）", completed: false }
    ]
  },
  weekend: {
    title: "⏳ 周末·深度研习与备课模式 (90+分钟)",
    desc: "时间充裕，结合自身练习与兼职备课需求，深入拆解动作。",
    tasks: [
      { id: "w1", text: "完整垫上普拉提高级序列练习 (45min)", completed: false },
      { id: "w2", text: "选定 1 个经典动作做解剖与骨骼力学拆解 (20min)", completed: false },
      { id: "w3", text: "模拟带课口令演练 (面向镜子或录音) (15min)", completed: false },
      { id: "w4", text: "更新自己的备课/动作库笔记 (10min)", completed: false }
    ]
  }
};

// 专业动作库（含解剖与Cueing）
const exerciseLibrary = [
  { 
    name: "百次呼吸 (The Hundred)", 
    muscle: "腹横肌、腹直肌、呼吸肌", 
    cueing: "“想像肋骨像手风琴一样向两侧张开，呼气时沉下胸骨，腹部向脊柱贴紧。”" 
  },
  { 
    name: "卷起 (The Roll Up)", 
    muscle: "脊柱逐节节段控制、腹内/外斜肌", 
    cueing: "“不要用惯性甩起来，想象脊柱像珍珠项链一样，一粒一粒离开地面。”" 
  },
  { 
    name: "单腿划圈 (Single Leg Circle)", 
    muscle: "骨盆稳定性、髋关节活动度", 
    cueing: "“骨盆像贴在地面上的地基一样纹丝不动，只有腿骨在髋臼窝里转动。”" 
  },
  { 
    name: "游泳 (Swimming)", 
    muscle: "背部伸肌群、臀大肌、后侧链", 
    cueing: "“重点是向前后延伸，而不是向上硬抬；保持颈部后侧平整。”" 
  }
];

// 读取或初始化本地数据
let currentMode = localStorage.getItem('pilates_mode') || 'home';
let userTasks = JSON.parse(localStorage.getItem('pilates_tasks_v2')) || modeConfigs[currentMode].tasks;
let logs = JSON.parse(localStorage.getItem('pilates_logs')) || [];

document.addEventListener("DOMContentLoaded", () => {
  setMode(currentMode, false);
  renderLibrary();
  renderLogs();
  updateStats();
  
  document.getElementById('log-date').value = new Date().toISOString().split('T')[0];
});

// 切换顶栏 Tab
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

// 切换训练模式
function setMode(modeKey, isUserClick = true) {
  currentMode = modeKey;
  localStorage.setItem('pilates_mode', modeKey);

  // 更新按钮高亮
  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-mode-${modeKey}`);
  if (activeBtn) activeBtn.classList.add('active');

  // 如果是用户点击切换，重置对应的任务列表
  if (isUserClick) {
    userTasks = JSON.parse(JSON.stringify(modeConfigs[modeKey].tasks));
    localStorage.setItem('pilates_tasks_v2', JSON.stringify(userTasks));
  }

  // 更新视图
  document.getElementById('mode-title').innerText = modeConfigs[modeKey].title;
  document.getElementById('mode-desc').innerText = modeConfigs[modeKey].desc;
  
  renderTasks();
  updateStats();
}

// 渲染任务清单
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  userTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="toggle-btn" onclick="toggleTask('${task.id}')">
        ${task.completed ? '✓ 已完成' : '标记完成'}
      </button>
    `;
    taskList.appendChild(li);
  });
}

// 勾选/取消任务
function toggleTask(id) {
  userTasks = userTasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  localStorage.setItem('pilates_tasks_v2', JSON.stringify(userTasks));
  renderTasks();
  updateStats();
}

// 渲染动作库
function renderLibrary() {
  const libList = document.getElementById('library-list');
  libList.innerHTML = '';

  exerciseLibrary.forEach(item => {
    const div = document.createElement('div');
    div.className = 'action-card';
    div.innerHTML = `
      <h4>${item.name}</h4>
      <span class="tag">🎯 目标：${item.muscle}</span>
      <p><strong>🗣️ 引导口令 (Cueing)：</strong> ${item.cueing}</p>
    `;
    libList.appendChild(div);
  });
}

// 提交复盘日志
function addLog(e) {
  e.preventDefault();
  const date = document.getElementById('log-date').value;
  const type = document.getElementById('log-type').value;
  const duration = document.getElementById('log-duration').value;
  const note = document.getElementById('log-note').value;

  const newLog = { id: Date.now(), date, type, duration, note };
  logs.unshift(newLog);

  localStorage.setItem('pilates_logs', JSON.stringify(logs));
  renderLogs();
  updateStats();

  document.getElementById('log-duration').value = '';
  document.getElementById('log-note').value = '';
}

// 渲染历史日志
function renderLogs() {
  const history = document.getElementById('log-history');
  history.innerHTML = '';

  if (logs.length === 0) {
    history.innerHTML = '<p style="color:#888;">暂无日志，去记下今天的训练心得或带课口令吧！</p>';
    return;
  }

  logs.forEach(log => {
    const div = document.createElement('div');
    div.className = 'log-item';
    div.innerHTML = `
      <div class="log-header">
        <span>📅 ${log.date} [${log.type || '训练'}]</span>
        <span>⏱️ ${log.duration} 分钟</span>
      </div>
      <p>${log.note}</p>
    `;
    history.appendChild(div);
  });
}

// 更新数据统计
function updateStats() {
  const completedTasks = userTasks.filter(t => t.completed).length;
  document.getElementById('today-progress').innerText = `${completedTasks} / ${userTasks.length}`;
  document.getElementById('total-logs-count').innerText = `${logs.length} 篇`;
}
