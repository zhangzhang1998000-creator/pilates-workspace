// 默认训练任务数据
const defaultTasks = [
  { id: 1, text: "呼吸训练 (Breathing) - 5分钟", completed: false },
  { id: 2, text: "百次呼吸 (The Hundred) - 3组", completed: false },
  { id: 3, text: "单腿划圈 (Single Leg Circle) - 左右各5次", completed: false },
  { id: 4, text: "滚球动作 (Rolling Like a Ball) - 8次", completed: false }
];

// 默认动作库数据
const exerciseLibrary = [
  { name: "百次呼吸 (The Hundred)", desc: "经典的温热与核心激活动作，强调节律性呼吸和腹部稳定。" },
  { name: "卷起 (The Roll Up)", desc: "提升脊柱逐节活动度与腹深层肌群力量。" },
  { name: "单腿伸展 (Single Leg Stretch)", desc: "锻炼核心控制力，保持盆骨稳定的同时进行四肢联动。" },
  { name: "天鹅展翅 (Swan)", desc: "强化背部肌群，改善圆肩驼背，延伸脊柱。" }
];

// 初始化数据
let tasks = JSON.parse(localStorage.getItem('pilates_tasks')) || defaultTasks;
let logs = JSON.parse(localStorage.getItem('pilates_logs')) || [];

// 初始化页面
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  renderLibrary();
  renderLogs();
  updateStats();
  
  // 设置默认日期为今天
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('log-date').value = today;
});

// 切换 Tab 页面
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

// 渲染今日任务
function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="toggle-btn" onclick="toggleTask(${task.id})">
        ${task.completed ? '✓ 已完成' : '标记完成'}
      </button>
    `;
    taskList.appendChild(li);
  });
}

// 切换任务完成状态
function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  localStorage.setItem('pilates_tasks', JSON.stringify(tasks));
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
      <p>${item.desc}</p>
    `;
    libList.appendChild(div);
  });
}

// 提交新的训练日志
function addLog(e) {
  e.preventDefault();
  const date = document.getElementById('log-date').value;
  const duration = document.getElementById('log-duration').value;
  const note = document.getElementById('log-note').value;

  const newLog = { id: Date.now(), date, duration, note };
  logs.unshift(newLog); // 最新日志排在前面

  localStorage.setItem('pilates_logs', JSON.stringify(logs));
  renderLogs();
  updateStats();

  // 清空表单（保留日期）
  document.getElementById('log-duration').value = '';
  document.getElementById('log-note').value = '';
}

// 渲染历史日志
function renderLogs() {
  const history = document.getElementById('log-history');
  history.innerHTML = '';

  if (logs.length === 0) {
    history.innerHTML = '<p style="color:#888;">暂无训练记录，快去记上一笔吧！</p>';
    return;
  }

  logs.forEach(log => {
    const div = document.createElement('div');
    div.className = 'log-item';
    div.innerHTML = `
      <div class="log-header">
        <span>📅 ${log.date}</span>
        <span>⏱️ ${log.duration} 分钟</span>
      </div>
      <p>${log.note}</p>
    `;
    history.appendChild(div);
  });
}

// 更新统计数据
function updateStats() {
  const completedTasks = tasks.filter(t => t.completed).length;
  document.getElementById('today-progress').innerText = `${completedTasks} / ${tasks.length}`;
  document.getElementById('total-logs-count').innerText = `${logs.length} 次`;
}
