// 三种预设训练模式
// 🏠 居家动作备选池（包含丰富的激活、核心、后侧链与放松动作）
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
  "美人鱼拉伸 (Mermaid Stretch) 侧链放松 - 5min"
];

// 随机从动作池里抽取 4 个不重复的动作组合成今天的清单
function generateRandomHomeTasks() {
  // 随机打乱数组
  const shuffled = [...homeExercisePool].sort(() => 0.5 - Math.random());
  // 取前 4 个
  const selected = shuffled.slice(0, 4);
  return selected.map((text, index) => ({
    id: `home_rand_${index}`,
    text: text,
    completed: false
  }));
}
const modeConfigs = {
  home: {
    title: "🏠 工作日·居家高效模式 (30分钟)",
    desc: "适合下班后在瑜伽垫上激活核心、放松脊柱。",
    tasks: [
      { id: "h1", text: "胸椎放松与呼吸激活 (Breathing) - 5min", completed: false },
      { id: "h2", text: "百次呼吸 (The Hundred) 简化版 - 3min", completed: false },
      { id: "h3", text: "单腿延伸 (Single Leg Stretch) & 交叉伸展 - 10min", completed: false },
      { id: "h4", text: "天鹅展翅 (Swan) 与猫牛式拉伸 - 8min", completed: false }
    ]
  },
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
  weekend: {
    title: "⏳ 周末·深度研习与备课模式 (90+分钟)",
    desc: "时间充裕，进行完整训练与动作细节拆解。",
    tasks: [
      { id: "w1", text: "完整垫上普拉提高级序列练习 (45min)", completed: false },
      { id: "w2", text: "选定 1 个经典动作做解剖与骨骼力学拆解 (20min)", completed: false },
      { id: "w3", text: "模拟带课口令演练 (面向镜子或录音) (15min)", completed: false },
      { id: "w4", text: "更新自己的动作库/备课笔记 (10min)", completed: false }
    ]
  }
};

// 默认丰富动作库 (10+ 经典动作)
const defaultExercises = [
  { name: "百次呼吸 (The Hundred)", category: "垫上 (Mat)", muscle: "腹横肌、腹直肌、呼吸肌", cueing: "“像手风琴一样拉开肋骨，呼气沉下胸骨，腹部向脊柱贴紧。”" },
  { name: "卷起 (The Roll Up)", category: "垫上 (Mat)", muscle: "脊柱逐节节段控制、腹内/外斜肌", cueing: "“不要用惯性甩起来，想象脊柱像珍珠项链一样逐节离开地面。”" },
  { name: "单腿划圈 (Single Leg Circle)", category: "垫上 (Mat)", muscle: "骨盆稳定性、髋关节活动度", cueing: "“骨盆像贴在地面上的地基一样纹丝不动，腿骨在髋臼窝里转动。”" },
  { name: "游泳 (Swimming)", category: "垫上 (Mat)", muscle: "背部伸肌群、臀大肌、后侧链", cueing: "“重点是向前后对拉延伸，而不是向上硬抬；保持颈部后侧平整。”" },
  { name: "脚踏系列 (Footwork)", category: "普拉提床 (Reformer)", muscle: "股四头肌、腘绳肌、足弓力量", cueing: "“脚掌踩稳脚踏板，用腹部控制推床与收床的节奏，不要撞击滑轨。”" },
  { name: "大象式 (Elephant)", category: "普拉提床 (Reformer)", muscle: "腘绳肌拉伸、腹肌收缩、肩膀稳定性", cueing: "“脚跟踩实脚踏，想象用腹肌拉动滑板向前，保持下背部微拱。”" },
  { name: "挂钩与下压 (Short Springs)", category: "凯迪拉克 (Cadillac)", muscle: "背阔肌、肩胛稳定性、核心", cueing: "“下压横杠时保持腋下收紧，不要用手腕死拉，想象用背部发力。”" },
  { name: "美人鱼拉伸 (Mermaid)", category: "稳踏椅 (Wunda Chair)", muscle: "侧链拉伸、腰方肌、肋间肌", cueing: "“坐骨紧贴坐垫，侧弯时保持双肩下沉，感受肋骨间隙被拉开。”" }
];

// 初始化数据
let currentMode = localStorage.getItem('pilates_mode') || 'home';
let userTasks = JSON.parse(localStorage.getItem(`pilates_tasks_${currentMode}`)) || modeConfigs[currentMode].tasks;
let exerciseLibrary = JSON.parse(localStorage.getItem('pilates_exercises_v3')) || defaultExercises;
let logs = JSON.parse(localStorage.getItem('pilates_logs')) || [];

document.addEventListener("DOMContentLoaded", () => {
  setMode(currentMode, false);
  renderLibrary();
  renderLogs();
  updateStats();
  document.getElementById('log-date').value = new Date().toISOString().split('T')[0];
});

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}

// 切换模式
function setMode(modeKey, isUserClick = true) {
  currentMode = modeKey;
  localStorage.setItem('pilates_mode', modeKey);

  document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`btn-mode-${modeKey}`);
  if (activeBtn) activeBtn.classList.add('active');

  userTasks = JSON.parse(localStorage.getItem(`pilates_tasks_${modeKey}`)) || modeConfigs[modeKey].tasks;

  document.getElementById('mode-title').innerText = modeConfigs[modeKey].title;
  document.getElementById('mode-desc').innerText = modeConfigs[modeKey].desc;
  
  renderTasks();
  updateStats();
}

// 渲染任务
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

// 添加自定义任务
function addCustomTask() {
  const input = document.getElementById('new-task-input');
  const text = input.value.trim();
  if (!text) return;

  const newTask = { id: 'custom_' + Date.now(), text, completed: false };
  userTasks.push(newTask);
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
      <span class="tag">🏷️ ${item.category || '综合'}</span>
      <p><strong>🎯 目标肌群：</strong> ${item.muscle}</p>
      <p><strong>🗣️ 引导口令 (Cueing)：</strong> ${item.cueing}</p>
    `;
    libList.appendChild(div);
  });
}

// 动态添加新动作到动作库
function addNewExercise(e) {
  e.preventDefault();
  const name = document.getElementById('ex-name').value;
  const category = document.getElementById('ex-category').value;
  const muscle = document.getElementById('ex-muscle').value;
  const cueing = document.getElementById('ex-cueing').value;

  const newEx = { name, category, muscle, cueing };
  exerciseLibrary.unshift(newEx); // 加到前面

  localStorage.setItem('pilates_exercises_v3', JSON.stringify(exerciseLibrary));
  renderLibrary();

  // 清空表单
  document.getElementById('ex-name').value = '';
  document.getElementById('ex-muscle').value = '';
  document.getElementById('ex-cueing').value = '';
  alert('🎉 成功将新动作存入动作库！');
}

// 日志相关
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

function updateStats() {
  const completedTasks = userTasks.filter(t => t.completed).length;
  document.getElementById('today-progress').innerText = `${completedTasks} / ${userTasks.length}`;
  document.getElementById('total-logs-count').innerText = `${logs.length} 篇`;
}
